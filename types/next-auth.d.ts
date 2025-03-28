import { SafeRoleType } from "@/features/role/types/role.types";
import type { SafeUserType } from "@/features/user/types/user.types";

export type ExtendedUser = DefaultSession["user"] & SafeUserType;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    id: number;
    roleId: number;
    role: SafeRoleType;
    phone: string;
    dob: string;
    avatar?: string | null | undefined;
    bio?: string | null | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: number;
    role?: SafeRoleType;
  }
}
