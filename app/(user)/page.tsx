"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

function DashboardPage() {
  const handler = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div>
      <Button onClick={() => handler()}>Logout</Button>
    </div>
  );
}

export default DashboardPage;
