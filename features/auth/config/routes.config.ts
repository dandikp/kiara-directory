type GuestPathType = {
  signIn: string;
  forgotPassword: string;
  resetPassword: string;
  routes?: string[];
};

const GUEST_PATHS: GuestPathType = {
  signIn: "/auth/signin",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
};

GUEST_PATHS.routes = Object.values(GUEST_PATHS).filter(
  (value): value is string => typeof value === "string",
);

export { GUEST_PATHS };
