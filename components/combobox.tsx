import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

type Option = {
  label: string;
  value: string;
};

interface ComboboxProps {
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
}

function Combobox({
  options,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  emptyText = "Data tidak ditemukan.",
  value,
  onChange,
  className,
}: ComboboxProps) {
  console.log({ options });
  const [open, setOpen] = React.useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-w-64 z-[100]">
        <Command className="z-[60]">
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList className="z-[100] pointer-events-auto">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (onChange) {
                      onChange(currentValue === value ? "" : currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
