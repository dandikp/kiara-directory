import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import {
  CreateUserSchema,
  EditUserSchema,
  SafeUserSchema,
  SafeUserWithNoRolesSchema,
  SimpleUserSchema,
  UserRoleScopeFormSchema,
  UserSchema,
} from "../schemas/user.schema";

export type UserType = z.infer<typeof UserSchema>;
export type SafeUserType = z.infer<typeof SafeUserSchema>;
export type SimpleUserType = z.infer<typeof SimpleUserSchema>;
export type UserPageSearchParams = Promise<
  PaginationSearchParams & Partial<SimpleUserType>
>;
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type EditUserType = z.infer<typeof EditUserSchema>;
export type SafeUserWithNoRolesType = z.infer<typeof SafeUserWithNoRolesSchema>;
export type UserRoleScopeFormType = z.infer<typeof UserRoleScopeFormSchema>;
