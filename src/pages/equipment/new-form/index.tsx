import { EquipmentForm } from "@/components/EquipmentForm";
const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-6xl text-neutral-50 text-bold text-center">
        New Equipment
      </h1>
      <EquipmentForm />
    </div>
  );
};

export default Home;
