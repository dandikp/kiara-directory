import {
  createUser,
  getUsers,
  getUsersCount,
} from "@/features/user/services/user.service";
import type { SimpleUserType } from "@/features/user/types/user.types";
import AppResponse from "@/lib/response/AppResponse";
import { NextResponse } from "next/server";

type GetReturnType = {
  items: SimpleUserType[];
  total: number;
  page: number;
  perPage: number;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const [users, total] = await Promise.all([
    getUsers({ page, limit }),
    getUsersCount({}),
  ]);

  const safeUsers = users.map((user) => ({
    ...user,
    dob: user.dob ? user.dob.toISOString() : null,
  }));

  return NextResponse.json(
    AppResponse.success<GetReturnType>("Pengguna ditemukan.", {
      items: safeUsers,
      page,
      perPage: safeUsers.length,
      total,
    }),
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createUser(body);

  return NextResponse.json(result, { status: result.code });
}
