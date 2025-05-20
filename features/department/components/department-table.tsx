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
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DepartmentType } from "../types/department.type";

const DepartmentTable = ({
  data,
  total,
}: DatatableResponseReturn<DepartmentType>) => {
  const { pagination } = useDataTablePagination();
  const columns = useMemo<ColumnDef<DepartmentType>[]>(
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
          <DatatableColumnHeader column={column} title="Kode Departemen" />
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
              <TooltipWrapper text="Edit Departemen">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    variant: "outline",
                  })}
                  href={`/departments/${id}/edit`}
                >
                  <IconWrapper size={4} icon={PencilSimple} />
                </Link>
              </TooltipWrapper>
              <TooltipWrapper text="Hapus Departemen">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    variant: "destructive",
                  })}
                  href={`/departments/${id}/delete`}
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
      title="Tabel Departemen"
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
          href="/departments/create"
        >
          <IconWrapper size={12} icon={Plus} /> Tambah Departemen
        </Link>
      )}
      filters={[
        {
          key: "search",
          placeholder: "Pencarian...",
        },
        {
          key: "code",
          placeholder: "Kode Departemen",
        },
      ]}
    />
  );
};

export default DepartmentTable;
