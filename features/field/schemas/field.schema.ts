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
    .min(3, { message: "Kode bidang harus lebih dari 3 karakter" }),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});
