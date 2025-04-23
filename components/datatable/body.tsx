"use client";

import useDataTable from "@/hooks/use-datatable";

interface Props<T> {
  className?: string;
  table: ReturnType<typeof useDataTable<T>>["table"];
  onRowClick?: (row: T) => void;
}

const DatatableBody = <T,>({ className }: Props<T>) => {};
