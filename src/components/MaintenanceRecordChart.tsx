import { MaintenanceRecord } from "@/ts/types";
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
const MaintenanceRecordChart = () => {
  const mockData = [
    { department: "Machining", hoursSpent: 173 },
    { department: "Assembly", hoursSpent: 203 },
    { department: "Packaging", hoursSpent: 105 },
    { department: "Shipping", hoursSpent: 102 },
  ];
  //fill="#8884d8" - defualt blue from piechart ex

  return (
    <div className="w-full h-full bg-inherit">
      <div className="w-[600px] h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Bar dataKey="hoursSpent" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { MaintenanceRecordChart };
