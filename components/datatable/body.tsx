"use client";

import useDataTable from "@/hooks/use-datatable";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";

interface Props<T> {
  className?: string;
  table: ReturnType<typeof useDataTable<T>>["table"];
  onRowClick?: (row: T) => void;
}

const DatatableBody = <T,>({ className, table, onRowClick }: Props<T>) => {
  const density = table.getState().density;

  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            className="group relative"
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
          >
            {row.getVisibleCells().map((cell) => {
              const cellMetaClass = cell.column.columnDef.meta?.className || "";
              const cellClasses = cn(
                "group",
                onRowClick && "cursor-pointer",
                density === "sm" ? "px-2" : density === "md" ? "px-4" : "px-8",
                className,
                cellMetaClass,
              );

              return (
                <TableCell key={cell.id} className={cellClasses}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow className="relative">
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center group"
          >
            Tidak ditemukan.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default DatatableBody;
