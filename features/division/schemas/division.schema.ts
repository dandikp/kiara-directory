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
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});
