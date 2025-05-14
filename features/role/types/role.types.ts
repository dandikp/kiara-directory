import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import {
  ExtendedSafeRoleSchema,
  ExtendedSafeUserRoleSchema,
  RoleFormSchema,
  RoleSchema,
  RoleScopeSchema,
  SafeRoleSchema,
  SafeRoleScopeSchema,
  SafeUserRoleSchema,
} from "../schemas/role.schema";

export type RoleType = z.infer<typeof RoleSchema>;
export type SafeRoleType = z.infer<typeof SafeRoleSchema>;
export type SafeUserRoleType = z.infer<typeof SafeUserRoleSchema>;
export type ExtendedSafeUserRoleType = z.infer<
  typeof ExtendedSafeUserRoleSchema
>;
export type ExtendedSafeRoleType = z.infer<typeof ExtendedSafeRoleSchema>;
export type RoleScopeType = z.infer<typeof RoleScopeSchema>;
export type SafeRoleScopeType = z.infer<typeof SafeRoleScopeSchema>;
export type RolePageSearchParams = PaginationSearchParams &
  Partial<SafeRoleType>;
export type RoleFormType = z.infer<typeof RoleFormSchema>;
