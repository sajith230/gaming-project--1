import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";

import AddCategoryPop from "./AddCategoryPop";

interface DataTableProps<TData, TValue> {
  columns: (onDelete: (id: string) => void) => ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: (id: string) => void;
  onAddCategory: (newCategory: {
    name: string;
    description: string;
    imageUrl: string;
  }) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  onAddCategory,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns: columns(onDelete),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      {/* Mobile search bar and add menu */}
      <div className="flex items-center justify-center px-[36px] mb-[2em] gap-x-[1em] md:hidden">
        <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em] w-full">
          <CiSearch className="text-[1.6em] text-white" />
          <input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-full text-white md:w-[38ch]"
          />
        </div>
        <AddCategoryPop onAddCategory={onAddCategory} />
      </div>

      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-3xl md:rounded-md text-white">
        <div className="hidden pb-[1.2em] border-b border-b-[#0D6D49] md:flex md:justify-between md:items-center">
          {/* Title */}
          <h2 className="font-semibold text-white">Categories</h2>

          {/* Search bar and add menu */}
          <div className="flex items-center text-[0.5em] gap-x-[1em]">
            <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                placeholder="Filter names..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-[38ch] text-white"
              />
            </div>
            <AddCategoryPop onAddCategory={onAddCategory} />
          </div>
        </div>

        {/* Table */}
        <div className="text-white md:mt-[1.5em]">
          <Table className="border-separate border-spacing-y-[0.8em] px-[0.4em] text-[0.65em]">
            <TableHeader className="text-[1.1em]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-inherit border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="hidden md:table-cell h-fit py-[1em]"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-white/5 hover:bg-white/5 cursor-pointer hover:shadow-[0px_0px_5px_#00FFA1] rounded-sm text-[2em] sm:text-[1.4em]"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`py-[1.3em] px-[0.2em] ${
                          index === 0
                            ? "relative rounded-s-sm ps-[1.2em]"
                            : index === 1
                            ? "max-w-[16ch] text-nowrap overflow-hidden text-ellipsis pe-[1em] sm:max-w-[40ch] sm:pe-[0.2em]"
                            : index === 3
                            ? "rounded-e-sm"
                            : ""
                        }`}
                      >
                        {index === 0 && (
                          <div className="w-[0.3em] h-full bg-[#00FFA1] absolute top-0 left-0 rounded-full"></div>
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="ps-[2em]">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="text-[0.65em] px-[4em] mt-[2em] hidden md:flex md:items-center md:justify-between">
        <div className="flex gap-x-[1em]">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-[1em] hover:bg-[#00FFA1] px-[1em] py-[0.5em] h-fit rounded-sm"
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-[1em] hover:bg-[#00FFA1] px-[1em] py-[0.5em] h-fit rounded-sm"
          >
            Next
          </Button>
        </div>

        {/* Group select */}
        <div className="flex gap-x-[1em]">
          <p className="font-medium px-[1em] py-[0.5em] bg-white text-black rounded-sm min-w-[12ch] flex items-center justify-center h-fit">
            Selected: 0
          </p>
          <Button
            variant="secondary"
            className="font-medium w-[12ch] text-[1em] px-[1em] py-[0.5em] h-fit rounded-sm"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="font-medium w-[12ch] text-[1em] px-[1em] py-[0.5em] h-fit rounded-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
