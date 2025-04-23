import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import type { MenuGroupType, MenuItemType } from "@/types/menu.type";
import { DynamicIcon } from "./icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

type MenuItemParams = Omit<MenuItemType, "children"> & {
  items?: MenuItemType["children"];
};
type MenuGroupParams = Omit<MenuGroupType, "menu" | "id"> & {
  items: MenuGroupType["menu"];
};

const SingleMenuItem = ({ title, path, icon }: MenuItemParams) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link href={path} title={title}>
        <DynamicIcon icon={icon} />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const DropdownMenuItem = ({
  title,
  icon,
  items,
}: Omit<MenuItemParams, "path">) => (
  <Collapsible className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton asChild>
          <Link href="#" title={title}>
            <DynamicIcon icon={icon} />
            <span>{title}</span>
            <span className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90">
              <CaretRight />
            </span>
          </Link>
        </SidebarMenuButton>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarMenuSub>
          {items &&
            items.map((submenuItem) => (
              <SidebarMenuSubItem key={submenuItem.path}>
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "justify-start text-slate-700 flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground font-normal text-sm",
                  )}
                  href={submenuItem.path}
                  title={submenuItem.title}
                >
                  {submenuItem.title}
                </Link>
              </SidebarMenuSubItem>
            ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
);

export const MenuItem = ({ title, path, icon, items }: MenuItemParams) =>
  items ? (
    <DropdownMenuItem title={title} icon={icon} items={items} />
  ) : (
    <SingleMenuItem title={title} path={path} icon={icon} />
  );

export const MenuGroup = ({ name, items }: MenuGroupParams) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{name}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items &&
            items.map((item) => (
              <MenuItem
                key={item.path}
                title={item.title}
                path={item.path}
                icon={item.icon}
                items={item?.children}
              />
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
