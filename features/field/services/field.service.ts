import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { FieldFormType, SafeFieldType } from "../types/field.type";
import { FieldFormSchema } from "../schemas/field.schema";
import AppResponse from "@/lib/response/AppResponse";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";

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

export const upsertField = async (data: FieldFormType, id?: number) => {
  const validation = FieldFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  const existsData = await prisma.field.findFirst({
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
      `Kode ${validation.data?.code} telah dipakai pada bidang kerja lain.`,
    ).toJSON();
  }

  if (id) {
    const updatedField = await prisma.field.update({
      where: { id },
      data: { ...validation.data },
    });

    if (!updatedField)
      return AppResponse.error("Gagal memperbarui data bidang kerja");

    revalidatePath("/fields");

    return AppResponse.success<SafeFieldType>(
      "Data berhasil diperbarui",
      updatedField,
    ).toJSON();
  }

  const createdField = await prisma.field.create({
    data: { ...validation.data },
  });
  if (!createdField)
    return AppResponse.error("Gagal menambah data bidang kerja");

  return AppResponse.success<SafeFieldType>(
    "Data bidang kerja baru berhasil ditambah",
    createdField,
  ).toJSON();
};

export const getFieldById = async (id: number) =>
  prisma.field.findFirst({ where: { id, deletedAt: null } });

export const deleteFieldById = async (id: number) => {
  await prisma.field.update({
    where: { id },
    data: { deletedAt: formatISO(new Date()) },
  });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
