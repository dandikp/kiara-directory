import { updateUser } from "@/features/user/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const id = (await params).userId;
  const body = await request.json();
  const result = await updateUser(body, Number(id));

  return NextResponse.json(result, { status: result.code });
}

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ fieldId: string }> },
// ) {
//   const id = (await params).fieldId;
//   const result = await deleteFieldById(parseInt(id));

//   return NextResponse.json(result, { status: result.code });
// }
