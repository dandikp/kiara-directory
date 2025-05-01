import { SafeDepartmentSchema } from "@/features/department/schemas/department.schema";
import { SafeFieldSchema } from "@/features/field/schemas/field.schema";
import { z } from "zod";

export const DivisionSchema = z.object({
  id: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  name: z
    .string()
    .min(3, { message: "Nama divisi harus lebih dari 3 karakter" })
    .max(128, { message: "Nama divisi maksimal 128 karakter" }),
  code: z
    .string()
    .min(3, { message: "Kode divisi harus lebih dari 3 karakter" })
    .max(32, { message: "Kode divisi maksimal 32 karakter" }),
  departmentId: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  fieldId: z
    .number()
    .gt(0)
    .positive({ message: "ID harus lebih besar dari 0" })
    .nullable()
    .optional(),
  department: SafeDepartmentSchema.nullable().optional(),
  field: SafeFieldSchema.nullable().optional(),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeDivisionSchema = DivisionSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
