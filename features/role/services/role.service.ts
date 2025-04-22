import { prisma } from "@/lib/database";

type GetRoleScopeParams = {
  userRoleId?: number;
  departmentId?: number;
  fieldId?: number;
  divisionId?: number;
};

export const getRoleScope = async (params: GetRoleScopeParams) =>
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
