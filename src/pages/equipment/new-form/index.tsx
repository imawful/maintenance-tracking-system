import { EquipmentForm } from "@/components/EquipmentForm";
import { DirectoryList } from "@/components/DirectoryList";
const Home = () => {
  return (
    <div className="flex flex-col p-4 items-center bg-slate-100 h-auto">
			<div className="flex flex-col items-center justify-center mt-8 mb-8 space-y-4">
				<h1 className="text-7xl font-extrabold text-neutral-950 tracking-tight">
					New Equipment
				</h1>
				<p className="text-lg text-neutral-900">
					Log new equipment.
				</p>
				<div className="w-full self-center">
					<DirectoryList linksToOmit={['/equipment/new-form/']}/>
				</div>
				<hr className="w-full border-neutral-300" />
			</div>

      <div className="bg-slate-300 p-4 rounded-lg self-center">
        <EquipmentForm />
      </div>
    </div>
  );
};

export default Home;
