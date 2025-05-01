"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeFieldType } from "../types/field.type";

type GetFieldsCountParams = {
  search?: string;
  code?: string;
  departmentId?: number;
};

type GetFieldsParams = GetFieldsCountParams & {
  page: number;
  limit?: number;
};

export const getFields = async (params: GetFieldsParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.field.findMany({
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
      ...(params.departmentId !== undefined && {
        departmentId: params.departmentId,
      }),
    },
  });
};

export const getFieldsCount = async (params: GetFieldsCountParams) => {
  return await prisma.field.count({
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
      ...(params.departmentId !== undefined && {
        departmentId: params.departmentId,
      }),
    },
  });
};

export const getFieldsTable = async (params: GetFieldsParams) => {
  const limit = params.limit ?? 10;
  const [fields, count] = await Promise.all([
    getFields({ ...params, limit }),
    getFieldsCount(params),
  ]);
  return DatatableResponse.response<SafeFieldType>(
    fields,
    params.page,
    limit,
    count,
  );
};
