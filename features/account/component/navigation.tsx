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
  CaretUpDown,
  Check,
  CrownSimple,
  IdentificationBadge,
  Smiley,
  Star,
} from "@phosphor-icons/react";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full  h-12 flex">
          <div className="w-full flex flex-nowrap h-12 gap-2">
            <div className="w-8 h-8 rounded-sm bg-amber-600"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[16rem]" side="top">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RoleDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full h-12 text-left px-2">
          <div className="w-full flex flex-nowrap gap-1 items-center">
            <span className="w-9 h-9 rounded-sm bg-amber-600 flex justify-center items-center text-3xl [&>svg]:!w-5 [&>svg]:!h-5">
              <IdentificationBadge />
            </span>
            <div className="grid grid-rows-2 flex-1 px-2 items-center">
              <span className="truncate font-semibold">Direktur Utama</span>
              <span className="truncate text-xs leading-4">Keuangan</span>
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
