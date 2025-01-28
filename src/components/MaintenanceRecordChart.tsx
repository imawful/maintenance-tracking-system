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
      <div className="w-[600px] h-[600px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis dataKey="department" tick={{fill: 'black', fontSize: 20}}/>
            <YAxis tick={{fill: 'black', fontSize: 20}}/>
            <Bar dataKey="hoursSpent" fill="#1e1b4b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { MaintenanceRecordChart };
