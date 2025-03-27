import { SignInForm } from "@/features/auth/components/forms";
import { SignIn } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Masuk - eFin PT Kinarya Alam Raya",
  description:
    "Masuk ke dashboard e-Fin PT Kinarya Alam Raya untuk mengelola dan memantau informasi keuangan perusahaan secara efisien dan aman.",
};

export default function SignInPage() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col items-center gap-2">
        <span className="w-12 h-12 rounded-lg bg-neutral-400 text-neutral-800 shadow-medium text-2xl flex justify-center items-center">
          <SignIn weight="bold" />
        </span>
        <h1 className="text-center text-2xl leading-7 font-bold">
          Masuk pakai email
        </h1>
        <p className="text-center text-sm leading-5 text-neutral-800">
          Masuk ke dashboard eFin Kinarya Alam Raya untuk mengelola rancangan
          anggaran, pengajuan dana, dll.
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
