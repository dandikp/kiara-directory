import { z } from "zod";

export const CompanySchema = z.object({
  id: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  name: z
    .string()
    .min(3, { message: "Nama perusahaan harus lebih dari 3 karakter" })
    .max(128, { message: "Nama perusahaan maksimal 128 karakter" }),
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});
