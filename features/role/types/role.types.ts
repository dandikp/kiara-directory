import { z } from "zod";
import { RoleSchema, SafeRoleSchema } from "../schemas/role.schema";

export type RoleType = z.infer<typeof RoleSchema>;
export type SafeRoleType = z.infer<typeof SafeRoleSchema>;
