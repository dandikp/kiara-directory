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

export const UserRoleSchema = z.object({
  id: z.number().positive(),
  userId: z.number().positive(),
  roleId: z.number().positive(),
  role: SafeRoleSchema,
  isMain: z.boolean(),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeUserRoleSchema = UserRoleSchema.omit({
  createdAt: true,
  updatedAt: true,
});
