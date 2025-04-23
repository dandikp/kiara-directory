/* eslint-disable @typescript-eslint/no-explicit-any */
import DensityFeature from "@/components/datatable/density";
import { DensityState } from "@/types/tanstack-table";
import {
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  Table,
} from "@tanstack/react-table";
import { getPaginationRowModel } from "@tanstack/react-table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  TableFeature,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export type DatatableHookParams<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  features?: TableFeature<TData>[];
  states?: Record<string, any>;
  perPage?: number;
};

const useDataTable = <TData>({
  data,
  columns,
  features = [],
  states = {},
  perPage,
}: DatatableHookParams<TData>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [density, setDensity] = React.useState<DensityState>("md");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const onPageChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const prevPagination = table.getState().pagination;
    const newPagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue(table.getState().pagination)
        : updaterOrValue;
    const params = new URLSearchParams(searchParams.toString());
    const isChanged = newPagination.pageSize !== prevPagination.pageSize;

    params.set("page", (newPagination.pageIndex + 1).toString());
    params.set("pageSize", newPagination.pageSize.toString());
    if (isChanged) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const table: Table<TData, unknown> = useReactTable<TData>({
    _features: [DensityFeature, ...features],
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      density,
      ...states,
    },
    rowCount: perPage,
    debugTable: false,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: onPageChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onDensityChange: setDensity,
  });

  return {
    table,
    density,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  };
};

export default useDataTable;
