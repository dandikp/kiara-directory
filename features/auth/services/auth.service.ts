"use server";

import { prisma } from "@/lib/database";
import AppResponse, { AppResponseJSON } from "@/lib/response/AppResponse";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ResetTokenSchema,
} from "../schemas/auth.schema";

export type CreateResetPasswordTokenReturn = {
  existed: boolean;
  createdAt: Date;
  expiredAt: Date | null;
  userId?: number;
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
    "Token ditemukan.",
    {
      existed: true,
      createdAt: resetToken.createdAt,
      expiredAt: resetToken.expiredAt,
      userId: resetToken.userId,
    },
  ).toJSON();
};

export const setNewPasswordByToken = async (
  token: string,
  userId: number,
  data: z.infer<typeof ResetPasswordSchema>,
): Promise<AppResponseJSON> => {
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

  if (!resetToken)
    return AppResponse.error(
      "Token tidak valid, sudah kedaluwarsa, atau telah digunakan sebelumnya.",
      404,
    ).toJSON();

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: bcrypt.hashSync(data.password, 10) },
      }),
      prisma.resetPassword.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return AppResponse.success(
      "Berhasil mengatur ulang kata sandi Anda. Silakan masuk menggunakan kata sandi yang baru.",
    ).toJSON(); // <- PENTING: return di sini
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return AppResponse.error(
        `Terjadi kesalahan: ${error.message}`,
        500,
      ).toJSON();
    }

    return AppResponse.error(
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan yang tidak diketahui. Coba beberapa saat lagi.",
      500,
    ).toJSON();
  }
};
