import { z } from "zod";
import {
  DepartmentSchema,
  SafeDepartmentSchema,
} from "../schemas/department.schema";
import { PaginationSearchParams } from "@/types/datatable.type";

export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type SafeDepartmentType = z.infer<typeof SafeDepartmentSchema>;
export type DepartmentPageSearchParams = PaginationSearchParams &
  Partial<DepartmentType>;
