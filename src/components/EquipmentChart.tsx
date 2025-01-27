import { Equipment } from "@/ts/types";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
const EquipmentChart = () => {
  const sampleData: Equipment[] = [
    {
      id: "1",
      name: "default name 1",
      location: "west missisipi",
      model: "model x",
      department: "Machining",
      serialNumber: "fakesiri1xyz",
      installDate: new Date("01-01-2015"),
      status: "Down",
    },
    {
      id: "2",
      name: "a default name 2",
      location: "east missisipi",
      model: "model y",
      department: "Assembly",
      serialNumber:
        "fakesiri2somethingsupersoridculouslylongthatievenhaveextranumbers1234314314314312xyz",
      installDate: new Date(),
      status: "Retired",
    },
  ];

  const mockData = [
    { status: "Operational", count: 7, fill: "#4caf50" },
    { status: "Down", count: 3, fill: "#f44336" },
    { status: "Maintenance", count: 5, fill: "#ff9800" },
    { status: "Retired", count: 2, fill: "#9e9e9e" },
  ];
  //fill="#8884d8" - defualt blue from piechart ex

  return (
    <div className="w-full h-full bg-inherit">
      <div className="w-[600px] h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { EquipmentChart };
