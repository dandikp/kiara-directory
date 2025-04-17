/* eslint-disable @typescript-eslint/no-unused-vars */
import { isActivePath } from "@/lib/sidebar";
import { removeTrailingSlash } from "@/lib/string";
import type { Icon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarMenu } from "../ui/sidebar";
interface MenuItem {
  title: string;
  path: string;
  icon: Icon;
  children?: Array<Pick<MenuItem, "title" | "path">>;
}

type AppSidebarProps = {
  items: MenuItem[];
};

export function AppSidebar({ items }: Readonly<AppSidebarProps>) {
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
      <SidebarContent className="overflow-x-hidden">
        <SidebarMenu className="gap-0"></SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
