import { Equipment } from "@/ts/types";
import { MaintenanceRecord } from "@/ts/types";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

const RecentMaintenanceActivity = () => {
  const sampleEquipmentData: Equipment[] = [
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
      installDate: new Date("01-20-2025"),
      status: "Retired",
    },
  ];
  const sampleMaintenanceData: MaintenanceRecord[] = [
    {
      id: "1",
      equipmentId: "2",
      date: new Date("01-23-2025"),
      type: "Repair",
      technician: "Javier Gonzales",
      hoursSpent: 20,
      description:
        "a very long description about some kind of maintenance that happened",
      priority: "Medium",
      completionStatus: "Pending Parts",
    },
    {
      id: "2",
      equipmentId: "1",
      date: new Date("01-25-2025"),
      type: "Emergency",
      technician: "Hugo Villa",
      hoursSpent: 10,
      partsReplaced: ["engine"],
      description: "it's an emergency they are missing a flux capacitor!",
      priority: "High",
      completionStatus: "Incomplete",
    },
  ];

  type MaintenanceRecordTableEntry = Omit<MaintenanceRecord, "date"> & {
    date: string;
    //maybe number
  };

  const columnHelper = createColumnHelper<MaintenanceRecordTableEntry>();
  const columns = [
    /*
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
   */
    columnHelper.accessor("equipmentId", {
      header: "Equipment Name",
      cell: (info) =>
        sampleEquipmentData.find(
          (equipment) => equipment.id === info.getValue(),
        )?.name,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("technician", {
      header: "Technician",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("hoursSpent", {
      header: "Hours Spent",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("completionStatus", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: (info) => info.getValue(),
      enableSorting: false,
      filterFn: "equals",
    }),
    /*
    columnHelper.display({
      id: 'actions',
      header: "Select",
      cell: (props) => props.row.id,
    }),
    */
  ];

  /* sampleData is valid array of type MaintenanceRecord
   *  1:1 with schema. we map it to type MaintenanceTableEntry here.
   */
  const [data, setData] = useState<MaintenanceRecordTableEntry[]>(
    //TODO grab the first 10 rows, where the newest dates are first!
    sampleMaintenanceData.map((record) => {
      return {
        ...record,
        date: record.date.toDateString(),
      };
    }),
  );

  const recentActivityTable = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-fixed w-full">
      <thead className="">
        {recentActivityTable.getHeaderGroups().map((hgroup) => (
          <tr key={hgroup.id} className="bg-indigo-950">
            {hgroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={
                    header.id === 'description' 
                    ? "w-3/4 border-2 border-black"
                    : "w-1/4 border-2 border-black"
                  }
                >
                  <div className="font-bold break-all lg:break-normal text-lg p-3 text-neutral-50">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {recentActivityTable.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.id}
              className={
                  row.getVisibleCells()
                     .some(cell => cell.column.id == 'priority' && cell.getValue() === 'High')
                     ? "bg-amber-600" 
                     : row.getVisibleCells()
                          .some(cell => cell.column.id == 'priority' && cell.getValue() === 'Low')
                          ? "bg-slate-400"
                          : row.getVisibleCells()
                               .some(cell => cell.column.id === 'priority' && cell.getValue() === 'Medium')
                               ? "bg-teal-400" : "" 
                //"bg-zinc-400"
              }
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="text-center break-all lg:break-normal text-neutral-900 border-2 border-neutral-900 text-md"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export { RecentMaintenanceActivity };
