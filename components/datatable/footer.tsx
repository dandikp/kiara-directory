import useDataTable from "@/hooks/use-datatable";
import React from "react";
import { TableCell, TableFooter, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";

interface Props<TData> {
  className?: string;
  table: ReturnType<typeof useDataTable<TData>>["table"];
}

const DatatableFooter = <TData,>({ className, table }: Props<TData>) => {
  const density = table.getState().density;
  const hasFooter = React.useMemo(
    () => table.getAllColumns().some((col) => col.columnDef.footer),
    [table],
  );

  if (!table.getRowModel().rows.length || !hasFooter) return null;

  return (
    <TableFooter className={className}>
      {table.getFooterGroups().map((footerGroup) => (
        <TableRow
          key={footerGroup.id}
          className={cn(
            density === "sm" ? "px-2" : density === "md" ? "px-4" : "px-8",
          )}
        >
          {footerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              className={cn(
                density === "sm" ? "px-2" : density === "md" ? "px-4" : "px-8",
              )}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  );
};

export default DatatableFooter;
