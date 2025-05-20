import { deleteCompanyById } from "@/features/company/services/company.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> },
) {
  const pararams = await params;
  const id = pararams.companyId;
  const result = await deleteCompanyById(parseInt(id));

  return NextResponse.json(result, { status: result.code });
}
