import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import {
  DepartmentFormSchema,
  DepartmentSchema,
  SafeDepartmentSchema,
} from "../schemas/department.schema";

export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type SafeDepartmentType = z.infer<typeof SafeDepartmentSchema>;
export type DepartmentPageSearchParams = PaginationSearchParams &
  Partial<DepartmentType>;
export type DepartmentFormType = z.infer<typeof DepartmentFormSchema>;
