import { getRoles } from "@/features/role/services/role.service";
import { SafeRoleType } from "@/features/role/types/role.types";
import AppResponse from "@/lib/response/AppResponse";
import { StandardGetApiResponse } from "@/types/response.type";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");

  const roles = await getRoles({ page, limit });

  return NextResponse.json(
    AppResponse.success<StandardGetApiResponse<SafeRoleType>>(
      "Peran / jabatan ditemukan.",
      {
        items: roles,
        page,
        perPage: roles.length,
        total: roles.length,
      },
    ),
  );
}
