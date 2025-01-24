import { MaintenanceRecordForm } from "@/components/MaintenanceRecordForm";
const Home = () => {
  return (
    <div className="">
      <h1 className="text-6xl text-neutral-50 text-bold text-center">
        New Maintenance Record
      </h1>

      <MaintenanceRecordForm />
    </div>
  );
};

export default Home;
