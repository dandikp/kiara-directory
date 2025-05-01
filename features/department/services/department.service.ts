"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { DepartmentType } from "../types/department.type";

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
  const safeDepartments = departments.map((department) => ({
    ...department,
    createdAt: department.createdAt ? department.createdAt.toISOString() : null,
    updatedAt: department.updatedAt ? department.updatedAt.toISOString() : null,
    deletedAt: department.deletedAt ? department.deletedAt.toISOString() : null,
  }));

  return DatatableResponse.response<DepartmentType>(
    safeDepartments,
    params.page,
    limit,
    count,
  );
};
