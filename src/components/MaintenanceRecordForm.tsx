import { zodResolver } from "@hookform/resolvers/zod";
import { MaintenanceRecord } from "../ts/types";
import { maintenanceRecordSchema } from "../ts/schemas";
import { useForm } from "react-hook-form";
import { useState } from "react";

const MaintenanceRecordForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    unregister,
    formState: { errors },
  } = useForm<MaintenanceRecord>({
    resolver: zodResolver(maintenanceRecordSchema),
    defaultValues: {
      id: "",
      equipmentId: "",
    },
  });

  const [dynamicPartsReplaced, setDynamicPartsReplaced] = useState(
    [] as string[] | undefined,
  );

  const addNewPart = () => {
    setDynamicPartsReplaced((parts) => {
      const newParts = [...(parts || []), ""];
      setValue("partsReplaced", newParts);
      return newParts;
    });
  };

  const removePart = (index: number) => {
    setDynamicPartsReplaced(() => {
      const updatedParts = getValues("partsReplaced");
      if (updatedParts) {
        updatedParts.splice(index, 1);
        setValue("partsReplaced", [...updatedParts]);
      }
      if (updatedParts && updatedParts.length === 0) {
        unregister("partsReplaced");
      }
      return updatedParts;
    });
  };

  const myOnSubmit = (data: MaintenanceRecord) => {
    //validate
    maintenanceRecordSchema.parse(data);
    console.log("submitted a maintenance record", data);
  };

  return (
    <div className="flex flex-col bg-inherit items-center">
      <form
        className="border-2 border-black w-auto m-4 p-4 bg-neutral-300"
        onSubmit={handleSubmit(myOnSubmit)}
      >
        <div className="mb-4 flex flex-row justify-between gap-8">
          <div className="flex flex-col">
            <label
              htmlFor="maintenance-technician-name"
              className="text-lg text-black cursor-text"
            >
              Technician Name:
            </label>
            <input
              type="text"
              id="maintenance-technician-name"
              placeholder="Enter a name..."
              className="rounded-md p-1 bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
              {...register("technician")}
            />
            {typeof errors.technician?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.technician?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="maintenance-date"
              className="text-lg text-black cursor-text"
            >
              Date:
            </label>
            <input
              type="date"
              id="maintenance-date"
              className="rounded-md h-fit p-1 bg-zinc-800 text-md text-neutral-50"
              {...register("date")}
            />
            {typeof errors.date?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.date?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row mb-4 justify-center items-center gap-8">
          <div className="flex flex-col ">
            <label
              htmlFor="maintentance-equipment-id"
              className="text-lg text-black cursor-text"
            >
              Equipment:
            </label>
            <select
              id="maintentance-equipment-id"
              className="cursor-pointer w-md p-1 text-md rounded-md bg-zinc-800 text-center text-neutral-50"
            >
              <option value="">Select equipment</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="maintenance-type"
              className="text-lg text-black cursor-text"
            >
              Type:
            </label>
            <select
              id="maintenance-type"
              className="cursor-pointer w-md p-1 text-md rounded-md bg-zinc-800 text-center text-neutral-50"
              {...register("type")}
            >
              <option value="">Select type</option>
              <option value="Preventive">Preventive</option>
              <option value="Repair">Repair</option>
              <option value="Emergency">Emergency</option>
            </select>
            {typeof errors.type?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.type?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="maintenance-hours-spent"
              className="text-lg text-black cursor-text"
            >
              Hours Spent:
            </label>
            <input
              type="number"
              id="maintenance-hours-spent"
              className="w-8 h-7 rounded-md bg-zinc-800 text-center text-neutral-50"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              {...register("hoursSpent")}
            />
            {typeof errors.hoursSpent?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.hoursSpent?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div>
            <label
              htmlFor="maintenance-parts-replaced-optional"
              className="text-lg text-black mr-4 cursor-text"
            >
              Parts Replaced: (optional)
            </label>
            <button
              type="button"
              className="text-white text-md w-5 bg-zinc-800 text-center hover:bg-zinc-700 rounded-md"
              onClick={addNewPart}
            >
              +
            </button>
          </div>
          {dynamicPartsReplaced?.map((part, index) => (
            <div key={index} id="maintenance-parts-replaced-optional">
              <input
                key={index}
                type="text"
                placeholder="Part Name..."
                className="bg-zinc-800 m-1 mr-4 p-1 rounded-md text-neutral-50"
                {...register(`partsReplaced.${index}`)}
              />
              <button
                type="button"
                className="bg-red-700 hover:bg-red-600 rounded-md text-center w-5 text-white"
                onClick={() => removePart(index)}
              >
                x
              </button>
              {typeof errors.partsReplaced?.[index]?.message === "string" && (
                <p className="text-sm text-red-500 text-center font-bold">
                  {errors.partsReplaced?.[index]?.message}
                </p>
              )}
            </div>
          ))}
          {typeof errors.partsReplaced?.message === "string" && (
            <p className="text-sm text-red-500 font-bold">
              {errors.partsReplaced?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-4 ">
          <label
            htmlFor="maintenance-description"
            className="text-lg text-black text-center cursor-text"
          >
            Maintenance Description:
          </label>
          <textarea
            id="maintenance-description"
            rows={2}
            placeholder="Enter a description... (min 10 characters)"
            className="w-lg rounded-md p-1 bg-zinc-800 text-neutral-50 placeholder:text-neutral-400"
            {...register("description")}
          />
          {typeof errors.description?.message === "string" && (
            <p className="text-sm text-red-500 text-center font-bold">
              {errors.description?.message}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-4 justify-between mb-4">
          <div className="flex flex-col">
            <label
              htmlFor="maintenance-priority"
              className="text-lg text-black cursor-text"
            >
              Priority:
            </label>
            <select
              id="maintenance-priority"
              className="cursor-pointer w-md p-1 text-md rounded-md bg-zinc-800 text-center text-neutral-50"
              {...register("priority")}
            >
              <option value="" className="cursor-pointer">
                Select a priority
              </option>
              <option value="Low" className="cursor-pointer">
                Low
              </option>
              <option value="Medium" className="cursor-pointer">
                Medium
              </option>
              <option value="High" className="cursor-pointer">
                High
              </option>
            </select>
            {typeof errors.priority?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.priority?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="maintenance-completion-status"
              className="text-lg text-black cursor-text"
            >
              Completion Status:
            </label>
            <select
              id="maintenance-completion-status"
              className="cursor-pointer w-md p-1 text-md rounded-md bg-zinc-800 text-center text-neutral-50"
              {...register("completionStatus")}
            >
              <option value="">Select status</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Pending Parts">Pending Parts</option>
            </select>
            {typeof errors.completionStatus?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.completionStatus?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <input
            type="submit"
            id="maintenance-submit"
            value="Submit Record"
            className="hover:cursor-pointer bg-indigo-600 text-center hover:bg-indigo-500 p-1 rounded-md text-neutral-50"
          />
        </div>
      </form>
    </div>
  );
};

export { MaintenanceRecordForm };
