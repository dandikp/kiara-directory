import { prisma } from "@/lib/database";
import AppResponse from "@/lib/response/AppResponse";
import DatatableResponse from "@/lib/response/DatatableResponse";
// import { revalidatePath } from "next/cache";
import { RoleFormSchema } from "../schemas/role.schema";
import { RoleFormType, SafeRoleType } from "../types/role.types";
import { revalidatePath } from "next/cache";

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

export const upsertRole = async (data: RoleFormType, id?: number) => {
  const validation = RoleFormSchema.safeParse(data);

  if (!validation.success) {
    const message = AppResponse.getErrorMessages(validation.error);
    return AppResponse.error(`Terjadi Kesalahan - ${message}`).toJSON();
  }

  if (id) {
    const updatedRole = await prisma.role.update({
      where: { id },
      data: { ...validation.data },
    });

    if (!updatedRole)
      return AppResponse.error("Gagal memperbarui data peran / jabatan");

    revalidatePath("/roles");

    return AppResponse.success<SafeRoleType>(
      "Data berhasil diperbarui",
      updatedRole,
    ).toJSON();
  }

  const createdRole = await prisma.role.create({
    data: { ...validation.data },
  });
  if (!createdRole)
    return AppResponse.error("Gagal menambah data peran / jabatan");

  return AppResponse.success<SafeRoleType>(
    "Data peran / jabatan baru berhasil ditambah",
    createdRole,
  ).toJSON();
};

export const getRoleById = async (id: number) =>
  prisma.role.findFirst({ where: { id } });

export const deleteFieldById = async (id: number) => {
  await prisma.field.delete({ where: { id } });

  return AppResponse.success(`Data berhasil dihapus`).toJSON();
};
