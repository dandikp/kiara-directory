import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3, {
    message: "Nama minimal harus 3 karakter",
  }),
  level: z
    .number()
    .gte(1, {
      message: "Level minimal 1 (tertinggi)",
    })
    .lte(7, {
      message: "Level maksimal 7 (terendah)",
    }),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeRoleSchema = RoleSchema.omit({
  createdAt: true,
  updatedAt: true,
});
