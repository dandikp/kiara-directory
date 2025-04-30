"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeProjectType } from "../types/project.type";

type GetProjectsCountParams = {
  search?: string;
};

type GetProjectsParams = GetProjectsCountParams & {
  page: number;
  limit?: number;
};

export const getProjectsCount = async (params: GetProjectsCountParams) => {
  return await prisma.project.count({
    where: {
      // deletedAt: null,
      ...(params.search !== undefined && {
        name: {
          search: params.search
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .join(" | "),
        },
      }),
    },
  });
};

export const getProjects = async (params: GetProjectsParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      companyId: true,
      code: true,
      year: true,
      company: { select: { id: true, name: true } },
    },
    skip,
    take,
    where: {
      // deletedAt: null,
      ...(params.search !== undefined && {
        name: {
          search: params.search
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .join(" | "),
        },
      }),
    },
  });
};

export const getProjectsTable = async (params: GetProjectsParams) => {
  const limit = params.limit ?? 10;
  const [projects, count] = await Promise.all([
    getProjects({ ...params, limit }),
    getProjectsCount(params),
  ]);

  return DatatableResponse.response<SafeProjectType>(
    projects,
    params.page,
    limit,
    count,
  );
};
