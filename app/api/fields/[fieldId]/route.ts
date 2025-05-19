import { deleteFieldById } from "@/features/field/services/field.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ fieldId: string }> },
) {
  const pararams = await params;
  const id = pararams.fieldId;
  const result = await deleteFieldById(parseInt(id));

  return NextResponse.json(result, { status: result.code });
}
