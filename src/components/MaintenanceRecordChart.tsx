import {
  BarChart,
  Bar,
  Sector,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useMockData } from "@/context/MockDataContext";
const MaintenanceRecordChart = () => {
  const { equipment, maintenanceRecords } = useMockData();
  const eqIdToDept = equipment.reduce(
    (acc, eq) => {
      acc[eq.id] = eq.department;
      return acc;
    },
    {} as Record<string, string>,
  );

  const deptHours = maintenanceRecords.reduce(
    (acc, record) => {
      const dept = eqIdToDept[record.equipmentId];
      if (!dept) {
        return acc;
      }
      if (!acc[dept]) {
        acc[dept] = 0;
      }
      acc[dept] += record.hoursSpent;
      return acc;
    },
    {} as Record<string, number>,
  );

  const mockData = Object.keys(deptHours).map((dept) => ({
    department: dept,
    hoursSpent: deptHours[dept],
  }));
  console.log("maintenance chart mock data");
  console.log(mockData);
  //fill="#8884d8" - defualt blue from piechart ex

  return (
    <div className="w-full h-full bg-inherit">
      <div className="w-[600px] h-[600px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis
              dataKey="department"
              tick={{ fill: "black", fontSize: 20 }}
            />
            <YAxis tick={{ fill: "black", fontSize: 20 }} />
            <Bar dataKey="hoursSpent" fill="#1e1b4b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { MaintenanceRecordChart };
