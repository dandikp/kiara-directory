"use server";

import { prisma } from "@/lib/database";
import AppResponse from "@/lib/response/AppResponse";
import crypto from "crypto";
import { z } from "zod";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ResetTokenSchema,
} from "../schemas/auth.schema";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export type CreateResetPasswordTokenReturn = {
  existed: boolean;
  createdAt: Date;
  expiredAt: Date | null;
};

const generateResetToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const createResetPasswordToken = async (
  data: z.infer<typeof ForgotPasswordSchema>,
) => {
  const validation = ForgotPasswordSchema.safeParse(data);
  if (!validation.success) {
    return AppResponse.error(
      `Form tidak valid, mohon cek ulang dan pastikan Anda telah mengisi semua form, ${validation.error.message}`,
      400,
    ).toJSON();
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || user.deletedAt) {
      return AppResponse.error(
        `Pengguna dengan email ${data.email} tidak ditemukan.`,
        400,
      ).toJSON();
    }

    let token = await prisma.resetPassword.findFirst({
      where: {
        userId: user.id,
        expiredAt: {
          gt: new Date(),
        },
        usedAt: null,
      },
    });

    if (!token) {
      const expiredAt = new Date(Date.now() + 1000 * 60 * 15); // Expired in 15 minutes
      token = await prisma.resetPassword.create({
        data: {
          userId: user.id,
          token: generateResetToken(),
          expiredAt,
          usedAt: null,
        },
      });
    }

    return AppResponse.success<CreateResetPasswordTokenReturn>(
      "Permintaan reset password telah dikirim ke email Anda",
      {
        existed: true,
        createdAt: token.createdAt,
        expiredAt: token.expiredAt,
      },
      200,
    ).toJSON();
  } catch (error) {
    const err = error as Error;
    return AppResponse.error(
      err.message || "Terjadi kesalahan, coba lagi.",
      400,
    ).toJSON();
  }
};

export const getResetPasswordToken = async (token: string) => {
  const validation = ResetTokenSchema.safeParse({ token });
  if (!validation.success) {
    return AppResponse.error(
      validation.error.message || "Terjadi kesalahan validasi, coba lagi.",
      400,
    ).toJSON();
  }

  const resetToken = await prisma.resetPassword.findFirst({
    where: {
      token: token,
      expiredAt: { gte: new Date() },
      usedAt: null,
    },
  });

  if (!resetToken) {
    return AppResponse.error(
      "Token tidak valid, sudah kedaluwarsa, atau telah digunakan sebelumnya. Jika Anda belum mengatur ulang password, silakan lakukan permintaan reset kembali.",
      404,
    ).toJSON();
  }

  return AppResponse.success<CreateResetPasswordTokenReturn>(
    "Token ditemukan",
    {
      existed: true,
      createdAt: resetToken.createdAt,
      expiredAt: resetToken.expiredAt,
    },
  ).toJSON();
};

export const setNewPasswordByToken = async (
  token: string,
  userId: number,
  data: z.infer<typeof ResetPasswordSchema>,
) => {
  const validation = ResetPasswordSchema.safeParse(data);
  if (!validation.success) {
    return AppResponse.error(
      `Form tidak valid, mohon cek ulang dan pastikan Anda telah mengisi semua form, ${validation.error.message}`,
      400,
    ).toJSON();
  }

  const resetToken = await prisma.resetPassword.findFirst({
    where: {
      userId,
      token,
      expiredAt: { gte: new Date() },
      usedAt: null,
    },
  });

  if (!resetToken) {
    return AppResponse.error(
      "Token tidak valid, sudah kedaluwarsa, atau telah digunakan sebelumnya.",
      404,
    ).toJSON();
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: bcrypt.hashSync(data.password, 10) },
      }),
      prisma.resetPassword.update({
        where: {
          id: resetToken.id,
        },
        data: { usedAt: new Date() },
      }),
    ]);

    AppResponse.success(
      "Berhasil mengatur ulang kata sandi Anda. Silakan masuk menggunakan kata sandi yang baru.",
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("🧠 Prisma Error Code:", error.code);
      console.error("📄 Meta Info:", error.meta);

      return AppResponse.error(
        `Terjadi kesalahan: ${error.message}`,
        500,
      ).toJSON();
    }

    console.error("🛑 Unexpected Error:", error);

    return AppResponse.error(
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan yang tidak diketahui. Coba beberapa saat lagi.",
      500,
    ).toJSON();
  }
};

// export const createUser = async (
//   data: CreateUserType,
//   revalidateUrl?: string,
// ): Promise<CustomResponse> => {
//   const validate = CreateUserSchema.safeParse(data);

//   if (!validate.success) {
//     return await handleResponse(
//       "Validation error: " +
//         validate.error.errors.map((e) => e.message).join(", "),
//       false,
//     );
//   }

//   try {
//     const API_KEY = process.env.REOON_API_KEY ?? "";
//     const mailValidator = new MailValidator(API_KEY);
//     const validateEmail = await mailValidator.validate(validate.data.email);

//     if (validateEmail.status !== "safe") {
//       return await handleResponse(
//         `${validateEmail.email} is not a valid email address. Please use another email address!`,
//         false,
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { email: validate.data.email },
//     });

//     if (existingUser && !existingUser.deletedAt) {
//       return await handleResponse(
//         `Email ${validate.data.email} is already in use.`,
//         false,
//       );
//     }

//     const hashedPassword = await bcrypt.hash(validate.data.password, 10);

//     if (existingUser && existingUser.deletedAt) {
//       await prisma.user.update({
//         where: { id: existingUser.id },
//         data: {
//           name: validate.data.name,
//           email: validate.data.email,
//           phone: validate.data.phone,
//           password: hashedPassword,
//           role: validate.data.role,
//           deletedAt: null,
//         },
//       });
//       safeRevalidatePath(revalidateUrl);
//       return await handleResponse("User created successfully!", true);
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         name: validate.data.name,
//         email: validate.data.email,
//         password: hashedPassword,
//         role: validate.data.role,
//         phone: validate.data.phone,
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         role: true,
//       },
//     });
//     safeRevalidatePath(revalidateUrl);
//     return await handleResponse("User created successfully!", true, newUser);
//   } catch (error) {
//     const errorMessage = getErrorMessage(error);
//     console.error(`Error: ${errorMessage}`);
//     return await handleResponse(
//       `Failed to create user: ${errorMessage}`,
//       false,
//     );
//   }
// };
