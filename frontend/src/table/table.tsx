import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationOptions,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Filters } from "../api/types";
import { Card, Typography } from "@material-tailwind/react";

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

type Props<T extends Record<string, string | number>> = {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationState;
  paginationOptions: Pick<PaginationOptions, "onPaginationChange" | "rowCount">;
  filters: Filters<T>;
  onFilterChange: (dataFilters: Partial<T>) => void;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
};

export default function Table<T extends Record<string, string | number>>({
  data,
  columns,
  pagination,
  paginationOptions,
  // filters,
  // onFilterChange,
  sorting,
  onSortingChange,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onSortingChange,
    ...paginationOptions,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // const fieldMeta = header.column.columnDef.meta;
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <>
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                  false: " 🔃",
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="even:bg-blue-gray-50/50">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="flex items-center gap-2 my-2">
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || data.length === 0}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || data.length === 0}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || data.length === 0}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage() || data.length === 0}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {data.length !== 0 ? table.getPageCount() : 0}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            disabled={data.length === 0}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16  disabled:cursor-not-allowed"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
