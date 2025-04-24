"use client";

import { FadersHorizontal } from "@phosphor-icons/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { IconWrapper } from "../icon";
import { formatStringWithSpaces } from "@/lib/string";

interface Props<TData> {
  table: Table<TData, unknown>;
}

const DatatableViewOptions = <TData,>({ table }: Props<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">
          <IconWrapper size={12} icon={FadersHorizontal} />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            const displayName =
              column.columnDef.meta?.displayColumnName || column?.id;
            const display = formatStringWithSpaces(displayName);
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {display}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DatatableViewOptions;
