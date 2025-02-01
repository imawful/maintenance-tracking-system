import { DirectoryList } from "@/components/DirectoryList";
import { EquipmentChart } from "@/components/EquipmentChart";
import { MaintenanceRecordChart } from "@/components/MaintenanceRecordChart";
import { RecentMaintenanceActivity } from "@/components/RecentMaintenanceActivity";
const Dashboard = () => {
  return (
    <div className="flex flex-row bg-slate-100 justify-start gap-1 h-fit">
      <div className="flex-2 flex flex-col w-full">
        <div className="flex flex-col items-center justify-center mt-8 mb-8 space-y-4">
          <h1 className="text-7xl font-extrabold text-neutral-950 tracking-tight">
            Tracking System Dashboard
          </h1>
          <p className="text-lg text-neutral-900">
            Overview of maintenance metrics and latest activity.
          </p>
          <div className="w-2/4 self-center">
            <DirectoryList linksToOmit={["/"]} />
          </div>
          <hr className="w-1/2 border-neutral-300" />
        </div>
        <div className="flex flex-row  justify-between">
          <div className="border bg-slate-300 rounded-lg w-fit h-fit ml-20">
            <p className="text-4xl text-center text-neutral-950 m-4">
              Equipment Status Breakdown
            </p>
            <div className="bg-slate-200 m-4">
              <EquipmentChart />
            </div>
          </div>
          <div className="border bg-slate-300 rounded-lg h-fit w-fit mr-20">
            <p className="text-4xl text-center text-neutral-950 m-4">
              Maintenance Hours by Department
            </p>
            <div className="bg-slate-200 m-4">
              <MaintenanceRecordChart />
            </div>
          </div>
        </div>
        <div className="bg-slate-200 w-fit m-4 h-full">
          <p className="text-6xl text-center self-center text-neutral-950 mt-4 mb-4">
            Recent Maintenace Activity
          </p>
          <div className="border m-4 bg-slate-300">
            <RecentMaintenanceActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
