import { getUserRolesByUserId } from "@/features/user/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;
  const res = await getUserRolesByUserId(Number(userId));

  return NextResponse.json(res, { status: res.code });
}
