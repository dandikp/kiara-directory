"use server";

import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { DivisionFormType, SafeDivisionType } from "../types/division.type";
import { DivisionFormSchema } from "../schemas/division.schema";
import AppResponse from "@/lib/response/AppResponse";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";

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

export const upsertDivision = async (data: DivisionFormType, id?: number) => {
  const validation = DivisionFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  const existsData = await prisma.division.findFirst({
    where: {
      code: validation.data?.code,
      id: {
        not: id,
      },
      deletedAt: null,
    },
  });

  if (existsData) {
    return AppResponse.error(
      `Kode ${validation.data?.code} telah dipakai pada divisi lain.`,
    ).toJSON();
  }

  if (id) {
    const updatedDivision = await prisma.division.update({
      where: { id },
      data: { ...validation.data },
    });

    if (!updatedDivision)
      return AppResponse.error("Gagal memperbarui data divisi");

    revalidatePath("/divisions");

    return AppResponse.success<SafeDivisionType>(
      "Data berhasil diperbarui",
      updatedDivision,
    ).toJSON();
  }

  const createdField = await prisma.field.create({
    data: { ...validation.data },
  });
  if (!createdField) return AppResponse.error("Gagal menambah data divisi");

  return AppResponse.success<SafeDivisionType>(
    "Data divisi baru berhasil ditambah",
    createdField,
  ).toJSON();
};

export const getDivisionById = async (id: number) =>
  prisma.division.findFirst({ where: { id, deletedAt: null } });

export const deleteDivisionById = async (id: number) => {
  await prisma.division.update({
    where: { id },
    data: { deletedAt: formatISO(new Date()) },
  });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
