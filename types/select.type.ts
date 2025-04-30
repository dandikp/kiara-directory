import type { SelectProps } from "@radix-ui/react-select";
import { HtmlHTMLAttributes } from "react";

// CustomSelectProps now explicitly combines types and resolves defaultValue conflict
interface OriginCustomSelect
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultValue?: string; // Adjust type to match SelectProps' expectation if necessary
  placeholder?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

// Final type combining CustomSelectProps and SelectProps
export type CustomSelectProps = OriginCustomSelect & SelectProps;
