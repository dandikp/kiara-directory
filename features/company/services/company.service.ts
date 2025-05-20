import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { CompanyFormType, SafeCompanyType } from "../types/company.type";
import { CompanyFormSchema } from "../schemas/company.schema";
import AppResponse from "@/lib/response/AppResponse";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";

type GetCompaniesCountParams = {
  search?: string;
};

type GetCompaniesParams = GetCompaniesCountParams & {
  page: number;
  limit?: number;
};

export const getCompaniesCount = async (params: GetCompaniesCountParams) =>
  await prisma.company.count({
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

export const getCompanies = async (params: GetCompaniesParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.company.findMany({
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

export const getCompaniesTable = async (params: GetCompaniesParams) => {
  const limit = params.limit ?? 10;
  const [companies, count] = await Promise.all([
    getCompanies({ ...params, limit }),
    getCompaniesCount(params),
  ]);

  return DatatableResponse.response<SafeCompanyType>(
    companies,
    params.page,
    limit,
    count,
  );
};

export const upsertCompany = async (data: CompanyFormType, id?: number) => {
  const validation = CompanyFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  const existsData = await prisma.company.findFirst({
    where: {
      deletedAt: null,
      name: validation.data.name,
      id: {
        not: id,
      },
    },
  });

  if (existsData) {
    return AppResponse.error(
      `Nama ${validation.data.name} telah dipakai pada data perusahaan lain.`,
    ).toJSON();
  }

  if (id) {
    const updatedProject = await prisma.company.update({
      where: { id },
      data: { ...validation.data },
    });

    if (!updatedProject)
      return AppResponse.error("Gagal memperbarui data perusahaan");

    revalidatePath("/companies");

    return AppResponse.success<SafeCompanyType>(
      "Data berhasil diperbarui",
      updatedProject,
    ).toJSON();
  }

  const createdProject = await prisma.company.create({
    data: { ...validation.data },
  });
  if (!createdProject)
    return AppResponse.error("Gagal menambah data perusahaan");

  return AppResponse.success<SafeCompanyType>(
    "Data perusahaan baru berhasil ditambah",
    createdProject,
  ).toJSON();
};

export const getCompanyById = async (id: number) =>
  prisma.company.findFirst({ where: { id, deletedAt: null } });

export const deleteCompanyById = async (id: number) => {
  await prisma.company.update({
    where: { id },
    data: { deletedAt: formatISO(new Date()) },
  });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
