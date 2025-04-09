import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import {
  GUEST_PATHS,
  PUBLIC_PATHS,
} from "./features/auth/config/routes.config";
import { NextResponse } from "next/server";

function authMiddleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isGuest = GUEST_PATHS.routes?.includes(pathname);
  const isStatic =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".");

  console.log({ pathname });

  if (isPublic || isStatic) return NextResponse.next();

  if (!token)
    return isGuest
      ? NextResponse.next()
      : NextResponse.redirect(new URL(GUEST_PATHS.signIn));

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
