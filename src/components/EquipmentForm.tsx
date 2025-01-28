import { zodResolver } from "@hookform/resolvers/zod";
import { Equipment } from "../ts/types";
import { equipmentSchema } from "../ts/schemas";
import { useForm } from "react-hook-form";

const EquipmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Equipment>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: { id: "" },
  });

  const myOnSubmit = (data: Equipment) => {
    //TODO update the data's id accordingly.
    console.log("submitted an equiment", data);
  };

  //bg-neutral-800

  return (
    <div className="flex flex-col bg-inherit items-center">
      <form
        className="border border-black w-auto p-4 m-4 bg-neutral-300"
        onSubmit={handleSubmit(myOnSubmit)}
      >
        <div className="flex flex-row justify-between gap-8 mb-4">
          <div className="flex flex-col">
            <label
              htmlFor="equipment-name"
              className="text-lg text-black cursor-text"
            >
              Name:
            </label>
            <input
              type="text"
              id="equipment-name"
              className="rounded-md w-auto p-1 bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
              {...register("name")}
            />
            {typeof errors.name?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="equipment-install-date"
              className="text-lg text-black cursor-text"
            >
              Install Date:
            </label>
            <input
              type="date"
              id="equipment-install-date"
              className="rounded-md h-fit p-1 bg-zinc-800 text-md text-neutral-50"
              {...register("installDate")}
            />
            {typeof errors.installDate?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.installDate?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="equipment-location"
            className="text-lg text-black cursor-text"
          >
            Location:
          </label>
          <input
            type="text"
            id="equipment-location"
            className="rounded-md p-1 bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
            {...register("location")}
          />
          {typeof errors.location?.message === "string" && (
            <p className="text-sm text-red-500 font-bold">
              {errors.location?.message}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between mb-4 gap-8">
          <div className="flex flex-col">
            <label
              htmlFor="equipment-department"
              className="text-lg text-black cursor-text mb-1/2"
            >
              Department:
            </label>
            <select
              id="equipment-department"
              className="cursor-pointer w-md h-auto p-1 text-md rounded-md bg-zinc-800 text-center text-neutral-50"
              {...register("department")}
            >
              <option value="">Select a department</option>
              <option value="Machining">Machining</option>
              <option value="Assembly">Assembly</option>
              <option value="Packaging">Packaging</option>
              <option value="Shipping">Shipping</option>
            </select>
            {typeof errors.department?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.department?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="equipment-model"
              className="text-lg text-black cursor-text"
            >
              Model:
            </label>
            <input
              type="text"
              id="equipment-model"
              className="rounded-md p-1 bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
              {...register("model")}
            />
            {typeof errors.model?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.model?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="equipment-serial-number"
            className="text-lg text-black cursor-text"
          >
            Serial Number:
          </label>
          <input
            type="text"
            id="equipment-serial-number"
            className="rounded-md p-1 bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
            {...register("serialNumber")}
          />
          {typeof errors.serialNumber?.message === "string" && (
            <p className="text-sm text-red-500 font-bold">
              {errors.serialNumber?.message}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-8 justify-between">
          <div>
            <label
              htmlFor="equipment-status"
              className="text-lg text-black mr-4 cursor-text"
            >
              Status:
            </label>
            <select
              id="equipment-status"
              className="cursor-pointer w-md p-1 mb-2 text-md rounded-md bg-zinc-800 text-center text-neutral-50"
              {...register("status")}
            >
              <option value="">Select a status</option>
              <option value="Operational">Operational</option>
              <option value="Down">Down</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Retired">Retired</option>
            </select>
            {typeof errors.status?.message === "string" && (
              <p className="text-sm text-red-500 font-bold">
                {errors.status?.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            id="equipment-submit"
            value="Submit Equipment"
            className="hover:cursor-pointer bg-indigo-600 text-center hover:bg-indigo-500 p-1 rounded-md text-neutral-50"
          />
        </div>
      </form>
    </div>
  );
};

export { EquipmentForm };
