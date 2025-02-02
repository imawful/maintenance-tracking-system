import { zodResolver } from "@hookform/resolvers/zod";
import { Equipment } from "../ts/types";
import { equipmentSchema } from "../ts/schemas";
import { useForm } from "react-hook-form";
import { useMockData } from "@/context/MockDataContext";
import { useState, useEffect } from "react";

interface EquipmentEditFormProps {
  id: string;
}

const EquipmentEditForm = (props: EquipmentEditFormProps) => {
  const { equipment, setEquipment } = useMockData();
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Equipment>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: { id: "" },
  });

  useEffect(() => {
    if (equipment.length === 0) return;
    const eq = equipment.find((item) => item.id === props.id);
    if (eq) {
      setContentLoaded(true);
      setValue("id", eq.id);
      setValue("name", eq.name);
      setValue("location", eq.location);
      setValue("department", eq.department);
      setValue("model", eq.model);
      setValue("serialNumber", eq.serialNumber);
      setValue("installDate", eq.installDate);
      setValue("status", eq.status);
    }
  }, [equipment]);

  const myOnSubmit = (data: Equipment) => {
    //TODO  update the changes.

    const updatedEquipment = equipment.map((eq) =>
      eq.id === props.id ? data : eq,
    );

    setEquipment(updatedEquipment);
    sessionStorage.setItem("equipment", JSON.stringify(updatedEquipment));

    //redirect to main equipment page upon sucessful submission.
    console.log("sucessfully updated an equiment!", updatedEquipment);
    window.location.href = "../";
    console.log("updated an equiment", data);
  };

  //bg-neutral-800
  /*
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
            */

  return (
    <div>
      {!contentLoaded && (
        <div>
          <p className="text-center">Loading...</p>
          <p>
            {" "}
            If times are taking too long the selected equipment may not exist.
          </p>
        </div>
      )}
      {contentLoaded && (
        <div className="flex flex-col bg-inherit items-center">
          <form
            className="border border-black p-4 m-4 bg-neutral-300"
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
                <p
                  id="equipment-name"
                  className="rounded-md w-auto p-1 cursor-not-allowed bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
                >
                  {getValues("name")}
                </p>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="equipment-install-date"
                  className="text-lg text-black cursor-text"
                >
                  Install Date:
                </label>
                <p
                  id="equipment-install-date"
                  className="rounded-md h-fit p-1 cursor-not-allowed bg-zinc-800 text-md text-neutral-50"
                >
                  {
                    new Date(getValues("installDate"))
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
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
                <p
                  id="equipment-model"
                  className="rounded-md p-1 cursor-not-allowed bg-zinc-800 text-md text-neutral-50 placeholder:text-neutral-400"
                >
                  {getValues("model")}
                </p>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="equipment-serial-number"
                className="text-lg text-black cursor-text"
              >
                Serial Number:
              </label>
              <div className="">
                <p
                  id="equipment-serial-number"
                  className="rounded-md p-1 cursor-not-allowed bg-zinc-800 text-md break-all text-neutral-50 placeholder:text-neutral-400"
                >
                  {getValues("serialNumber").length > 50
                    ? getValues("serialNumber").slice(0, 50) + "..." //WARN doesn't actually show the entire serial number on page!
                    : getValues("serialNumber")}
                </p>
              </div>
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
                value="Update Equipment"
                className="hover:cursor-pointer bg-indigo-600 text-center hover:bg-indigo-500 p-1 rounded-md text-neutral-50"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export { EquipmentEditForm };
