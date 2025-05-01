"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeTeamType } from "../types/team.type";

type GetTeamsCountParams = {
  search?: string;
};

type GetTeamsParams = GetTeamsCountParams & {
  page: number;
  limit?: number;
};

export const getTeams = async (params: GetTeamsParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.team.findMany({
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
    },
  });
};

export const getTeamsCount = async (params: GetTeamsCountParams) => {
  return await prisma.team.count({
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
    },
  });
};

export const getTeamsTable = async (params: GetTeamsParams) => {
  const limit = params.limit ?? 10;
  const [teams, count] = await Promise.all([
    getTeams({ ...params, limit }),
    getTeamsCount(params),
  ]);

  return DatatableResponse.response<SafeTeamType>(
    teams,
    params.page,
    limit,
    count,
  );
};
