import { getFields } from "@/features/field/services/field.service";
import { SafeFieldType } from "@/features/field/types/field.type";
import AppResponse from "@/lib/response/AppResponse";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");

  const fields = await getFields({ page, limit });

  return NextResponse.json(
    AppResponse.success<SafeFieldType[]>("Bidang kerja ditemukan.", fields),
  );
}
