import { ForgotPasswordForm } from "@/features/auth/components/forms";
import { LockKey } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col items-center gap-2">
        <span className="w-12 h-12 rounded-lg bg-neutral-400 text-neutral-800 shadow-medium text-2xl flex justify-center items-center">
          <LockKey weight="bold" />
        </span>
        <h1 className="text-center text-2xl leading-7 font-bold">
          Lupa Password
        </h1>
        <p className="text-center text-sm leading-5 text-neutral-800">
          Atur ulang kata sandi akun Kiara Directory untuk mendapatkan kembali
          akses ke dashboard.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
