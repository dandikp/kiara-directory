"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  CaretUpDown,
  Check,
  DotsThreeOutlineVertical,
  GearSix,
  IdentificationBadge,
  SignOut,
  Smiley,
  Star,
  User,
} from "@phosphor-icons/react";
import useAccount from "../hooks/use-account";
import React from "react";
import Link from "next/link";

const AccountDropdown = () => {
  const { session, purgeSession } = useAccount();
  const sessionUser = session?.user || { name: "", email: "" };

  React.useEffect(() => {
    console.log({ session });
  }, [session]);

  const signOutHandler = () => {
    purgeSession();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-12 text-left px-2 group-data-[collapsible=icon]:p-0 cursor-pointer overflow-hidden"
        >
          <div className="w-full flex flex-nowrap gap-1 items-center">
            <div className="rounded-sm bg-amber-600 flex justify-center items-center text-3xl [&>svg]:!w-5 [&>svg]:!h-5 aspect-square size-8 group-data-[collapsible=icon]:ml-0.5">
              <DotsThreeOutlineVertical />
            </div>
            <div className="grid grid-rows-2 flex-1 px-2 items-center">
              <span className="truncate font-semibold">
                {sessionUser?.name}
              </span>
              <span className="truncate text-xs leading-4 text-muted-foreground">
                {sessionUser?.email}
              </span>
            </div>
            <DotsThreeOutlineVertical />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[16rem]" side="bottom">
        <div className="w-full flex flex-nowrap gap-1 items-center px-2 py-1.5">
          <div className="rounded-sm bg-amber-600 flex justify-center items-center text-3xl [&>svg]:!w-5 [&>svg]:!h-5 aspect-square size-8">
            <DotsThreeOutlineVertical />
          </div>
          <div className="grid grid-rows-2 flex-1 px-2 items-center">
            <span className="truncate text-xs font-semibold">
              {sessionUser?.name}
            </span>
            <span className="truncate text-xs leading-4 text-muted-foreground">
              {sessionUser?.email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="w-full flex flex-nowrap gap-2 items-center"
            href="/"
            title="Profile Saya"
          >
            <User />
            Profil Saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full flex flex-nowrap gap-2 items-center"
            href="/"
            title="Profile Saya"
          >
            <Bell />
            Notifikasi
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full flex flex-nowrap gap-2 items-center"
            href="/"
            title="Profile Saya"
          >
            <GearSix />
            Pengaturan
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div
            onClick={signOutHandler}
            className="w-full flex flex-nowrap gap-2 items-center text-red-600 text-left p-0"
          >
            <SignOut className="text-red-600" />
            Keluar
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RoleDropdown = () => {
  const { session } = useAccount();
  const sessionUser = session?.user || { currentRole: {} };
  const currentRole = sessionUser?.currentRole;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-12 text-left px-2 group-data-[collapsible=icon]:p-0 cursor-pointer overflow-hidden"
        >
          <div className="w-full flex flex-nowrap gap-1 items-center">
            <span className="rounded-sm bg-sky-950 flex justify-center items-center text-white [&>svg]:!w-6 [&>svg]:!h-6 aspect-square size-8 group-data-[collapsible=icon]:ml-0.5">
              <IdentificationBadge />
            </span>
            <div className="grid grid-rows-2 flex-1 px-2 items-center">
              <span className="truncate font-semibold">
                {currentRole?.name}
              </span>
              <span className="truncate text-xs leading-4 text-muted-foreground">
                Keuangan
              </span>
            </div>
            <CaretUpDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[16rem]" side="bottom">
        <DropdownMenuLabel className="px-2 py-1.5 font-semibold text-xs text-muted-foreground">
          Peran / Jabatan
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="w-full flex flex-nowrap gap-2 items-center">
            <div className="flex size-6 items-center justify-center rounded-sm border ">
              <Star weight="fill" className="text-amber-300" />
            </div>
            Direktur Utama
            <span className="ml-auto text-green-700">
              <Check weight="bold" className="text-green-900" />
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full flex flex-nowrap gap-2 items-center">
            <div className="flex size-6 items-center justify-center rounded-sm border ">
              <Smiley weight="regular" />
            </div>
            Manager
            <span className="text-xs text-muted-foreground">Keuangan</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountDropdown, RoleDropdown };
