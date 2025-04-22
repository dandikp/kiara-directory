import {
  ExtendedSafeRoleType,
  SafeRoleScopeType,
  SafeUserRoleType,
} from "@/features/role/types/role.types";
import { getUserByEmail } from "@/features/user/service/user.service";
import { ScopeType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const getRoleScopeName = (
  type: ExtendedSafeRoleType["scopeType"],
  data: SafeRoleScopeType,
): string => {
  let result: string = "";

  switch (type) {
    case ScopeType.DEPARTMENT:
      result = data.department?.name || "Departemen Tidak Ditemukan";
      break;
    case ScopeType.FIELD:
      result = data.field?.name || "Bidang Tidak Ditemukan";
      break;
    case ScopeType.DIVISION:
      result = data.division?.name || "Divisi Tidak Ditemukan";
      break;
    default:
      break;
  }

  return result;
};

export const AUTH_OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Harap mengisi email dan password Anda");

        const { email, password } = credentials;

        try {
          const user = await getUserByEmail(email);

          if (!user || user.deletedAt) throw new Error("Akun tidak ditemukan!");

          const match = await bcrypt.compare(password, user.password);

          if (match) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: pword, ...safeUser } = user;
            const userRoles = user.userRoles.map((userRole) => {
              const extended: Pick<
                ExtendedSafeRoleType,
                "roleName" | "scopeName" | "scopeType"
              > = {
                roleName: userRole.role.name,
                scopeType: null,
                scopeName: "",
              };

              if (userRole.role.level > 3 && userRole?.roleScopes) {
                const roleScope = userRole.roleScopes.find(
                  (value, index) => index >= 0,
                );

                if (roleScope) {
                  extended.scopeType = roleScope.scopeType;
                  extended.scopeName = getRoleScopeName(
                    roleScope.scopeType,
                    roleScope,
                  );
                }
              }

              return {
                ...userRole,
                role: {
                  ...userRole.role,
                  ...extended,
                },
              };
            });

            const currentRole = userRoles.find((ur) => ur.isMain)?.role;

            return { ...safeUser, userRoles, currentRole: currentRole! };
          }

          throw new Error("Password tidak sesuai. Coba lagi");
        } catch (error) {
          if (error instanceof Error) throw error;
          throw new Error("Terjadi kesalahan. Coba lagi");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const { avatar } = user;
        const id = parseInt(user.id.toString(), 10);

        token.id = id;
        token.sub = id;
        token.email = user.email;
        token.name = user.name;
        token.currentRole = user.currentRole;
        token.userRoles = user.userRoles;
        token.phone = user.phone;
        token.avatar = avatar || "";
      }

      if (trigger === "update" && session) token = { ...token, ...session };

      return token;
    },
    async session({ session, token }) {
      session.user.avatar = token.avatar as string;
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.phone = token.phone as string;
      session.user.currentRole = token.currentRole as ExtendedSafeRoleType;
      session.user.userRoles = token.userRoles as SafeUserRoleType[];

      return session;
    },
  },
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};
