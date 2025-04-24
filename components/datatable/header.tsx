/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, Table } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

interface Props {
  table: Table<any, unknown>;
  headerStyle?: Record<string, string>;
}

const DatatableHeader: React.FC<Props> = ({ headerStyle, table }) => {
  const density = table.getState().density;

  return (
    <TableHeader className="bg-muted">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            const cellMetaClass = header.column.columnDef.meta?.className || "";

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className={cn(
                  "box-border relative",
                  i === 0 ? "w-[50px]" : "",
                  density === "sm"
                    ? "px-2"
                    : density === "md"
                    ? "px-4"
                    : "px-8",
                  headerStyle?.[header.id] || "",
                  cellMetaClass,
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DatatableHeader;
