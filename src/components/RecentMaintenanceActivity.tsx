import { MaintenanceRecord } from "@/ts/types";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { useMockData } from "@/context/MockDataContext";

const RecentMaintenanceActivity = () => {
  const { equipment, maintenanceRecords } = useMockData();
  const sampleEquipmentData = equipment;
  const sampleMaintenanceData = maintenanceRecords;

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
   *  useEffect was needed here since we are doing "new Date()" to sort
   *  the maintenance activity. the maintenance records was added
   *  to dependency array so that we get our data when we receive the
   *  data from the provider.
   */
  const [data, setData] = useState<MaintenanceRecordTableEntry[]>([]);
  useEffect(() => {
    const filteredData = sampleMaintenanceData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
      .map((record) => ({
        ...record,
        date: new Date(record.date).toDateString(),
      }));
    setData(filteredData);
  }, [sampleMaintenanceData]);
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
                    header.id === "description"
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
                row
                  .getVisibleCells()
                  .some(
                    (cell) =>
                      cell.column.id == "priority" &&
                      cell.getValue() === "High",
                  )
                  ? "bg-amber-600"
                  : row
                      .getVisibleCells()
                      .some(
                        (cell) =>
                          cell.column.id == "priority" &&
                          cell.getValue() === "Low",
                      )
                  ? "bg-slate-400"
                  : row
                      .getVisibleCells()
                      .some(
                        (cell) =>
                          cell.column.id === "priority" &&
                          cell.getValue() === "Medium",
                      )
                  ? "bg-teal-400"
                  : ""
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
