import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeader = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn("w-full flex-col py-2 px-4 md:px-6 lg:px-8", className)}
    >
      <nav className="w-full lg:max-w-7xl mx-auto md:max-w-5xl flex justify-center md:justify-start">
        <Link href="/" title="Homepage" className="inline-block">
          <Image
            className="h-10 w-auto"
            src="/images/placeholders/logoipsum/logoipsum-288.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
      </nav>
    </header>
  );
};

export default AuthHeader;
