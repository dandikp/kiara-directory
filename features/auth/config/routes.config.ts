type GuestPathType = {
  signIn: string;
  forgotPassword: string;
  resetPassword: string;
  routes?: string[];
};

type AuthedPaths = {
  dashboard: string;
  profile: string;
  routes?: string[];
};

const PUBLIC_PATHS: string[] = ["/image", "/favicon.ico", "/robots.txt"];

const GUEST_PATHS: GuestPathType = {
  signIn: "/auth/signin",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
};

const AUTHED_PATHS: AuthedPaths = {
  dashboard: "/",
  profile: "/profile/:path*",
};

GUEST_PATHS.routes = Object.values(GUEST_PATHS).filter(
  (value): value is string => typeof value === "string",
);

AUTHED_PATHS.routes = Object.values(AUTHED_PATHS).filter(
  (value): value is string => typeof value === "string",
);

export { GUEST_PATHS, PUBLIC_PATHS, AUTHED_PATHS };
