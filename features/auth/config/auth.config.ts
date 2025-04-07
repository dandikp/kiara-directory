import { RoleType } from "@/features/role/types/role.types";
import { getUserByEmail } from "@/features/user/service/user.service";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

          if (match) return { ...user, password: undefined };

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

        token.sub = parseInt(user.id.toString(), 10);
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
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
      session.user.role = token.role as RoleType;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};
