import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Equipment, MaintenanceRecord } from "@/ts/types";
import { equipmentSchema, maintenanceRecordSchema } from "@/ts/schemas";
import { generateMock } from "@anatine/zod-mock";

const generateMockEquipment = () => {
  const equipment = Array.from({ length: 50 }, (_, index) => {
    const eq = generateMock(equipmentSchema);
    return { ...eq, id: index.toString() };
  });
  return equipment;
};

const generateMockRecords = (equipment: Equipment[]) => {
  if (equipment.length === 0) {
    return [];
  }
  const records = Array.from({ length: 100 }, (_, index) => {
    const record = generateMock(maintenanceRecordSchema);
    const eqId = equipment.map((eq) => eq.id)[index % equipment.length];
    return { ...record, id: String(index), equipmentId: eqId };
  });
  return records;
};

interface MockDataContextType {
  equipment: Equipment[];
  maintenanceRecords: MaintenanceRecord[];
}

const MockDataContext = createContext<MockDataContextType | undefined>(
  undefined,
);

interface MockDataProviderProps {
  children: ReactNode;
}

export const MockDataProvider: React.FC<MockDataProviderProps> = ({
  children,
}) => {
  const [mockEquipment, setMockEquipment] = useState<Equipment[]>([]);
  const [mockRecords, setMockRecords] = useState<MaintenanceRecord[]>([]);

  useEffect(() => {
    const seshEquipment = sessionStorage.getItem("equipment");
    const seshRecords = sessionStorage.getItem("maintenanceRecords");
    if (seshEquipment && seshRecords) {
      setMockEquipment(JSON.parse(seshEquipment));
      setMockRecords(JSON.parse(seshRecords));
    } else {
      const newEquipment = generateMockEquipment();
      const newRecords = generateMockRecords(newEquipment);
      setMockEquipment(newEquipment);
      setMockRecords(newRecords);
      sessionStorage.setItem("equipment", JSON.stringify(newEquipment));
      sessionStorage.setItem("maintenanceRecords", JSON.stringify(newRecords));
    }
  }, []);

  return (
    <MockDataContext.Provider
      value={{ equipment: mockEquipment, maintenanceRecords: mockRecords }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
