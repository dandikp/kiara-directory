import { Input } from "@/components/ui/input";
import {
  isDatePicker,
  isDatePickerWithRange,
  isSelectComponent,
} from "@/lib/datatable.guard";
import { formatStringWithSpaces } from "@/lib/string";
import { DataTableFilterItem } from "@/types/datatable.type";
import type { Table } from "@tanstack/react-table";
import React, { cloneElement, isValidElement } from "react";
import type { DateRange } from "react-day-picker";

export type TInputFilterValue = string | number | DateRange | Date | undefined;

type Props<TData> = {
  table: Table<TData, unknown>;
  filters: DataTableFilterItem[];
  filterValues: { [key: string]: TInputFilterValue };
  handleInputChange: (key: string, value: TInputFilterValue) => void;
  handleKeyDown: (
    key: string,
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const DatatableFilterInput = <TData,>({
  table,
  filters,
  filterValues,
  handleInputChange,
  handleKeyDown,
}: Props<TData>) => {
  const isManualPagination = table.options?.manualPagination;

  if (!isManualPagination) {
    return (
      <>
        {filters.map(({ key, placeholder, label, component }) => {
          const displayPlaceholder = placeholder
            ? formatStringWithSpaces(placeholder)
            : undefined;
          if (component) {
            const newProps = {
              key,
              name: key,
              placeholder: displayPlaceholder,
              label,
              value: (table.getColumn(key)?.getFilterValue() as string) ?? "",
              className: "h-8",
              ...(isSelectComponent(component)
                ? {
                    onValueChange: (value: string) =>
                      table.getColumn(key)?.setFilterValue(value),
                  }
                : isDatePickerWithRange(component)
                ? {
                    onChange: (range: DateRange) => {
                      table.getColumn(key)?.setFilterValue(range);
                    },
                    value: filterValues[key] as DateRange,
                    initialDate: filterValues[key] as DateRange,
                  }
                : isDatePicker(component)
                ? {
                    onChange: (date: Date) => {
                      table.getColumn(key)?.setFilterValue(date);
                    },
                    value: filterValues[key] as Date | undefined,
                    initialDate: filterValues[key] as Date | undefined,
                  }
                : {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      table.getColumn(key)?.setFilterValue(e.target.value),
                  }),
            };

            return isValidElement(component)
              ? cloneElement(component, newProps)
              : null;
          }

          const value =
            (table.getColumn(key)?.getFilterValue() as string) ?? "";

          return (
            <Input
              key={key}
              name={key}
              placeholder={displayPlaceholder}
              value={value}
              onChange={(e) =>
                table.getColumn(key)?.setFilterValue(e.target.value)
              }
              className="h-8"
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {filters.map(({ key, placeholder, label, component }) => {
        const displayPlaceholder = placeholder
          ? formatStringWithSpaces(placeholder)
          : undefined;
        if (component) {
          const newProps = {
            key,
            name: key,
            placeholder: displayPlaceholder,
            label,
            value: !!filterValues[key] ? (filterValues[key] as string) : "",
            className: "h-8",
            ...(isSelectComponent(component)
              ? {
                  onValueChange: (value: string) =>
                    handleInputChange(key, value),
                }
              : isDatePickerWithRange(component)
              ? {
                  onChange: (range: DateRange) => {
                    handleInputChange(key, range);
                  },
                  value: !!filterValues[key]
                    ? (filterValues[key] as DateRange)
                    : undefined,
                  initialDate: !!filterValues[key]
                    ? (filterValues[key] as DateRange)
                    : undefined,
                }
              : isDatePicker(component)
              ? {
                  onChange: (date: Date) => {
                    handleInputChange(key, date);
                  },
                  value: !!filterValues[key]
                    ? (filterValues[key] as Date)
                    : undefined,
                  initialDate: !!filterValues[key]
                    ? (filterValues[key] as Date)
                    : undefined,
                }
              : {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(key, e.target.value),
                  onKeyDown: (
                    e: React.KeyboardEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >,
                  ) => {
                    handleKeyDown(key, e);
                  },
                }),
          };

          return isValidElement(component)
            ? cloneElement(component, newProps)
            : null;
        }

        return (
          <Input
            key={key}
            name={key}
            placeholder={displayPlaceholder}
            value={!!filterValues[key] ? (filterValues[key] as string) : ""}
            onChange={(e) => handleInputChange(key, e.target.value)}
            onKeyDown={(e) => handleKeyDown(key, e)}
            className="h-8"
          />
        );
      })}
    </>
  );
};

export default DatatableFilterInput;
