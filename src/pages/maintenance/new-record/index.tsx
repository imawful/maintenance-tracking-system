import { MaintenanceRecordForm } from "@/components/MaintenanceRecordForm";
import { DirectoryList } from "@/components/DirectoryList";
const Home = () => {
  return (
    <div className="flex flex-col p-4 items-center bg-slate-100 h-auto">
			<div className="flex flex-col items-center justify-center mt-8 mb-8 space-y-4">
				<h1 className="text-7xl font-extrabold text-neutral-950 tracking-tight">
					New Maintenance Record
				</h1>
				<p className="text-lg text-neutral-900">
					Log a new maintenance record.
				</p>
				<div className="w-2/4 self-center">
					<DirectoryList linksToOmit={['/maintenance/new-record/']}/>
				</div>
				<hr className="w-1/2 border-neutral-300" />
			</div>

      <div className="bg-slate-300 p-4 rounded-lg self-center">
        <MaintenanceRecordForm />
      </div>
    </div>
  );
};

export default Home;
