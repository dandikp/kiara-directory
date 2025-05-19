"use server";

import { prisma } from "@/lib/database";
import AppResponse from "@/lib/response/AppResponse";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { revalidatePath } from "next/cache";
import { ProjectFormSchema } from "../schemas/project.schema";
import { ProjectFormType, SafeProjectType } from "../types/project.type";
import { formatISO } from "date-fns";

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
      workField: true,
    },
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

export const upsertProject = async (data: ProjectFormType, id?: number) => {
  const validation = ProjectFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  const existsData = await prisma.project.findFirst({
    where: {
      deletedAt: null,
      code: validation.data?.code,
      id: {
        not: id,
      },
    },
  });

  if (existsData) {
    return AppResponse.error(
      `Kode ${validation.data?.code} telah dipakai pada proyek pekerjaan lain.`,
    ).toJSON();
  }

  if (id) {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { ...validation.data },
    });

    if (!updatedProject)
      return AppResponse.error("Gagal memperbarui data proyek pekerjaan");

    revalidatePath("/projects");

    return AppResponse.success<SafeProjectType>(
      "Data berhasil diperbarui",
      updatedProject,
    ).toJSON();
  }

  const createdProject = await prisma.project.create({
    data: { ...validation.data },
  });
  if (!createdProject)
    return AppResponse.error("Gagal menambah data proyek pekerjaan");

  return AppResponse.success<SafeProjectType>(
    "Data proyek pekerjaan baru berhasil ditambah",
    createdProject,
  ).toJSON();
};

export const getProjectById = async (id: number) =>
  prisma.project.findFirst({ where: { id, deletedAt: null } });

export const deleteProjectById = async (id: number) => {
  await prisma.project.update({
    where: { id },
    data: { deletedAt: formatISO(new Date()) },
  });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
