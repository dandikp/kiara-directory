"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { isActivePath } from "@/lib/sidebar";
import { removeTrailingSlash } from "@/lib/string";
import {
  Calendar,
  EnvelopeSimple,
  Gear,
  House,
  MagnifyingGlass,
  User,
  type Icon,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
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
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp } from "lucide-react";
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

// { items }: Readonly<AppSidebarProps>

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
      <SidebarHeader />
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
