"use server";

import { prisma } from "@/lib/database";

export const getUserByEmail = async (email: string) =>
  prisma.user.findFirst({
    where: { email },
  });
