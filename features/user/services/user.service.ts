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

type GetUserCountParams = {
  search?: string;
  dob?: Date;
  email?: string;
  phone?: string;
};

type GetUsersParams = GetUserCountParams & {
  page?: number;
  limit?: number;
};

export const getUsers = async (params: GetUsersParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.user.findMany({
    skip,
    take,
    where: {
      deletedAt: null,
      ...(params.search !== undefined && {
        name: {
          search: params.search
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .join(" | "),
        },
      }),
      ...(params.email !== undefined && { email: params.email }),
      ...(params.phone !== undefined && { phone: params.phone }),
      ...(params.dob !== undefined && { dob: params.dob }),
    },
  });
};

export const getUsersCount = async () => await prisma.user.count();
