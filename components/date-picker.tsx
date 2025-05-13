"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDots } from "@phosphor-icons/react";
import moment from "moment";
import React, { HtmlHTMLAttributes } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

interface DatePickerProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "onChange"> {
  initialDate?: Date;
  value?: Date;
  placeholder?: string;
  onChange?: (date: Date) => void;
}

interface DatePickerWithRangeProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "onChange"> {
  initialDate?: DateRange;
  value?: DateRange;
  placeholder?: string;
  onChange?: (range: DateRange) => void;
}

export function DatePicker({
  className,
  initialDate,
  value,
  placeholder = "Pick a date",
  onChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    initialDate || value,
  );

  const formatDate = (date: Date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  const handleDateSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  return (
    <div className={cn("", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full flex-1 justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className,
            )}
          >
            <CalendarDots />
            {date ? formatDate(date) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DatePickerWithRange({
  className,
  initialDate,
  value,
  placeholder = "Pick a date",
  onChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange>({
    from: initialDate?.from || value?.from,
    to: initialDate?.to || value?.to,
  });

  const formatDate = (date: Date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  const handleDateSelect: SelectRangeEventHandler = (range) => {
    if (range && (range.from || range.to)) {
      setDate(range);
      onChange?.(range);
    }
  };

  return (
    <div className={cn("", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full flex-1 justify-start text-left font-normal",
              date.from && !date.to ? "border-red-500" : "",
              !date.from && "text-muted-foreground",
              className,
            )}
          >
            <CalendarDots />
            {date.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {!date?.from ? (
            <span className="p-3 text-muted-foreground">
              Please select start date and end date
            </span>
          ) : !date?.to ? (
            <span className="p-3 text-muted-foreground">
              Please select end date
            </span>
          ) : null}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
