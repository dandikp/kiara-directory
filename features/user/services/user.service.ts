"use server";

import { prisma } from "@/lib/database";
import AppResponse from "@/lib/response/AppResponse";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { CreateUserSchema, EditUserSchema } from "../schemas/user.schema";
import {
  CreateUserType,
  EditUserType,
  SafeUserWithNoRolesType,
  SimpleUserType,
} from "../types/user.types";

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

export const getUserById = async (id: number) =>
  prisma.user.findFirst({
    where: { id },
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
  page: number;
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

export const getUsersCount = async (params: GetUserCountParams) => {
  return await prisma.user.count({
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

export const getUsersTable = async (params: GetUsersParams) => {
  const limit = params.limit ?? 10;
  const [users, count] = await Promise.all([
    getUsers({ ...params, limit }),
    getUsersCount(params),
  ]);
  const safeUsers = users.map((user) => ({
    ...user,
    dob: user.dob ? user.dob.toISOString() : null,
  }));

  return DatatableResponse.response<SimpleUserType>(
    safeUsers,
    params.page,
    limit,
    count,
  );
};

export const createUser = async (data: CreateUserType) => {
  const validation = CreateUserSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`, 400).toJSON();
  }

  const existsData = await prisma.user.findFirst({
    where: {
      email: validation.data.email,
      phone: validation.data.phone,
      deletedAt: null,
    },
  });

  if (existsData) {
    const field =
      validation.data.email === existsData.email
        ? `Email '${validation.data.email}'`
        : `No. telepon '${validation.data.phone}'`;
    return AppResponse.error(
      `${field} telah dipakai oleh pengguna kerja lain.`,
      400,
    ).toJSON();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordConfirmation, ...values } = validation.data;

  const user = await prisma.user.create({
    data: values,
  });

  const safeUser = {
    ...user,
    dob: user.dob ? user.dob.toISOString() : null,
  };

  return AppResponse.success<SafeUserWithNoRolesType>(
    "Data pengguna baru berhasil ditambah",
    safeUser,
    201,
  ).toJSON();
};

export const updateUser = async (data: EditUserType, id: number) => {
  const validation = EditUserSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`, 400).toJSON();
  }

  const existsData = await prisma.user.findFirst({
    where: {
      id: { not: id },
      OR: [{ phone: validation.data.phone }, { email: validation.data.email }],
      deletedAt: null,
    },
  });

  if (existsData) {
    const field =
      validation.data.email === existsData.email
        ? `Email '${validation.data.email}'`
        : `No. telepon '${validation.data.phone}'`;
    return AppResponse.error(
      `${field} telah dipakai oleh pengguna lain.`,
      400,
    ).toJSON();
  }

  const user = await prisma.user.update({
    data: { ...validation.data },
    where: { id },
  });

  const safeUser = {
    ...user,
    dob: user.dob ? user.dob.toISOString() : null,
  };

  return AppResponse.success<SafeUserWithNoRolesType>(
    `Data pengguna '${validation.data.email}' berhasil diperbarui`,
    safeUser,
    201,
  ).toJSON();
};
