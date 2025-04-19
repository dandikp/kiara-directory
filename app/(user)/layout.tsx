import { AppSidebar } from "@/components/base/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const UserBaseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 space-y-6 h-full max-h-dvh overflow-y-auto">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserBaseLayout;
