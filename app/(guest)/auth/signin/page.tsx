import { SignInForm } from "@/features/auth/components/forms";

export const metadata = {
  title: "Masuk - eFin PT Kinarya Alam Raya",
  description:
    "Masuk ke dashboard e-Fin PT Kinarya Alam Raya untuk mengelola dan memantau informasi keuangan perusahaan secara efisien dan aman.",
};

export default function SignInPage() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <SignInForm />
    </div>
  );
}
