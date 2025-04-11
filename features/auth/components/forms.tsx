/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Envelope, Eye, EyeSlash, Lock } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GUEST_PATHS } from "../config/routes.config";
import { ForgotPasswordSchema, SignInSchema } from "../schemas/auth.schema";

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const toggleVisibility = React.useCallback(() => {
    setIsPasswordVisible((visible) => !visible);
  }, []);

  const onSubmit = React.useCallback(
    async (values: z.infer<typeof SignInSchema>) => {
      startTransition(() => {
        const promise = signIn("credentials", {
          ...values,
          redirect: false,
        });

        toast.loading("Menghubungkan ke akun Anda...");

        promise
          .then((response) => {
            toast.dismiss();

            if (response?.ok) {
              toast.success("Berhasil masuk! Sedang mengalihkan...", {
                duration: 2000,
                onAutoClose: () => {
                  router.push(GUEST_PATHS.signIn);
                },
              });
            } else {
              throw new Error(
                response?.error ||
                  "Terjadi kesalah, mohon coba beberapa saat lagi!",
              );
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error?.message);
            console.error("Error during signing in: ", error);
          });
      });
    },
    [],
  );
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
                      <Envelope weight="regular" />
                    </span>
                    <Input
                      className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 focus-visible:ring-0 focus-visible:ring-neutral-300"
                      placeholder="email@anda.com"
                      type="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
                      <Lock weight="bold" />
                    </span>
                    <Input
                      className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 pr-10 focus-visible:ring-0 focus-visible:ring-neutral-300"
                      placeholder="Kata sandi"
                      type={isPasswordVisible ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 text-xl"
                      onClick={toggleVisibility}
                      type="button"
                    >
                      {isPasswordVisible ? <EyeSlash /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className="text-neutral-700 text-sm -mt-2.5 ml-auto"
          >
            Lupa password?
          </Link>
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="cursor-pointer disabled:cursor-none"
          >
            {isPending ? ".." : "Masuk"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const ForgotPasswordForm = () => {
  const isSubmitted = React.useState<boolean>(false);
  const onSubmit = React.useCallback(async () => {
    toast.loading("Memproses permintaan...");
    const promise = null;
  }, []);
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
                      <Envelope weight="regular" />
                    </span>
                    <Input
                      className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 focus-visible:ring-0 focus-visible:ring-neutral-300"
                      placeholder="email@anda.com"
                      type="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className="text-neutral-700 text-sm -mt-2.5 ml-auto"
          >
            Lupa password?
          </Link>
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="cursor-pointer disabled:cursor-none"
          >
            {isPending ? ".." : "Masuk"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const ResetPasswordForm = () => {};

export { SignInForm };
