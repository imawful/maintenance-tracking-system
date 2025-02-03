import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
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

  interface DeptData {
    hours: number;
    count: number;
  }
  const deptHours = maintenanceRecords.reduce(
    (acc, record) => {
      const dept = eqIdToDept[record.equipmentId];
      if (!dept) {
        return acc;
      }
      if (!acc[dept]) {
        acc[dept] = { hours: 0, count: 0 };
      }
      acc[dept].hours += record.hoursSpent;
      acc[dept].count += 1;
      return acc;
    },
    {} as Record<string, DeptData>,
  );

  const mockData = Object.keys(deptHours).map((dept) => ({
    department: dept,
    hoursSpent: deptHours[dept].hours,
    count: deptHours[dept].count,
  }));

  //fill="#8884d8" - defualt blue from piechart ex
  // flex justify-center items-center
  /*label={<Label value="Department" offset={-5} position="insideBottom" /> }*/
  return (
    <div className="w-full h-full bg-inherit">
      <div className="w-[800px] h-[600px] p-4">
        <div className="mb-4">
          <p className="text-neutral-950 text-center italic">
            Total Number of Hours:{" "}
            {mockData
              .map((md) => md.hoursSpent)
              .reduce((acc, hour) => (acc += hour), 0)}
          </p>
          <p className="text-neutral-950 text-center italic">
            Total Number of Maintenance Records:{" "}
            {mockData.map((md) => md.count).reduce((acc, c) => (acc += c), 0)}
          </p>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={mockData}>
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis
              dataKey="department"
              tick={{ fill: "black", fontSize: 16 }}
              tickFormatter={(value, index) =>
                `${value} (${mockData[index].count})`
              }
            />
            <YAxis tick={{ fill: "black", fontSize: 20 }} />
            <Bar dataKey="hoursSpent" fill="#1e1b4b">
              <LabelList dataKey="hoursSpent" position="center" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { MaintenanceRecordChart };
