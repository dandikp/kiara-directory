import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { GUEST_PATHS } from "./features/auth/config/routes.config";
import { NextResponse } from "next/server";

function authMiddleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;
  const isGuest = GUEST_PATHS.routes?.includes(pathname);

  if (!token)
    return isGuest
      ? NextResponse.next()
      : NextResponse.redirect(new URL(GUEST_PATHS.signIn));

  return NextResponse.next();
}

export const config = {
  matcher: [],
};

export default withAuth(authMiddleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const isGuest = GUEST_PATHS.routes?.includes(req.nextUrl.pathname);
      if (isGuest) return true;

      return !!token;
    },
  },
});
