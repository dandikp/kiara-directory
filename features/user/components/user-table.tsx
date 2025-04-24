"use client";

import DatatableBodyCell from "@/components/datatable/body-cell";
import {
  DatatableColumnHeader,
  RenderTitle,
} from "@/components/datatable/column-header";
import { IconWrapper } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import useDataTable from "@/hooks/use-datatable";
import useDataTablePagination from "@/hooks/use-datatable-pagination";
import { rowIndexInContext } from "@/lib/datatable.guard";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";

const UserAdminsTable = ({ data, rowCount }: GetUserResponse) => {
  const { pagination } = useDataTablePagination();

  const columns = useMemo<ColumnDef<UserType>[]>(
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
          <DatatableBodyCell className="w-fit max-w-[40px] truncate font-medium">
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
          <DatatableColumnHeader column={column} title="Name" />
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
          <DatatableColumnHeader column={column} title="email" />
        ),
        cell: ({ row }) => (
          <DatatableBodyCell>{row.getValue("email")}</DatatableBodyCell>
        ),
      },
      {
        accessorKey: "role",
        meta: {
          displayColumnName: "role",
        },
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Role" />
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
              <Tooltip title="Edit User">
                <Link href={`/admin/users/admins/${id}/edit`}>
                  <Button size={"icon"} variant={"outline"}>
                    <IconWrapper size={4} icon={PencilSimple} />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title={"Delete User"}>
                <Link href={`/admin/users/admins/${id}/delete`}>
                  <Button size={"icon"} variant={"destructive"}>
                    <IconWrapper size={4} icon={Trash} />
                  </Button>
                </Link>
              </Tooltip>
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
    perPage: rowCount,
  });

  return (
    <DataTable
      title={"Admin List"}
      table={table}
      showDensity
      showColumnVisibility
      showFilterPageSize
      renderToolbarActions={() => (
        <Link href={`/admin/users/admins/add`}>
          <Button size={"sm"} variant={"default"}>
            <IconWrapper size={12} icon={Plus} /> Add Record
          </Button>
        </Link>
      )}
      filters={[
        {
          key: "name",
          placeholder: "Filter name",
        },
        {
          key: "email",
          placeholder: "Filter email",
        },
      ]}
    />
  );
};

export default UserAdminsTable;
