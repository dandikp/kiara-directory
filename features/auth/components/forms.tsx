/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Envelope,
  Eye,
  EyeSlash,
  Lock,
} from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GUEST_PATHS } from "../config/routes.config";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
} from "../schemas/auth.schema";
import {
  createResetPasswordToken,
  setNewPasswordByToken,
} from "../services/auth.service";

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
            {isPending ? "..." : "Masuk"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = React.useCallback(
    async (values: z.infer<typeof ForgotPasswordSchema>) => {
      startTransition(async () => {
        const loaderId = toast.loading("Memproses permintaan...");
        const promise = await createResetPasswordToken(values);

        try {
          if (promise.code === 200 && promise.status === "success") {
            toast.success(promise.message);
            form.setValue("email", "");
          } else {
            throw new Error(promise.message);
          }
        } catch (error) {
          const err = error as Error;
          toast.error(
            err.message || "Terjadi Kesalahan, coba beberapa saat lagi!",
          );
        } finally {
          await new Promise((res) => setTimeout(res, 100));
          if (loaderId) toast.dismiss(loaderId);
        }
      });
    },
    [],
  );

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
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="cursor-pointer disabled:cursor-none"
          >
            {isPending ? "..." : "Reset Password"}
          </Button>
          <Link
            href="/auth/sign-in"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "bg-white text-neutral-800 text-sm -mt-2.5 ml-auto w-full hover:bg-neutral-50 hover:text-neutral-800 flex justify-center items-center",
            )}
          >
            <ArrowLeft />
            <span>Kembali ke Login</span>
          </Link>
        </form>
      </Form>
    </div>
  );
};

interface FormVisibility {
  password: boolean;
  passwordConfirmation: boolean;
}

const ResetPasswordForm = (token: string, userId: number) => {
  const [formVisibility, setFormVisibility] = React.useState<FormVisibility>({
    password: false,
    passwordConfirmation: false,
  });
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const toggleVisibility = (field: keyof FormVisibility) => {
    setFormVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: z.infer<typeof ResetPasswordSchema>) => {
      startTransition(async () => {
        const loaderId = toast.loading("Mengatur ulang password...");
        const promise = await setNewPasswordByToken(token, userId, values);

        try {
          if (promise.code === 200 && promise.status === "success") {
            toast.success(promise.message);
            form.setValue("email", "");
          } else {
            throw new Error(promise.message);
          }
        } catch (error) {
          const err = error as Error;
          toast.error(
            err.message || "Terjadi Kesalahan, coba beberapa saat lagi!",
          );
        } finally {
          await new Promise((res) => setTimeout(res, 100));
          if (loaderId) toast.dismiss(loaderId);
        }
      });
    },
    [token, userId],
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
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
                      type={formVisibility[field.name] ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 text-xl"
                      onClick={() => toggleVisibility(field.name)}
                      type="button"
                    >
                      {formVisibility[field.name] ? <EyeSlash /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
                      <Lock weight="bold" />
                    </span>
                    <Input
                      className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 pr-10 focus-visible:ring-0 focus-visible:ring-neutral-300"
                      placeholder="Ketik ulang kata sandi"
                      type={formVisibility[field.name] ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 text-xl"
                      onClick={() => toggleVisibility(field.name)}
                      type="button"
                    >
                      {formVisibility[field.name] ? <EyeSlash /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="cursor-pointer disabled:cursor-none"
          >
            {isPending ? "..." : "Atur Ulang"}
          </Button>
          <Link
            href="/auth/sign-in"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "bg-white text-neutral-800 text-sm -mt-2.5 ml-auto w-full hover:bg-neutral-50 hover:text-neutral-800 flex justify-center items-center",
            )}
          >
            <ArrowLeft />
            <span>Kembali ke Login</span>
          </Link>
        </form>
      </Form>
    </div>
  );
};

export { ForgotPasswordForm, ResetPasswordForm, SignInForm };
