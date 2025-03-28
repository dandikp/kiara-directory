import { z } from "zod";

export const Team = z.object({
  id: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  name: z
    .string()
    .min(3, { message: "Nama tim harus lebih dari 3 karakter" })
    .max(128, { message: "Nama tim maksimal 128 karakter" }),
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});
