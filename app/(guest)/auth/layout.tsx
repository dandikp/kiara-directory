import { Card, CardContent } from "@/components/ui/card";
import "./auth.css";
import AuthHeader from "@/features/auth/components/auth-header";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-dvh bg-image relative flex flex-col">
      <AuthHeader className="hidden md:flex" />
      <Card className="w-full mx-auto rounded-none md:rounded-lg h-full backdrop-blur-xs bg-white/55 md:bg-white/35 shadow-[0_4px_30px_rgba(0,0,0,0.1)] md:border md:border-white">
        <CardContent className="w-full h-full flex flex-col gap-4">
          <div className="w-full flex justify-center md:hidden select-none relative">
            <Image
              className="h-10 w-auto"
              src="/images/placeholders/logoipsum/logoipsum-288.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full mt-12">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
