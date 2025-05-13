"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import {
  DepartmentFormType,
  SafeDepartmentType,
} from "../types/department.type";
import { DepartmentFormSchema } from "../schemas/department.schema";
import AppResponse from "@/lib/response/AppResponse";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";

type GetDepartmentCountParams = {
  search?: string;
  code?: string;
};

type GetDepartmentsParams = GetDepartmentCountParams & {
  page: number;
  limit?: number;
};

export const getDepartments = async (params: GetDepartmentsParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.department.findMany({
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
      ...(params.code !== undefined && { code: params.code }),
    },
  });
};

export const getDepartmentsCount = async (params: GetDepartmentCountParams) => {
  return await prisma.department.count({
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
      ...(params.code !== undefined && { code: params.code }),
    },
  });
};

export const getDepartmentsTable = async (params: GetDepartmentsParams) => {
  const limit = params.limit ?? 10;
  const [departments, count] = await Promise.all([
    getDepartments({ ...params, limit }),
    getDepartmentsCount(params),
  ]);

  return DatatableResponse.response<SafeDepartmentType>(
    departments,
    params.page,
    limit,
    count,
  );
};

export const upsertDepartment = async (
  data: DepartmentFormType,
  id?: number,
) => {
  const validation = DepartmentFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  const existsData = await prisma.department.findFirst({
    where: {
      code: validation.data?.code,
      id: {
        not: id,
      },
    },
  });

  if (existsData) {
    return AppResponse.error(
      `Kode ${validation.data?.code} telah dipakai pada department lain.`,
    ).toJSON();
  }

  if (id) {
    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: { ...validation.data },
    });

    if (!updatedDepartment)
      return AppResponse.error("Gagal memperbarui data departemen");

    revalidatePath("/departments");

    return AppResponse.success<SafeDepartmentType>(
      "Data berhasil diperbarui",
      updatedDepartment,
    ).toJSON();
  }

  const createdDepartment = await prisma.department.create({
    data: { ...validation.data },
  });
  if (!createdDepartment)
    return AppResponse.error("Gagal menambah data departemen");

  revalidatePath("/departments");

  return AppResponse.success<SafeDepartmentType>(
    "Data departemen baru berhasil ditambah",
    createdDepartment,
  ).toJSON();
};

export const getDepartmentById = async (id: number) =>
  prisma.department.findFirst({ where: { id, deletedAt: null } });

export const deleteDepartmentById = async (id: number) => {
  await prisma.department.update({
    where: { id },
    data: { deletedAt: formatISO(new Date()) },
  });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
