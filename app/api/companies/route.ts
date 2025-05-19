import {
  getCompanies,
  getCompaniesCount,
} from "@/features/company/services/company.service";
import { SafeCompanyType } from "@/features/company/types/company.type";
import AppResponse from "@/lib/response/AppResponse";
import { StandardGetApiResponse } from "@/types/response.type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "100");

  const [companies, total] = await Promise.all([
    getCompanies({ page, limit }),
    getCompaniesCount({}),
  ]);

  return NextResponse.json(
    AppResponse.success<StandardGetApiResponse<SafeCompanyType>>(
      "Data perusahaan ditemukan.",
      {
        items: companies,
        page,
        perPage: companies.length,
        total,
      },
    ),
  );
}
