"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Envelope, Eye, EyeSlash, Lock } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const toggleVisibility = React.useCallback(() => {
    setIsPasswordVisible((visible) => !visible);
  }, []);

  const submit = React.useCallback(() => {}, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
          <Envelope weight="regular" />
        </span>
        <Input
          className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 focus-visible:ring-0 focus-visible:ring-neutral-300"
          placeholder="Email"
          type="email"
        />
      </div>
      <div className="w-full relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
          <Lock weight="bold" />
        </span>
        <Input
          className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 pr-10 focus-visible:ring-0 focus-visible:ring-neutral-300"
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
        />
        <Button
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 text-xl"
          onClick={toggleVisibility}
        >
          {isPasswordVisible ? <EyeSlash /> : <Eye />}
        </Button>
      </div>
      <Link
        href="/auth/forgot-password"
        className="text-neutral-700 text-sm -mt-2.5 ml-auto"
      >
        Lupa password?
      </Link>
      <Button>{isPending ? "Masuk" : "..."}</Button>
    </div>
  );
};

export { SignInForm };
