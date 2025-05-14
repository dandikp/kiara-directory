"use client";

import DatatableBodyCell from "@/components/datatable/body-cell";
import {
  DatatableColumnHeader,
  RenderTitle,
} from "@/components/datatable/column-header";
import Datatable from "@/components/datatable/datatable";
import { IconWrapper } from "@/components/icon";
import { TooltipWrapper } from "@/components/tooltip";
import { buttonVariants } from "@/components/ui/button";
import useDataTable from "@/hooks/use-datatable";
import useDataTablePagination from "@/hooks/use-datatable-pagination";
import { rowIndexInContext } from "@/lib/datatable.guard";
import { DatatableResponseReturn } from "@/types/response.type";
import { PencilSimple } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { SafeRoleType } from "../types/role.types";

const RoleTable = ({ data, count }: DatatableResponseReturn<SafeRoleType>) => {
  const { pagination } = useDataTablePagination();
  const columns = useMemo<ColumnDef<SafeRoleType>[]>(
    () => [
      {
        accessorKey: "id",
        meta: { displayColumnName: "id" },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="id" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell className="w-fit max-w-10 truncate font-medium">
            {rowIndexInContext(
              pagination?.pageIndex,
              pagination.pageSize,
              row.index,
            )}
          </DatatableBodyCell>
        ),
      },
      {
        accessorKey: "name",
        meta: { displayColumnName: "name" },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell>{row.getValue("name")}</DatatableBodyCell>
        ),
      },
      {
        accessorKey: "level",
        meta: {
          displayColumnName: "level",
        },
        header: ({ column }) => (
          <DatatableColumnHeader
            column={column}
            title="Level Peran / Jabatan"
          />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell>{row.getValue("level")}</DatatableBodyCell>
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
              <TooltipWrapper text="Edit Peran">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    variant: "outline",
                  })}
                  href={`/roles/${id}/edit`}
                >
                  <IconWrapper size={4} icon={PencilSimple} />
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
    perPage: count,
  });

  return (
    <Datatable
      title="Tabel Pengguna"
      table={table}
      showDensity
      showColumnVisibility
      showFilterPageSize
      filters={[
        {
          key: "search",
          placeholder: "Pencarian...",
        },
        {
          key: "email",
          placeholder: "Cari berdasar email",
        },
      ]}
    />
  );
};

export default RoleTable;
