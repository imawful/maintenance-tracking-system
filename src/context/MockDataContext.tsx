import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { faker } from "@faker-js/faker";
import { Equipment, MaintenanceRecord } from "@/ts/types";
import { equipmentSchema, maintenanceRecordSchema } from "@/ts/schemas";
import { generateMock } from "@anatine/zod-mock";

//maximum is exclusive and minimum is inclusive
const randomInt = (min: number, max: number) => {
  const minCield = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCield) + minCield);
};

const generateMockEquipment = () => {
  const equipment = Array.from({ length: 50 }, (_, index) => {
    const eq = generateMock(equipmentSchema);

    const month = randomInt(1, 12);
    const day = randomInt(1, 26);
    const year = randomInt(2023, 2025);
    const date = new Date(year, month, day);

    const eqName = faker.commerce.productName();

    return { ...eq, id: index.toString(), name: eqName, installDate: date };
  });
  return equipment;
};

const generateMockRecords = (equipment: Equipment[]) => {
  const length = equipment.length > 0 ? 100 : 0;
  const records = Array.from({ length }, (_, index) => {
    const record = generateMock(maintenanceRecordSchema);
    //corresponding equipment id.
    const eqId = equipment.map((eq) => eq.id)[index % equipment.length];

    // we set a date for the maintenance record by retrieveing the
    // corresponding equipments date and then adding randomInt(1,30) days.
    const installTime = new Date(
      equipment[index % equipment.length].installDate,
    ).getTime();
    const date = new Date(installTime + randomInt(1, 30) * 24 * 60 * 60 * 1000);

    const techName = faker.name.firstName();
    return {
      ...record,
      id: String(index),
      technician: techName,
      equipmentId: eqId,
      date: date,
    };
  });
  return records;
};

interface MockDataContextType {
  equipment: Equipment[];
  maintenanceRecords: MaintenanceRecord[];
  setEquipment: Dispatch<SetStateAction<Equipment[]>>;
  setMaintenanceRecords: Dispatch<SetStateAction<MaintenanceRecord[]>>;
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
      console.log("Generating New Mock Data...");
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
      value={{
        equipment: mockEquipment,
        maintenanceRecords: mockRecords,
        setEquipment: setMockEquipment,
        setMaintenanceRecords: setMockRecords,
      }}
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
