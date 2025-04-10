import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import {
  GUEST_PATHS,
  PUBLIC_PATHS,
} from "./features/auth/config/routes.config";
import { NextResponse } from "next/server";
import { env } from "./lib/env";

function authMiddleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isGuestPath = GUEST_PATHS.routes?.includes(pathname);
  const isStaticPath =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".");

  console.log({ pathname, token });

  if (isPublicPath || isStaticPath) return NextResponse.next();

  if (!token)
    return isGuestPath
      ? NextResponse.next()
      : NextResponse.redirect(new URL(GUEST_PATHS.signIn));

  if (token && isGuestPath) return NextResponse.redirect(env.baseUrl);

  return NextResponse.next();
}

export default withAuth(authMiddleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const isGuest = GUEST_PATHS.routes?.includes(req.nextUrl.pathname);
      if (isGuest) return true;

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/", "/auth/:path*"],
};
