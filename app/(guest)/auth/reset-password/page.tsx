import { buttonVariants } from "@/components/ui/button";
import { ResetPasswordForm } from "@/features/auth/components/forms";
import { getResetPasswordToken } from "@/features/auth/services/auth.service";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  LockKeyOpen,
  Timer,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password",
};
interface PageProps {
  searchParams: { token?: string };
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const token = searchParams.token;

  if (!token)
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-full flex flex-col items-center gap-2">
          <span className="w-12 h-12 rounded-lg bg-red-50 text-red-600 shadow-medium text-2xl flex justify-center items-center">
            <Warning weight="bold" />
          </span>
          <h1 className="text-center text-2xl leading-7 font-bold">
            Link Tidak Valid
          </h1>
          <p className="text-center text-sm leading-5 text-neutral-800">
            Token tidak ditemukan, mohon ikuti panduan dan buka link yang telah
            disematkan di dalam email.
          </p>
        </div>

        <Link
          href="/auth/sign-in"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-6 bg-white t text-neutral-800 text-sm ml-auto w-full hover:bg-neutral-50 hover:text-neutral-800 flex justify-center items-center",
          )}
        >
          <ArrowLeft />
          <span>Kembali ke Login</span>
        </Link>
      </div>
    );

  const response = await getResetPasswordToken(token);

  if (response.status !== "success" && !response.data)
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-full flex flex-col items-center gap-2">
          <span className="w-12 h-12 rounded-lg bg-red-50 text-red-600 shadow-medium text-2xl flex justify-center items-center">
            <Timer weight="bold" />
          </span>
          <h1 className="text-center text-2xl leading-7 font-bold">
            Token Tidak Valid
          </h1>
          <p className="text-center text-sm leading-5 text-neutral-800">
            {response.message}
          </p>
        </div>

        <Link
          href="/auth/sign-in"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-6 bg-white t text-neutral-800 text-sm ml-auto w-full hover:bg-neutral-50 hover:text-neutral-800 flex justify-center items-center",
          )}
        >
          <ArrowLeft />
          <span>Kembali ke Login</span>
        </Link>
      </div>
    );

  const userId = !Array.isArray(response.data)
    ? response.data?.userId
    : undefined;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col items-center gap-2">
        <span className="w-12 h-12 rounded-lg bg-neutral-400 text-neutral-800 shadow-medium text-2xl flex justify-center items-center">
          <LockKeyOpen weight="bold" />
        </span>
        <h1 className="text-center text-2xl leading-7 font-bold">
          Atur Ulang Password
        </h1>
        <p className="text-center text-sm leading-5 text-neutral-800">
          Atur ulang kata sandi akun Anda dan dapatkan akses kembali ke
          dashboard Kiara Directory.
        </p>
      </div>

      <ResetPasswordForm token={token} userId={userId} />
    </div>
  );
};

export default ResetPasswordPage;
