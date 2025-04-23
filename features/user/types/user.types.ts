import { z } from "zod";
import {
  SafeUserSchema,
  SimpleUserType,
  UserSchema,
} from "../schemas/user.schema";

export type UserType = z.infer<typeof UserSchema>;
export type SafeUserType = z.infer<typeof SafeUserSchema>;
export type SimpleUserType = z.infer<typeof SimpleUserType>;
