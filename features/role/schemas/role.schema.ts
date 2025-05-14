import { DepartmentSchema } from "@/features/department/schemas/department.schema";
import { DivisionSchema } from "@/features/division/schemas/division.schema";
import { FieldSchema } from "@/features/field/schemas/field.schema";
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
    .lte(8, {
      message: "Level maksimal 7 (terendah)",
    }),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeRoleSchema = RoleSchema.omit({
  createdAt: true,
  updatedAt: true,
});

const ScopeTypeEnum = ["DEPARTMENT", "FIELD", "DIVISION"] as const;

export const ExtendedSafeRoleSchema = SafeRoleSchema.extend({
  roleName: z.string(),
  scopeType: z.enum(ScopeTypeEnum).nullable(),
  scopeName: z.string(),
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

export const ExtendedSafeUserRoleSchema = SafeUserRoleSchema.extend({
  role: ExtendedSafeRoleSchema,
});

export const RoleScopeSchema = z.object({
  id: z.number().positive(),
  userRoleId: z.number().positive(),
  scopeType: z.enum(ScopeTypeEnum).nullable(),
  departmentId: z.number().positive().nullable().optional(),
  fieldId: z.number().positive().nullable().optional(),
  divisionId: z.number().positive().nullable().optional(),
  createdAt: z.string().time({ precision: 3 }).nullable().optional(),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeRoleScopeSchema = RoleScopeSchema.omit({
  createdAt: true,
  updatedAt: true,
}).extend({
  department: DepartmentSchema.pick({ name: true }).nullable().optional(),
  field: FieldSchema.pick({ name: true }).nullable().optional(),
  division: DivisionSchema.pick({ name: true }).nullable().optional(),
});

export const RoleFormSchema = SafeRoleSchema.omit({ id: true });
