import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  name: z.string().min(3, { message: "" }),
  avatar: z.string().url().optional().nullable(),
  bio: z.string().min(1, { message: "" }).optional().nullable(),
  dob: z.string().date().optional().nullable(),
});

export { UserSchema };
