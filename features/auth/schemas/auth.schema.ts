import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: "Email harus diisi",
      message: "Email harus berupa string",
    })
    .min(1, {
      message: "Email harus diisi",
    })
    .email({
      message: "Email tidak valid",
    }),
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(1, {
      message: "Password harus diisi",
    }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email harus diisi",
      message: "Email harus berupa string",
    })
    .min(1, {
      message: "Email harus diisi",
    })
    .email({
      message: "Email tidak valid",
    }),
});

export const ResetPasswordSchema = z
  .object({
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
    passwordConfirmation: z
      .string()
      .min(6, { message: "Password minimal berisi 6 karakter" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password tidak sama",
    path: ["passwordConfirmation"],
  });
