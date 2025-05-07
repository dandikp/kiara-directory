"use client";

import DatatableBodyCell from "@/components/datatable/body-cell";
import {
  DatatableColumnHeader,
  RenderTitle,
} from "@/components/datatable/column-header";
import Datatable from "@/components/datatable/datatable";
import { IconWrapper } from "@/components/icon";
import { TooltipWrapper } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import useDataTable from "@/hooks/use-datatable";
import useDataTablePagination from "@/hooks/use-datatable-pagination";
import { rowIndexInContext } from "@/lib/datatable.guard";
import { DatatableResponseReturn } from "@/types/response.type";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { SafeFieldType } from "../types/field.type";

const FieldTable = ({
  data,
  total,
}: DatatableResponseReturn<SafeFieldType>) => {
  const { pagination } = useDataTablePagination();
  const columns = useMemo<ColumnDef<SafeFieldType>[]>(
    () => [
      {
        accessorKey: "id",
        meta: {
          displayColumnName: "id",
        },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="id" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell className="w-fit max-w-10 truncate font-medium">
            {rowIndexInContext(
              pagination?.pageIndex,
              pagination?.pageSize,
              row.index,
            )}
          </DatatableBodyCell>
        ),
      },
      {
        accessorKey: "name",
        meta: {
          displayColumnName: "name",
        },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell>{row.getValue("name")}</DatatableBodyCell>
        ),
      },
      {
        accessorKey: "code",
        meta: {
          displayColumnName: "code",
        },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Kode Bidang Kerja" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell>{row.getValue("code")}</DatatableBodyCell>
        ),
      },
      {
        accessorKey: "actions",
        meta: {
          displayColumnName: "actions",
        },
        enableSorting: false,
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            render={() => (
              <RenderTitle title="actions" className="w-full justify-end" />
            )}
          />
        ),
        cell: ({ row }) => {
          const id = row.getValue("id") as string;
          return (
            <div className="flex gap-2 self-end justify-end">
              <TooltipWrapper text="Edit Bidang Kerja">
                <Link href={`/fields/${id}/edit`}>
                  <Button size="icon" variant="outline">
                    <IconWrapper size={4} icon={PencilSimple} />
                  </Button>
                </Link>
              </TooltipWrapper>
              <TooltipWrapper text="Hapus Bidang Kerja">
                <Link href={`/fields/${id}/delete`}>
                  <Button size="icon" variant="destructive">
                    <IconWrapper size={4} icon={Trash} />
                  </Button>
                </Link>
              </TooltipWrapper>
            </div>
          );
        },
      },
    ],
    [pagination?.pageIndex, pagination?.pageSize],
  );

  const { table } = useDataTable({
    data,
    columns,
    states: { pagination },
    perPage: total,
  });

  return (
    <Datatable
      title="Tabel Bidang Kerja"
      table={table}
      showDensity
      showColumnVisibility
      showFilterPageSize
      renderToolbarActions={() => (
        <Link href={`#`}>
          <Button size="sm" variant="default">
            <IconWrapper size={12} icon={Plus} /> Tambah Bidang Kerja
          </Button>
        </Link>
      )}
      filters={[
        {
          key: "search",
          placeholder: "Pencarian...",
        },
        {
          key: "code",
          placeholder: "Kode Bidang Kerja",
        },
      ]}
    />
  );
};

export default FieldTable;
