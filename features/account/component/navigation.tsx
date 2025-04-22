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
import { ExtendedSafeUserRoleType } from "@/features/role/types/role.types";
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
import Link from "next/link";
import React from "react";
import useAccount from "../hooks/use-account";

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
            className="w-full flex flex-nowrap gap-2 items-center text-red-600 text-left p-0 cursor-pointer"
          >
            <SignOut className="text-red-600" />
            Keluar
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type RoleDropdownItemParams = {
  data: ExtendedSafeUserRoleType;
  currentRoleId: number;
};

const RoleDropdownItem = ({ data, currentRoleId }: RoleDropdownItemParams) => {
  const isActive = currentRoleId === data.roleId;
  const Icon = data.isMain ? Star : Smiley;

  return (
    <DropdownMenuItem>
      <div className="w-full flex flex-nowrap gap-2 items-center cursor-pointer">
        <div className="flex size-6 items-center justify-center rounded-sm border ">
          <Icon
            weight={data.isMain ? "fill" : "regular"}
            className={data.isMain ? "text-amber-300" : ""}
          />
        </div>
        {data.role.roleName}
        {data.role.scopeName && (
          <span className="text-xs text-muted-foreground">
            {data.role.scopeName}
          </span>
        )}
        {isActive && (
          <span className="ml-auto text-green-700">
            <Check weight="bold" className="text-green-900" />
          </span>
        )}
      </div>
    </DropdownMenuItem>
  );
};

const RoleDropdown = () => {
  const { session } = useAccount();
  const sessionUser = session?.user || { currentRole: {} };
  const userRoles = sessionUser?.userRoles;
  const currentRole = sessionUser?.currentRole;
  let scopeName = currentRole.scopeName;

  if (currentRole.level === 1) {
    scopeName = "General Administrator";
  } else if (currentRole.level === 2 || currentRole.level === 3) {
    scopeName = "Eksekutif";
  }

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
                {scopeName}
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
        {userRoles &&
          userRoles?.map((userRole: ExtendedSafeUserRoleType) => (
            <RoleDropdownItem
              key={userRole.id}
              data={userRole}
              currentRoleId={currentRole?.id}
            />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountDropdown, RoleDropdown };
