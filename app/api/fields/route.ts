import { upsertField } from "@/features/field/services/field.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  console.log({ body, id: parseInt(body?.id ?? undefined) });
  const result = await upsertField(
    body,
    body?.id ? parseInt(body.id) : undefined,
  );

  return NextResponse.json(result, { status: result.code });
}
