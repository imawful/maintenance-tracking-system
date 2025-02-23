import { MaintenanceRecord } from "@/ts/types";
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

const MaintenanceRecordTable = () => {
  const { equipment, maintenanceRecords } = useMockData();

  type MaintenanceRecordTableEntry = Omit<MaintenanceRecord, "date"> & {
    date: string;
  };

  const columnHelper = createColumnHelper<MaintenanceRecordTableEntry>();
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
    columnHelper.accessor("equipmentId", {
      header: "Equipment Name",
      cell: (info) => equipment.find((eq) => eq.id === info.getValue())?.name,
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => info.getValue(),
      enableSorting: false,
      filterFn: "equals",
    }),
    columnHelper.accessor("technician", {
      header: "Technician",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("hoursSpent", {
      header: "Hours Spent",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      sortingFn: "basic",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue().split("T")[0],
      enableSorting: false,
      filterFn: (row, columnId, filterValue) => {
        const rowDate: string = row.getValue(columnId);
        return rowDate >= filtersStartDate && rowDate <= filterValue; //filtersEndDate;
      },
    }),
    columnHelper.accessor("completionStatus", {
      header: "Status",
      cell: (info) => info.getValue(),
      enableSorting: false,
      filterFn: "equals",
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

  //once records have been populated.
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const [dateMIN, setDateMIN] = useState<string>("");
  const [dateMAX, setDateMAX] = useState<string>("");
  const [filtersStartDate, setFiltersStartDate] = useState<string>("");
  const [filtersEndDate, setFiltersEndDate] = useState<string>("");

  //filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  //sorting state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  /* sampleData is valid array of type MaintenanceRecord
   *  1:1 with schema. we map it to type MaintenanceTableEntry here.
   */
  const [data, setData] = useState<MaintenanceRecordTableEntry[]>([]);

  useEffect(() => {
    if (!maintenanceRecords || maintenanceRecords.length === 0) {
      return;
    }

    const dateM = new Date(
      maintenanceRecords.reduce(
        (min, obj) => (obj.date < min ? obj.date : min),
        maintenanceRecords[0].date,
      ),
    ).toISOString();
    setDateMIN(dateM);

    const dateX = new Date(
      maintenanceRecords.reduce(
        (max, obj) => (obj.date > max ? obj.date : max),
        maintenanceRecords[0].date,
      ),
    ).toISOString();
    setDateMAX(dateX);

    setFiltersStartDate(dateM);
    setFiltersEndDate(dateX);

    const processedData = maintenanceRecords.map((record) => {
      return {
        ...record,
        date: new Date(record.date).toISOString(), //.split("T")[0],
      };
    });
    setData(processedData);
  }, [maintenanceRecords]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setContentLoaded(true);
  }, [data]);

  const maintenanceRecordTable = useReactTable({
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
    <div>
      {contentLoaded && (
        <div className="flex flex-col justify-center">
          <button
            onClick={() => {
              maintenanceRecordTable.resetSorting();
              maintenanceRecordTable.resetColumnFilters();
              setFiltersStartDate(dateMIN);
              setFiltersEndDate(dateMAX);
              maintenanceRecordTable
                .getColumn("date")
                ?.setFilterValue(filtersEndDate);
            }}
            className="bg-indigo-600 hover:bg-indigo-500 w-fit self-center text-md p-2 m-4 rounded-md text-neutral-50"
          >
            Clear Filters
          </button>
          <table className="table-fixed w-full">
            <thead className="">
              {maintenanceRecordTable.getHeaderGroups().map((hgroup) => (
                <tr key={hgroup.id} className="bg-indigo-950">
                  {hgroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={
                          header.column.id === "hoursSpent" ||
                          header.column.id === "actions"
                            ? "w-1/6 border-2 border-black"
                            : header.column.id === "date"
                              ? "w-1/2 border-2 border-black"
                              : header.column.id !== "description"
                                ? "w-1/6 border-2 border-black"
                                : "w-1/2 border-2 border-black"
                        }
                      >
                        <div
                          className={
                            header.column.getCanSort()
                              ? "font-bold break-all lg:break-normal text-lg p-3 text-neutral-50 hover:text-neutral-400"
                              : "font-bold break-all lg:break-normal text-lg p-3 text-neutral-50"
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
                            {header.column.id === "type" && (
                              <select
                                className="bg-inherit text-center hover:cursor-pointer"
                                value={
                                  (header.column.getFilterValue() as string) ||
                                  ""
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(
                                    e.target.value || undefined,
                                  )
                                }
                              >
                                <option value="">All</option>
                                <option value="Preventive">Preventive</option>
                                <option value="Repair">Repair</option>
                                <option value="Emergency">Emergency</option>
                              </select>
                            )}
                            {header.column.id === "priority" && (
                              <select
                                className="bg-inherit text-center hover:cursor-pointer"
                                value={
                                  (header.column.getFilterValue() as string) ||
                                  ""
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(
                                    e.target.value || undefined,
                                  )
                                }
                              >
                                <option value="">All</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                              </select>
                            )}
                            {header.column.id === "completionStatus" && (
                              <select
                                className="bg-inherit text-center hover:cursor-pointer"
                                value={
                                  (header.column.getFilterValue() as string) ||
                                  ""
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(
                                    e.target.value || undefined,
                                  )
                                }
                              >
                                <option value="">All</option>
                                <option value="Complete">Complete</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Pending Parts">
                                  Pending Parts
                                </option>
                              </select>
                            )}
                            {header.column.id === "date" && (
                              <div className="flex flex-col gap-2 items-center lg:flex-row">
                                <div className="align-center">
                                  <input
                                    id="start-date"
                                    value={filtersStartDate.split("T")[0]}
                                    min={dateMIN.split("T")[0]}
                                    max={filtersEndDate.split("T")[0]}
                                    onChange={(e) => {
                                      setFiltersStartDate(
                                        new Date(e.target.value).toISOString(),
                                      );
                                      header.column.setFilterValue(
                                        filtersEndDate,
                                      );
                                    }}
                                    type="date"
                                    className="bg-inherit"
                                  />
                                </div>
                                <p>-</p>
                                <div className="align-center">
                                  <input
                                    id="end-date"
                                    value={filtersEndDate.split("T")[0]}
                                    min={filtersStartDate.split("T")[0]}
                                    max={dateMAX.split("T")[0]}
                                    onChange={(e) => {
                                      if (e.target.value === dateMAX) {
                                        setFiltersEndDate(
                                          dateMAX.split("T")[0],
                                        );
                                      } else {
                                        setFiltersEndDate(
                                          new Date(
                                            e.target.value,
                                          ).toISOString(),
                                        );
                                      }
                                      header.column.setFilterValue(
                                        filtersEndDate,
                                      );
                                    }}
                                    type="date"
                                    className="bg-inherit"
                                  />
                                </div>
                                <button
                                  className="align-top mb-1 pl-2 pr-2 pt-1 pb-1 rounded-md bg-indigo-800"
                                  onClick={() => {
                                    setFiltersStartDate(dateMIN);
                                    setFiltersEndDate(dateMAX);
                                    maintenanceRecordTable
                                      .getColumn("date")
                                      ?.setFilterValue(filtersEndDate);
                                  }}
                                >
                                  Reset
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {maintenanceRecordTable.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={
                      /*
                   * color row based on priority
                  row.getVisibleCells()
                     .some(cell => cell.column.id == 'priority' && cell.getValue() === 'High')
                     ? "bg-amber-600" 
                     : row.getVisibleCells()
                          .some(cell => cell.column.id == 'priority' && cell.getValue() === 'Low')
                          ? "bg-slate-400"
                          : row.getVisibleCells()
                               .some(cell => cell.column.id === 'priority' && cell.getValue() === 'Medium')
                               ? "bg-teal-400" : "" 
                  */
                      "bg-zinc-400"
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          id={`maintenance-record-${(cell.id as string).split("_")[0]}-${
                            cell.column.id
                          }`}
                          key={cell.id}
                          className="text-center break-all lg:break-normal text-neutral-900 border-2 p-2 border-neutral-900 text-md"
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
      )}
    </div>
  );
};

export { MaintenanceRecordTable };
