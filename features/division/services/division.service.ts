"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeDivisionType } from "../types/division.type";

type GetDivisionsCountParams = {
  search?: string;
  code?: string;
  departmentId?: number;
  fieldId?: number | null;
};

type GetDivisionsParams = GetDivisionsCountParams & {
  page: number;
  limit?: number;
};

export const getDivisions = async (params: GetDivisionsParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.division.findMany({
    skip,
    take,
    select: {
      id: true,
      code: true,
      fieldId: true,
      name: true,
      departmentId: true,
      field: {
        select: { id: true, name: true, code: true, departmentId: true },
      },
      department: {
        select: { id: true, name: true, code: true },
      },
    },
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

export const getDivisionsCount = async (params: GetDivisionsCountParams) => {
  return await prisma.division.count({
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

export const getDivisionsTable = async (params: GetDivisionsParams) => {
  const limit = params.limit ?? 10;
  const [divisions, count] = await Promise.all([
    getDivisions({ ...params, limit }),
    getDivisionsCount(params),
  ]);

  return DatatableResponse.response<SafeDivisionType>(
    divisions,
    params.page,
    limit,
    count,
  );
};
