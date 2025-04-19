import {
  SafeRoleType,
  SafeUserRoleType,
} from "@/features/role/types/role.types";
import type { SafeUserType } from "@/features/user/types/user.types";

export type ExtendedUser = DefaultSession["user"] & SafeUserType;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    id: number;
    userRoles: SafeUserRoleType[];
    currentRole: SafeRoleType;
    phone: string;
    dob: Date | null;
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
