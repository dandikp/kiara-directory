import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface Props<TData> {
  table: Table<TData, unknown>;
  showFilterPageSize?: boolean;
}

const DatatablePagination = <TData,>({
  table,
  showFilterPageSize = false,
}: Props<TData>) => {
  if (!table.getRowModel().rows.length) return null;

  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const totalFilteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex-1 flex flex-wrap items-center justify-end px-4 gap-3">
      {selectedRowCount > 0 && (
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedRowCount} of {totalFilteredCount} row(s) selected.
        </div>
      )}
      <div className="self-end flex flex-wrap md:flex-nowrap items-center gap-x-6 gap-y-2">
        {showFilterPageSize && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-x-6 gap-y-2">
          <div className="flex w-fit lg:w-[100px] items-center justify-center text-sm font-medium">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!canPreviousPage}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!canPreviousPage}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!canNextPage}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!canNextPage}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatatablePagination;
