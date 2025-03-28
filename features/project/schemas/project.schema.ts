import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  companyId: z.number().positive({
    message: "Company ID harus lebih dari 0",
  }),
  name: z
    .string()
    .min(3, { message: "Nama divisi harus lebih dari 3 karakter" })
    .max(191, { message: "Nama divisi maksimal 191 karakter" }),
  code: z
    .string()
    .min(3, { message: "Kode divisi harus lebih dari 3 karakter" })
    .max(16, { message: "Kode divisi maksimal 16 karakter" }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Tahun harus terdiri dari 4 angka" })
    .transform(Number)
    .refine((val) => val >= 1900 && val <= 2100, {
      message: "Tahun harus antara 1900-2100",
    }),
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});
