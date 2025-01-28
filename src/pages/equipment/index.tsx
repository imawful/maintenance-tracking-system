import { EquipmentTable } from "@/components/EquipmentTable";
import { DirectoryList } from "@/components/DirectoryList";
const EquipmentPage = () => {
  return (
    <div className="bg-slate-100 flex flex-col justify-start p-4 h-screen">
			<div className="flex flex-col items-center justify-center mt-8 mb-8 space-y-4">
				<h1 className="text-7xl font-extrabold text-neutral-950 tracking-tight">
					Equipment	
				</h1>
				<p className="text-lg text-neutral-900">
					Table of all system's equipment.
				</p>
				<div className="w-2/4 self-center">
					<DirectoryList linksToOmit={['/equipment/']}/>
				</div>
				<hr className="w-1/2 border-neutral-300" />
			</div>
      <div className="p-9 bg-slate-300 flex-2">
        <EquipmentTable />
      </div>
    </div>
  );
};

export default EquipmentPage;
