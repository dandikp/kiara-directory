import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import {
  DivisionFormSchema,
  DivisionSchema,
  SafeDivisionSchema,
} from "../schemas/division.schema";

export type DivisionType = z.infer<typeof DivisionSchema>;
export type SafeDivisionType = z.infer<typeof SafeDivisionSchema>;
export type DivisionPageSearchParams = PaginationSearchParams &
  Partial<DivisionType>;
export type DivisionFormType = z.infer<typeof DivisionFormSchema>;
