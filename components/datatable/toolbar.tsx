"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FunnelSimple, Notches } from "@phosphor-icons/react";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "../ui/button";
import { DatatableFilterItem } from "@/types/datatable.type";
import useDataTableFilter from "@/hooks/use-datatable-filter";
import { IconWrapper } from "../icon";
import DatatableViewOptions from "./view-options";
import DatatableFilterInput from "./filter-input";

interface Props<TData> {
  table: Table<TData, unknown>;
  showDensity?: boolean;
  showColumnVisibility?: boolean;
  filters: DatatableFilterItem[];
  renderToolbarActions?: () => React.ReactNode;
}

const DatatableToolbar = <TData,>({
  table,
  showDensity = false,
  showColumnVisibility = false,
  filters = [],
  renderToolbarActions,
}: Props<TData>) => {
  const isManualPagination = table.options?.manualPagination;
  const [isOpen, setIsOpen] = useState(false);
  const showFilter = !isManualPagination
    ? table.getPreFilteredRowModel().rows.length > 0
    : !!filters?.length;

  const {
    filterValues,
    applyFilters,
    handleInputChange,
    handleReset,
    handleKeyDown,
    canReset,
    isAnyValuePresent,
  } = useDataTableFilter(filters);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex-1 py-1 flex flex-col gap-4 p-4"
    >
      <div className="flex flex-wrap flex-row gap-3 items-center justify-between">
        <div className="self-start inline-flex items-center justify-start gap-2">
          {showFilter && (
            <>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconWrapper size={14} icon={FunnelSimple} />
                  Filter
                </Button>
              </CollapsibleTrigger>
              {isManualPagination ? (
                <CollapsibleContent className="inline-flex gap-2">
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={applyFilters}
                    disabled={!isAnyValuePresent}
                  >
                    Apply Filter
                  </Button>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={handleReset}
                    disabled={!canReset}
                  >
                    Reset
                  </Button>
                </CollapsibleContent>
              ) : (
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => table.resetColumnFilters()}
                >
                  Reset
                </Button>
              )}
            </>
          )}
        </div>

        <div className="self-start flex md:inline-flex gap-3 justify-start md:  justify-end flex-wrap">
          {showDensity ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.toggleDensity()}
            >
              <IconWrapper size={14} icon={Notches} />
              Density
            </Button>
          ) : null}
          {showColumnVisibility ? <DatatableViewOptions table={table} /> : null}
          {renderToolbarActions?.() ?? null}
        </div>
      </div>
      <CollapsibleContent>
        <div className="flex flex-row gap-3">
          <div className="flex-1">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <DatatableFilterInput
                table={table}
                filters={filters}
                filterValues={filterValues}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DatatableToolbar;
