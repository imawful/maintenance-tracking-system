import { EquipmentEditForm } from "@/components/EquipmentEditForm";
import { useRouter } from "next/router";
const EditFormPage = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  if (!id) {
    //this shouldnt be seen.
    return <p>Could not find equipment</p>;
  }

  return (
    <div className="flex flex-col p-4 items-center bg-slate-100 h-auto">
      <div className="flex flex-col items-center justify-center mt-8 mb-8 space-y-4">
        <h1 className="text-7xl font-extrabold text-neutral-950 tracking-tight">
          Equipment
        </h1>
        <p className="text-lg text-neutral-900">
          {`Update an Equipment's Location, Department, or Status.`}
        </p>
        <div className="w-full flex flex-col items-center">
          <a
            href="../"
            className="hover:cursor-pointer bg-red-600 text-center hover:bg-red-500 p-1 rounded-md text-neutral-50"
          >
            Cancel Update
          </a>
        </div>
        <hr className="w-full border-neutral-300" />
      </div>

      <div className="bg-slate-300 p-4 rounded-lg self-center">
        <EquipmentEditForm id={id} />
      </div>
    </div>
  );
};

export default EditFormPage;
