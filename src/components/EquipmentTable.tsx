import { Equipment } from "@/ts/types";
import {
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
  useReactTable,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
const EquipmentTable = () => {
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

  //we need custom type for the equipment entries in our table
  //since original type held a Date.
  type EquipmentTableEntry = Omit<Equipment, "installDate"> & {
    installDate: string;
  };
  const columnHelper = createColumnHelper<EquipmentTableEntry>();
  const columns = [
    /*
     * prolly dont wanna show id
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "basic",
    }),
   */
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("location", {
      header: "Location",
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("model", {
      header: "Model",
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("department", {
      header: "Department",
      cell: (info) => info.getValue(),
      enableSorting: false,
      filterFn: "equals",
    }),
    columnHelper.accessor("serialNumber", {
      header: "Serial Number",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("installDate", {
      header: "Install Date",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "datetime",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      enableSorting: false,
      filterFn: "equals",
    }),
  ];

  //filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  //sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  /* sampleData is valid array of type Equipment
   *  1:1 with schema. we map it to type EquipmentTableEntry here.
   */
  const [data, setData] = useState<EquipmentTableEntry[]>(
    sampleData.map((equipment) => {
      return {
        ...equipment,
        installDate: equipment.installDate.toDateString(),
      };
    }),
  );

  const equipmentTable = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col justify-center">
      <button
        onClick={() => {
          equipmentTable.resetColumnFilters();
          equipmentTable.resetSorting();
        }}
        className="bg-indigo-400 w-fit self-center text-md p-2 m-4 rounded-md text-neutral-50"
      >
        Clear
      </button>
      <table className="table-fixed w-full">
        <thead className="">
          {equipmentTable.getHeaderGroups().map((hgroup) => (
            <tr key={hgroup.id} className="border-2 bg-black">
              {hgroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border"
                  >
                    <div
                      className="text-lg text-neutral-50 text-center break-all p-2"
                      style={{
                        cursor: header.column.getCanSort() ? "pointer" : "",
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() && (
                      <div className="flex justify-center text-sm bg-inherit text-neutral-50 text-center">
                        {header.column.id === "status" && (
                          <select
                            className="bg-inherit text-center"
                            onChange={(e) =>
                              header.column.setFilterValue(
                                e.target.value || undefined,
                              )
                            }
                          >
                            <option value="">All</option>
                            <option value="Operational">Operational</option>
                            <option value="Retired">Retired</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Down">Down</option>
                          </select>
                        )}
                        {header.column.id === "department" && (
                          <select
                            className="bg-inherit text-center"
                            value={
                              (header.column.getFilterValue() as string) || ""
                            }
                            onChange={(e) =>
                              header.column.setFilterValue(
                                e.target.value || undefined,
                              )
                            }
                          >
                            <option value="">All</option>
                            <option value="Machining">Machining</option>
                            <option value="Assembly">Assembly</option>
                            <option value="Packaging">Packaging</option>
                            <option value="Shipping">Shipping</option>
                          </select>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {equipmentTable.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={
                  row
                    .getVisibleCells()
                    .some(
                      (cell) =>
                        cell.column.id === "status" &&
                        cell.getValue() === "Down",
                    )
                    ? "bg-red-400"
                    : row
                        .getVisibleCells()
                        .some(
                          (cell) =>
                            cell.column.id === "status" &&
                            cell.getValue() === "Operational",
                        )
                    ? "bg-green-400"
                    : row
                        .getVisibleCells()
                        .some(
                          (cell) =>
                            cell.column.id === "status" &&
                            cell.getValue() === "Maintenance",
                        )
                    ? "bg-yellow-400"
                    : "bg-zinc-400"
                }
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="text-center break-all text-md text-zinc-800 border-2 p-1 border-neutral-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { EquipmentTable };
