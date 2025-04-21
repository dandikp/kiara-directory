"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
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
} from "../ui/sidebar";
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
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible className="group/collapsible" key={item.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} title={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <Link href={item.url} title={item.title}>
                            a
                          </Link>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
        <AccountDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
