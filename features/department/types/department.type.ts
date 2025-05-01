import { z } from "zod";
import { DepartmentSchema } from "../schemas/department.schema";
import { PaginationSearchParams } from "@/types/datatable.type";

export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type DepartmentPageSearchParams = PaginationSearchParams &
  Partial<DepartmentType>;
