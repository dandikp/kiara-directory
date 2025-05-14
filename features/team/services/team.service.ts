"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeTeamType, TeamFormType } from "../types/team.type";
import { TeamFormSchema } from "../schemas/team.schema";
import AppResponse from "@/lib/response/AppResponse";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";

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

export const upsertTeam = async (data: TeamFormType, id?: number) => {
  const validation = TeamFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  if (id) {
    const updatedField = await prisma.team.update({
      where: { id },
      data: { ...validation.data, updatedAt: formatISO(new Date()) },
    });

    if (!updatedField)
      return AppResponse.error("Gagal memperbarui data tim unit");

    revalidatePath("/teams");

    return AppResponse.success<SafeTeamType>(
      "Data berhasil diperbarui",
      updatedField,
    ).toJSON();
  }

  const createdField = await prisma.team.create({
    data: { ...validation.data },
  });
  if (!createdField) return AppResponse.error("Gagal menambah data tim unit");

  return AppResponse.success<SafeTeamType>(
    "Data tim unit baru berhasil ditambah",
    createdField,
  ).toJSON();
};

export const getTeamById = async (id: number) =>
  prisma.team.findFirst({ where: { id, deletedAt: null } });

export const deleteTeamById = async (id: number) => {
  await prisma.team.update({
    where: { id },
    data: { deletedAt: formatISO(new Date()) },
  });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
