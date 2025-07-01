import { getUserRolesByUserId } from "@/features/user/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;
  const userRoles = await getUserRolesByUserId(Number(userId));
  const mapRoles = userRoles.map((userRole) => {
    const scopeType = userRole.roleScopes?.[0]?.scopeType ?? undefined;
    let scopeId = undefined;

    switch (scopeType) {
      case "DEPARTMENT":
        scopeId = userRole.roleScopes?.[0]?.departmentId ?? undefined;
        break;
      case "DIVISION":
        scopeId = userRole.roleScopes?.[0]?.divisionId ?? undefined;
        break;
      case "FIELD":
        scopeId = userRole.roleScopes?.[0]?.fieldId ?? undefined;
        break;
      default:
        break;
    }

    return {
      id: userRole.id,
      roleId: userRole.roleId,
      isMain: userRole.isMain,
      scopeType,
      scopeId,
    };
  });

  return NextResponse.json({ userId, mapRoles }, { status: 200 });
}
