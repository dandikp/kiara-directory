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
      <Card className="w-full h-full md:w-lg md:h-fit mx-auto rounded-none md:rounded-xl md:mt-48 backdrop-blur-xs bg-white/85 md:bg-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] md:border md:border-white lg:py-8">
        <CardContent className="w-full h-full flex flex-col gap-4 lg:px-6">
          <div className="w-full flex justify-center md:hidden select-none relative">
            <Image
              className="h-10 w-auto"
              src="/assets/images/placeholders/logoipsum/logoipsum-288.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full mt-16 md:mt-0">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
