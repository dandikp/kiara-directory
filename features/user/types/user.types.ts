import { z } from "zod";
import {
  SafeUserSchema,
  SimpleUserSchema,
  UserSchema,
} from "../schemas/user.schema";
import { PaginationSearchParams } from "@/types/datatable.type";

export type UserType = z.infer<typeof UserSchema>;
export type SafeUserType = z.infer<typeof SafeUserSchema>;
export type SimpleUserType = z.infer<typeof SimpleUserSchema>;
export type UserPageSearchParams = PaginationSearchParams &
  Partial<SimpleUserType>;
