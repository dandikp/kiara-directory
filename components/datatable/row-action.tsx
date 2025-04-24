"use client";

import { formatStringWithSpaces } from "@/lib/string";
import { cn } from "@/lib/utils";
import { GearSix } from "@phosphor-icons/react";
import { cloneElement, isValidElement } from "react";
import { IconWrapper } from "../icon";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Item = {
  label: string;
  component?: React.ReactElement;
};

type DatatableRowActionsProps = {
  className?: string;
  items?: Item[];
  renderItems?: () => React.ReactNode;
};

type RowActionItemWrapperProps = {
  className?: string;
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
};

export const RowActionItemWrapper = ({
  className,
  children,
  align = "end",
}: RowActionItemWrapperProps) => {
  const classes = cn("w-[160px] flex flex-col gap-1", className);
  return (
    <DropdownMenuContent align={align} className={classes}>
      {children}
    </DropdownMenuContent>
  );
};

const DefaultRowItems = ({ items }: { items: Item[] }) => {
  return (
    <RowActionItemWrapper className="group">
      {items?.map((item, index) => {
        const { label, component } = item;
        const displayLabel = label ? formatStringWithSpaces(label) : label;
        const isValidComponent = isValidElement(component);
        const classes = cn(
          "hover:text-blue-500 hover:cursor-pointer   focus:bg-transparent px-2 py-1 text-sm w-full ",
        );
        const newProps = {
          key: index,
          className: classes,
        };
        if (isValidComponent) {
          return isValidElement(component) ? (
            cloneElement(component, newProps, displayLabel)
          ) : (
            <DropdownMenuItem key={index}>{displayLabel}</DropdownMenuItem>
          );
        }

        return <DropdownMenuItem key={index}>{label}</DropdownMenuItem>;
      })}
    </RowActionItemWrapper>
  );
};

export function DatatableRowActions({
  items,
  renderItems,
}: DatatableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant="outline"
          className="data-[state=open]:bg-muted"
        >
          <IconWrapper size={4} icon={GearSix} />
        </Button>
      </DropdownMenuTrigger>
      {!!items ? <DefaultRowItems items={items} /> : renderItems?.() ?? null}
    </DropdownMenu>
  );
}
