import { formatStringWithSpaces } from "@/lib/string";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { ReactNode } from "react";
import { IconWrapper } from "../icon";
import {
  FunnelSimpleX,
  SortAscending,
  SortDescending,
} from "@phosphor-icons/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

export const RenderTitle = ({ title, className }: Props) => {
  const displayTitle = formatStringWithSpaces(title);
  return (
    <span
      className={cn(
        "capitalize inline-flex gap-2 justify-center items-center",
        className,
      )}
    >
      {displayTitle}
    </span>
  );
};

interface DatatableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title?: string;
  titleClassName?: string;
  disabled?: boolean;
  render?: () => ReactNode;
}

export function DatatableColumnHeader<TData, TValue>({
  column,
  title,
  titleClassName,
  className,
  disabled = false,
  render,
}: Readonly<DatatableColumnHeaderProps<TData, TValue>>) {
  const isSorted = !!column.getIsSorted();

  if (!column.getCanSort()) {
    return (
      <div
        className={cn("flex items-center space-x-2 cursor-pointer", className)}
      >
        {title ? (
          <RenderTitle title={title} className={titleClassName} />
        ) : (
          render?.()
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-2 cursor-pointer hover:text-blue-500",
        isSorted ? "text-blue-500" : "",
        disabled ? "cursor-not-allowed opacity-50" : "",
        className,
      )}
      onClick={!disabled ? column.getToggleSortingHandler() : undefined}
      aria-disabled={disabled}
    >
      {title ? (
        <RenderTitle title={title} className={titleClassName} />
      ) : (
        render?.()
      )}

      {column.getCanSort() ? (
        isSorted ? (
          <IconWrapper
            size={4}
            icon={
              column.getIsSorted() === "asc" ? SortAscending : SortDescending
            }
          />
        ) : (
          <IconWrapper size={4} icon={FunnelSimpleX} />
        )
      ) : null}
    </div>
  );
}
