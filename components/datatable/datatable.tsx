"use client";

import useDataTable from "@/hooks/use-datatable";
import { DataTableFilterItem } from "@/types/datatable.type";
import DatatableToolbar from "./toolbar";
import { Table } from "../ui/table";
import DatatableHeader from "./header";
import DatatableBody from "./body";
import DatatableFooter from "./footer";
import DatatablePagination from "./pagination";

type Props<TData> = {
  title: string;
  table: ReturnType<typeof useDataTable<TData>>["table"];
  showDensity?: boolean;
  showColumnVisibility?: boolean;
  showFilterPageSize?: boolean;
  filters?: DataTableFilterItem[];
  onRowClick?: (row: TData) => void;
  renderToolbarActions?: () => React.ReactNode;
  renderLegend?: () => React.ReactNode;
};

const Datatable = <TData,>({
  title,
  table,
  showDensity,
  showColumnVisibility,
  showFilterPageSize,
  filters,
  onRowClick,
  renderToolbarActions,
  renderLegend,
}: Props<TData>) => {
  const isLoading = table.getState().isLoading;
  return (
    <div className="w-full relative flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-md border overflow-x-auto py-4">
        <div className="flex flex-wrap flex-row gap-3 items-center justify-between px-4">
          <div className="self-start text-left">
            {typeof title === "string" ? (
              <h3 className="text-left text-pretty font-bold line-clamp-1">
                {title}
              </h3>
            ) : (
              title
            )}
          </div>
        </div>
        <DatatableToolbar
          table={table}
          filters={filters ?? []}
          showDensity={showDensity}
          showColumnVisibility={showColumnVisibility}
          renderToolbarActions={renderToolbarActions}
        />
        {renderLegend?.()}
        <Table>
          <DatatableHeader table={table} />
          <DatatableBody table={table} onRowClick={onRowClick} />
          <DatatableFooter table={table} />
        </Table>
        {!isLoading ? (
          <DatatablePagination
            table={table}
            showFilterPageSize={showFilterPageSize}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Datatable;
