import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useMockData } from "@/context/MockDataContext";
const EquipmentChart = () => {
  const { equipment } = useMockData();
  interface equipmentChartData {
    status: string;
    count: number;
    fill: string;
  }
  const equipmentStatus = equipment.map((eq) => eq.status);
  const operationalEquipment = equipmentStatus.filter(
    (status) => status === "Operational",
  );
  const downEquipment = equipmentStatus.filter((status) => status === "Down");
  const maintenanceEquipment = equipmentStatus.filter(
    (status) => status === "Maintenance",
  );
  const retiredEquipment = equipmentStatus.filter(
    (status) => status === "Retired",
  );

  const mockData: equipmentChartData[] = [
    {
      status: "Operational",
      count: operationalEquipment.length,
      fill: "#4caf50",
    },
    { status: "Down", count: downEquipment.length, fill: "#f44336" },
    {
      status: "Maintenance",
      count: maintenanceEquipment.length,
      fill: "#ff9800",
    },
    { status: "Retired", count: retiredEquipment.length, fill: "#9e9e9e" },
  ];

  interface BarLabelPayload {
    count: number;
    status: string;
  }
  interface EquipmentLabelProps {
    payload: BarLabelPayload;
    x: number;
    y: number;
    value: number;
  }
  const renderCustomBarLabel = ({
    payload,
    x,
    y,
    value,
  }: EquipmentLabelProps) => {
    const totalCount = mockData.map((d) => d.count).reduce((a, b) => a + b);
    const percent = Math.round((payload.count / totalCount) * 100);
    const status = payload.status;
    const dy =
      status === "Operational"
        ? -30
        : status === "Down"
          ? -15
          : status === "Maintenance"
            ? 20
            : -14;
    const dx =
      status === "Operational"
        ? 10
        : status === "Down"
          ? -40
          : status === "Maintenance"
            ? -30
            : 40;
    return (
      <text x={x} y={y} fill="black" textAnchor="middle" dx={dx} dy={dy}>
        <tspan x={x} y={y} dx={dx} dy={dy}>
          {status}
        </tspan>
        <tspan x={x} y={y} dx={dx} dy={dy + 20}>
          {value} ({percent}%)
        </tspan>
      </text>
    );
  };

  return (
    <div className="w-full h-full bg-inherit">
      <div className="w-[800px] h-[600px]">
        <div className="pt-4">
          <p className="text-center text-md text-neutral-950 italic">
            Total Number of Equipment:{" "}
            {mockData.map((md) => md.count).reduce((acc, c) => (acc += c), 0)}
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={190}
              label={renderCustomBarLabel}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { EquipmentChart };
