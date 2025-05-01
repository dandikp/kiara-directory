import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import { FieldSchema, SafeFieldSchema } from "../schemas/field.schema";

export type FieldType = z.infer<typeof FieldSchema>;
export type SafeFieldType = z.infer<typeof SafeFieldSchema>;
export type FieldPageSearchParams = PaginationSearchParams & Partial<FieldType>;
