import { z } from "zod";
import { SafeUserSchema, UserSchema } from "../schemas/user.schema";

export type UserType = z.infer<typeof UserSchema>;
export type SafeUserType = z.infer<typeof SafeUserSchema>;
