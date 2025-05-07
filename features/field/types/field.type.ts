import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import {
  FieldFormSchema,
  FieldSchema,
  SafeFieldSchema,
} from "../schemas/field.schema";

export type FieldType = z.infer<typeof FieldSchema>;
export type SafeFieldType = z.infer<typeof SafeFieldSchema>;
export type FieldPageSearchParams = PaginationSearchParams & Partial<FieldType>;
export type FieldFormType = z.infer<typeof FieldFormSchema>;
