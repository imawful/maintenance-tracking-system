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
    <form onSubmit={handleSubmit(myOnSubmit)}>
      <div>
        <label htmlFor="maintenance-date">Date</label>
        <input type="date" id="maintenance-date" {...register("date")} />
        {typeof errors.date?.message === "string" && (
          <p>{errors.date?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-type" className="text-green-400">
          Select a Type
        </label>
        <select id="maintenance-type" {...register("type")}>
          <option value="">Select a type</option>
          <option value="Preventive">Preventive</option>
          <option value="Repair">Repair</option>
          <option value="Emergency">Emergency</option>
        </select>
        {typeof errors.type?.message === "string" && (
          <p>{errors.type?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-technician-name">Technician Name</label>
        <input
          type="text"
          id="maintenance-technician-name"
          {...register("technician")}
        />
        {typeof errors.technician?.message === "string" && (
          <p>{errors.technician?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-hours-spent">Hours Spent</label>
        <input
          type="number"
          id="maintenance-hours-spent"
          {...register("hoursSpent")}
        />
        {typeof errors.hoursSpent?.message === "string" && (
          <p>{errors.hoursSpent?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-description">Maintenance Description</label>
        <input
          type="text"
          id="maintenance-description"
          {...register("description")}
        />
        {typeof errors.description?.message === "string" && (
          <p>{errors.description?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-parts-replaced-optional">
          Parts Replaced (optional)
        </label>
        {dynamicPartsReplaced?.map((part, index) => (
          <div key={index} id="maintenance-parts-replaced-optional">
            <input
              key={index}
              type="text"
              {...register(`partsReplaced.${index}`)}
            />
            <button type="button" onClick={() => removePart(index)}>
              Remove
            </button>
            {typeof errors.partsReplaced?.[index]?.message === "string" && (
              <p>{errors.partsReplaced?.[index]?.message}</p>
            )}
          </div>
        ))}
        <button type="button" onClick={addNewPart}>
          Add New Part Replaced
        </button>
        {typeof errors.partsReplaced?.message === "string" && (
          <p>{errors.partsReplaced?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-priority">Select a priority</label>
        <select id="maintenance-priority" {...register("priority")}>
          <option value="">Select a priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {typeof errors.priority?.message === "string" && (
          <p>{errors.priority?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="maintenance-completion-status">
          Select a completion status
        </label>
        <select
          id="maintenance-completion-status"
          {...register("completionStatus")}
        >
          <option value="">Select a completion status</option>
          <option value="Complete">Complete</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Pending Parts">Pending Parts</option>
        </select>
        {typeof errors.completionStatus?.message === "string" && (
          <p>{errors.completionStatus?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="maintenance-submit">Submit Maintenance Record</label>
        <input type="submit" id="maintenance-submit" />
      </div>
    </form>
  );
};

export { MaintenanceRecordForm };
