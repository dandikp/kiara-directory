import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeCompanyType } from "../types/company.type";

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

  return await prisma.user.findMany({
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
