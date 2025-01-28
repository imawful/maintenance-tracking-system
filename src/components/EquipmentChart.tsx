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
  
  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    const totalCount = mockData.map(d => d.count).reduce((a,b) => a+b);
    const percent = Math.round((payload.count/totalCount) * 100);
    const status = payload.status;
    const dy = status === 'Operational'
               ? -30 : status === 'Down'
               ? 5 : status === 'Maintenance'
               ? 20 : 4;
    const dx = status === 'Operational'
               ? 0 : status === 'Down'
               ? -30 : status === 'Maintenance'
               ? 0 : 40;
    return (
      <text x={x} y={y} fill="black" textAnchor="middle" dx={dx} dy={dy}>
        <tspan x={x} y={y} dx={dx} dy={dy}>{status}</tspan>
        <tspan x={x} y={y} dx={dx} dy={dy+20}>{value} ({percent}%)</tspan>
      </text>
    );
	};

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
              outerRadius={170}
              label={renderCustomBarLabel}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { EquipmentChart };
