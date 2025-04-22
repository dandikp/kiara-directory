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
          roleScopes: {
            select: {
              id: true,
              userRoleId: true,
              scopeType: true,
              department: {
                select: { name: true },
              },
              field: {
                select: { name: true },
              },
              division: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });
