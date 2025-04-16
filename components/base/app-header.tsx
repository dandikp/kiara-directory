import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const AppHeader = () => {
  return (
    <nav className="sticky top-0 z-50 border-b w-full h-16 flex bg-transparent backdrop-blur">
      <div className="w-full h-full border-b block border-white/10">
        <nav className="flex flex-1 w-full items-center justify-between h-full px-4">
          <div className="inline-flex items-center justify-start">
            <SidebarTrigger />
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
