"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export const SessionHookProvider = ({
  children,
  ...props
}: SessionProviderProps) => {
  return <SessionProvider {...props}>{children}</SessionProvider>;
};
