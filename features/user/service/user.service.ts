import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  role_id: z.number(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+62|62|0)[8-9][0-9]{7,11}$/, {
    message: "Nomor telepon tidak valid",
  }),
  password: z.string().min(1, { message: "Password harus diisi." }),
  name: z
    .string({
      required_error: "Nama harus diisi.",
    })
    .min(1, { message: "Nama harus diisi." }),
  avatar: z
    .string()
    .url({ message: "URL avatar tidak valid." })
    .nullable()
    .optional(),
  bio: z
    .string()
    .max(1024, { message: "Maksimal isi bio 1024 karakter." })
    .nullable()
    .optional(),
  dob: z.string().date(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
});
