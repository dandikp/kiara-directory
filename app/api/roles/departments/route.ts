import { getDepartments } from "@/features/department/services/department.service";
import { SafeDepartmentType } from "@/features/department/types/department.type";
import AppResponse from "@/lib/response/AppResponse";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");

  const departments = await getDepartments({ page, limit });

  return NextResponse.json(
    AppResponse.success<SafeDepartmentType[]>(
      "Departemen ditemukan.",
      departments,
    ),
  );
}
