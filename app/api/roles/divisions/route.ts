import { getDivisions } from "@/features/division/services/division.service";
import { SafeDivisionType } from "@/features/division/types/division.type";
import AppResponse from "@/lib/response/AppResponse";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");

  const divisions = await getDivisions({ page, limit });

  return NextResponse.json(
    AppResponse.success<SafeDivisionType[]>("Divisi ditemukan.", divisions),
  );
}
