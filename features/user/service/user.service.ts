"use server";

import { prisma } from "@/lib/database";

export const getUserByEmail = async (email: string) =>
  prisma.user.findFirst({
    where: { email },
    include: {
      userRoles: {
        select: {
          id: true,
          userId: true,
          roleId: true,
          isMain: true,
          role: {
            select: {
              id: true,
              name: true,
              level: true,
            },
          },
        },
      },
    },
  });
