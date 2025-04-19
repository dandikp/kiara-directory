import { SafeUserRoleSchema } from "@/features/role/schemas/role.schema";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  roleId: z.number().positive({
    message: "Role ID harus lebih dari 0",
  }),
  userRoles: z.array(SafeUserRoleSchema),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+62|62|0)[8-9][0-9]{7,11}$/, {
    message: "Nomor telepon tidak valid",
  }),
  password: z
    .string()
    .min(6, { message: "Password minimal berisi 6 karakter" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password harus mengandung satu huruf kapital (A-Z)",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password harus mengandung satu huruf kecil (a-z)",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password harus mengandung satu angka (0-9)",
    }),
  name: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, { message: "Nama harus diisi" }),
  avatar: z
    .string()
    .url({ message: "URL avatar tidak valid" })
    .nullable()
    .optional(),
  bio: z
    .string()
    .max(1024, { message: "Maksimal isi bio 1024 karakter" })
    .nullable()
    .optional(),
  dob: z.string().date(),
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeUserSchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const CreateUserSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
  .extend({
    passwordConfirmation: z
      .string()
      .min(6, { message: "Password minimal berisi 6 karakter" }),
  })
  .refine((data) => data.passwordConfirmation === data.password, {
    message: "Password dan konfirmasi password harus sama",
    path: ["passwordConfirmation"],
  });
