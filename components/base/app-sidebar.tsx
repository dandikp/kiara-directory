/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  AccountDropdown,
  RoleDropdown,
} from "@/features/account/component/navigation";
import { isActivePath } from "@/lib/sidebar";
import { removeTrailingSlash } from "@/lib/string";
import {
  Calendar,
  EnvelopeSimple,
  Gear,
  House,
  MagnifyingGlass,
  type Icon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { MenuGroup } from "../menu";
import { ADMIN_MENU_GROUP } from "@/lib/config/config.menu";
interface MenuItem {
  title: string;
  path: string;
  icon: Icon;
  children?: Array<Pick<MenuItem, "title" | "path">>;
}

type AppSidebarProps = {
  items: MenuItem[];
};

const items = [
  {
    title: "Home",
    url: "#",
    icon: House,
  },
  {
    title: "Inbox",
    url: "#",
    icon: EnvelopeSimple,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: MagnifyingGlass,
  },
  {
    title: "Settings",
    url: "#",
    icon: Gear,
  },
];

export const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar, state, open } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export function AppSidebar() {
  const currentPath = usePathname();
  const checkActiveMenu = (item: MenuItem) => {
    if (currentPath === removeTrailingSlash(item.path)) return true;
    if (item.children)
      return item.children.some((child) =>
        isActivePath(child.path, currentPath),
      );
    return false;
  };

  const checkActiveSubmenu = (path: string) => isActivePath(path, currentPath);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
        <RoleDropdown />
      </SidebarHeader>
      <SidebarContent>
        {ADMIN_MENU_GROUP.map((item) => (
          <MenuGroup key={item.id} name={item.name} items={item.menu} />
        ))}

        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem />
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
        <AccountDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
