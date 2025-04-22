import Image from "next/image";
import { Separator } from "../ui/separator";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

const AppHeader = () => {
  return (
    <nav className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
      <div className="w-full h-full border-b block border-white/10">
        <nav className="flex flex-1 w-full items-center justify-between h-full px-4">
          <div className="flex items-center justify-start gap-2">
            <SidebarTrigger />
            <div className="h-8 w-fit">
              <Image
                src="/assets/images/placeholders/logoipsum/logoipsum-290.svg"
                className="h-full"
                alt="Logo"
                width={67}
                height={32}
              />
            </div>
          </div>
          <div className="flex flex-row w-fit justify-center items-center">
            {/* <NotificationButton /> */}
            <Separator orientation="vertical" className="mx-2 h-6" />
            {/* <UserSession /> */}
          </div>
        </nav>
      </div>
    </nav>
  );
};
export default AppHeader;
