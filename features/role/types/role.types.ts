import { z } from "zod";
import {
  RoleSchema,
  SafeRoleSchema,
  SafeUserRoleSchema,
} from "../schemas/role.schema";

export type RoleType = z.infer<typeof RoleSchema>;
export type SafeRoleType = z.infer<typeof SafeRoleSchema>;
export type SafeUserRoleType = z.infer<typeof SafeUserRoleSchema>;
