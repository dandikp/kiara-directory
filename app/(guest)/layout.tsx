import React from "react";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full block relative">{children}</div>;
}
