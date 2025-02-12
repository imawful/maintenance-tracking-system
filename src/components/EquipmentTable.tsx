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
import { useMockData } from "@/context/MockDataContext";
import { useState, useEffect } from "react";
const EquipmentTable = () => {
  const { equipment } = useMockData();

  //we need custom type for the equipment entries in our table
  //since original type held a Date.
  type EquipmentTableEntry = Omit<Equipment, "installDate"> & {
    installDate: string;
  };
  const columnHelper = createColumnHelper<EquipmentTableEntry>();
  const columns = [
    /*
     * prolly dont wanna show id
     */
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
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
      cell: (info) => info.getValue().split("T")[0],
      enableColumnFilter: false,
      sortingFn: "datetime",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      enableSorting: false,
      filterFn: "equals",
    }),
    columnHelper.display({
      id: "actions",
      header: "Select",
      cell: (props) => {
        const id = props.row.id;
        return (
          <a
            href={`./equipment/${id}/edit`}
            className="bg-indigo-600 hover:bg-indigo-500 w-fit self-center text-center text-md p-2 m-4 rounded-md text-neutral-50"
          >
            Edit
          </a>
        );
      },
    }),
  ];

  //filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  //sorting state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  /* sampleData is valid array of type Equipment
   *  1:1 with schema. we map it to type EquipmentTableEntry here.
   */
  const [data, setData] = useState<EquipmentTableEntry[]>([]);
  useEffect(() => {
    const processedSampleData = equipment.map((eq) => ({
      ...eq,
      installDate: new Date(eq.installDate).toISOString(),
    }));
    setData(processedSampleData);
  }, [equipment]);

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
        id="clear-filter-button"
        onClick={() => {
          equipmentTable.resetColumnFilters();
          equipmentTable.resetSorting();
        }}
        className="bg-indigo-600 hover:bg-indigo-500 w-fit self-center text-center text-md p-2 m-4 rounded-md text-neutral-50"
      >
        Clear Filters
      </button>
      <table className="table-fixed w-full">
        <thead className="">
          {equipmentTable.getHeaderGroups().map((hgroup) => (
            <tr key={hgroup.id} className="bg-indigo-950">
              {hgroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      header.column.id === "actions"
                        ? "w-1/3 border-2 border-black"
                        : "w-2/3 border-2 border-black"
                    }
                  >
                    <div
                      className={
                        header.column.getCanSort()
                          ? "text-lg text-neutral-50 text-center break-all p-2 hover:text-neutral-400"
                          : "text-lg text-neutral-50 text-center break-all p-2"
                      }
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
                            id="equipment-status-filter"
                            className="bg-inherit text-center hover:cursor-pointer"
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
                            <option value="Operational">Operational</option>
                            <option value="Retired">Retired</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Down">Down</option>
                          </select>
                        )}
                        {header.column.id === "department" && (
                          <select
                            id="equipment-department-filter"
                            className="bg-inherit text-center hover:cursor-pointer"
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
                      id={`equipment-${(cell.id as string).split("_")[0]}-${
                        cell.column.id
                      }`}
                      className="text-center break-all text-md text-neutral-900 border-2 p-1 border-neutral-900"
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
