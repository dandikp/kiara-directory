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
import { Key, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { SimpleUserType } from "../types/user.types";

const UserTable = ({
  data,
  total,
}: DatatableResponseReturn<SimpleUserType>) => {
  const { pagination } = useDataTablePagination();
  const columns = useMemo<ColumnDef<SimpleUserType>[]>(
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
        accessorKey: "email",
        meta: {
          displayColumnName: "email",
        },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell>{row.getValue("email")}</DatatableBodyCell>
        ),
      },
      {
        accessorKey: "phone",
        meta: {
          displayColumnName: "phone",
        },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="No. Telepon / HP" />
        ),
        cell: (info) => (info.getValue() as string) || "-",
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
              <TooltipWrapper text="Edit Pengguna">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    variant: "outline",
                  })}
                  href={`/users/${id}/edit`}
                >
                  <IconWrapper size={4} icon={PencilSimple} />
                </Link>
              </TooltipWrapper>
              <TooltipWrapper text="Ubah Password">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    variant: "outline",
                  })}
                  href={`/users/${id}/reset-password`}
                >
                  <IconWrapper size={4} icon={Key} />
                </Link>
              </TooltipWrapper>
              <TooltipWrapper text="Hapus Pengguna">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    variant: "destructive",
                  })}
                  href={`/users/${id}/delete`}
                >
                  <IconWrapper size={4} icon={Trash} />
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
    states: {
      pagination,
    },
    perPage: total,
  });

  return (
    <Datatable
      title="Tabel Pengguna"
      table={table}
      showDensity
      showColumnVisibility
      showFilterPageSize
      renderToolbarActions={() => (
        <Link
          className={buttonVariants({
            size: "sm",
            variant: "default",
          })}
          href="/users/create"
        >
          <IconWrapper size={12} icon={Plus} /> Tambah Pengguna
        </Link>
      )}
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

export default UserTable;
