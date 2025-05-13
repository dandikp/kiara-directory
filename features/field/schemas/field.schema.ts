import { SafeDepartmentSchema } from "@/features/department/schemas/department.schema";
import { z } from "zod";

export const FieldSchema = z.object({
  id: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  departmentId: z
    .number()
    .positive({ message: "ID Departemen lebih besar dari 0" }),
  name: z
    .string()
    .min(3, { message: "Nama bidang harus lebih dari 3 karakter" }),
  code: z
    .string()
    .min(3, { message: "Kode bidang harus lebih dari 3 karakter" })
    .max(32, { message: "Kode bidang maksimal 32 karakter" })
    .toUpperCase()
    .refine((value) => /^[A-Z0-9_]+/.test(value), {
      message:
        "Kode harus menggunakan huruf kapital dan tanpa spasi. Penggunaan underscore (_) dan angka diperbolehkan",
    }),
  department: SafeDepartmentSchema.nullable().optional(),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeFieldSchema = FieldSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const FieldFormSchema = FieldSchema.omit({
  id: true,
  department: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
