"use client";

import { Bell } from "@phosphor-icons/react";
import { IconWrapper } from "../icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Badge } from "../ui/badge";

interface ItemProps {}

const NotificationItem = () => {};

const AppNotification = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <IconWrapper icon={Bell} />
            <Badge variant="destructive">10</Badge>
          </NavigationMenuTrigger>

          <NavigationMenuContent className="flex flex-col items-center">
            <ul className="flex flex-col min-w-[200px] md:min-w-[300px]  gap-2 p-2 max-h-[300px] overflow-y-scroll"></ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNotification;
