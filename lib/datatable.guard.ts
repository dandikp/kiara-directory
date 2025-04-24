import { DatePicker } from "@/components/date-picker";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import type { CustomSelectProps } from "@/types/custom-select";
import type { SelectProps } from "@radix-ui/react-select";
import React from "react";

type DisplayNamedComponent = {
  displayName?: string;
  name?: string;
};

const isDisplayNamedComponent = (
  component: React.JSXElementConstructor<any>,
): component is React.JSXElementConstructor<any> & DisplayNamedComponent => {
  return "displayName" in component || "name" in component;
};

// Create a set of allowed select components
const allowedSelectComponents = new Set<string>([
  "Select",
  "PaymentMethodSelect",
  "PaymentStatusSelect",
]);

export const isSelectComponent = (
  component: React.ReactElement | null,
): component is React.ReactElement<SelectProps | CustomSelectProps> => {
  if (!component || !React.isValidElement(component)) return false;

  const componentName =
    typeof component.type === "function" &&
    isDisplayNamedComponent(component.type)
      ? component.type.displayName || component.type.name
      : typeof component.type === "string"
      ? component.type
      : "";

  return !!componentName && allowedSelectComponents.has(componentName);
};

// Type guard to determine if the component is a DatePickerWithRange component
export const isDatePickerWithRange = (
  component: React.ReactElement | null,
): component is React.ReactElement<typeof DatePickerWithRange> => {
  return (
    component !== null &&
    React.isValidElement(component) && // Ensure it's a valid React element
    component.type === DatePickerWithRange // Check type directly
  );
};

export const isDatePicker = (
  component: React.ReactElement | null,
): component is React.ReactElement<typeof DatePicker> => {
  return (
    component !== null &&
    React.isValidElement(component) && // Ensure it's a valid React element
    component.type === DatePicker // Check type directly
  );
};

export const rowIndexInContext = (
  pageIndex: number,
  pageSize: number,
  rowIndex: number,
): string => (pageIndex * pageSize + rowIndex + 1).toString();
