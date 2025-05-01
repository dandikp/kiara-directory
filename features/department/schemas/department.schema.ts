import { DivisionSchema } from "@/features/division/schemas/division.schema";
import { FieldSchema } from "@/features/field/schemas/field.schema";
import { z } from "zod";

export const DepartmentSchema = z.object({
  id: z.number().positive(),
  name: z
    .string()
    .min(3, { message: "Nama divisi harus lebih dari 3 karakter" })
    .max(128, { message: "Nama divisi maksimal 128 karakter" }),
  code: z
    .string()
    .min(3, { message: "Kode divisi harus lebih dari 3 karakter" })
    .max(32, { message: "Kode divisi maksimal 32 karakter" }),
  divisions: z.array(DivisionSchema).nullable().optional(),
  fields: z.array(FieldSchema).nullable().optional(),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeDepartmentSchema = DepartmentSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
