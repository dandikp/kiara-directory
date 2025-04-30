import { prisma } from "@/lib/database";
import DatatableResponse from "@/lib/response/DatatableResponse";
import { SafeRoleType } from "../types/role.types";

type GetRoleScopesParams = {
  userRoleId?: number;
  departmentId?: number;
  fieldId?: number;
  divisionId?: number;
};

type GetRolesCountParams = {
  search?: string;
  level?: number;
};

type GetRolesParams = GetRolesCountParams & {
  page: number;
  limit?: number;
};

export const getRoleScope = async (params: GetRoleScopesParams) =>
  await prisma.roleScope.findFirst({
    where: {
      ...(params.userRoleId !== undefined && { userRoleId: params.userRoleId }),
      ...(params.departmentId !== undefined && {
        departmentId: params.departmentId,
      }),
      ...(params.fieldId !== undefined && { fieldId: params.fieldId }),
      ...(params.divisionId !== undefined && { divisionId: params.divisionId }),
    },
    include: {
      userRole: true,
      department: true,
      field: true,
      division: true,
    },
  });

export const getRolesCount = async (params: GetRolesCountParams) =>
  await prisma.role.count({
    where: {
      ...(params.search !== undefined && {
        name: {
          search: params.search
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .join(" | "),
        },
      }),
      ...(params.level !== undefined && { level: params.level }),
    },
  });

export const getRoles = async (params: GetRolesParams) => {
  const take = params.limit ?? 10;
  const skip = params.page ? (params.page - 1) * take : 0;

  return await prisma.role.findMany({
    skip,
    take,
    where: {
      ...(params.search !== undefined && {
        name: {
          search: params.search
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .join(" | "),
        },
      }),
      ...(params.level !== undefined && { level: params.level }),
    },
  });
};

export const getRolesTable = async (params: GetRolesParams) => {
  const limit = params.limit ?? 10;
  const [roles, count] = await Promise.all([
    getRoles({ ...params, limit }),
    getRolesCount(params),
  ]);

  return DatatableResponse.response<SafeRoleType>(
    roles,
    params.page,
    limit,
    count,
  );
};
