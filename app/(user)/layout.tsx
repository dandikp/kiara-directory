import AppHeader from "@/components/base/app-header";
import { AppSidebar } from "@/components/base/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const UserBaseLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <SidebarProvider>
    <AppSidebar />
    <main className="relative flex-1 space-y-6 h-full max-h-dvh overflow-y-auto">
      <AppHeader />
      <div className="relative flex-1 space-y-6 px-2 max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  </SidebarProvider>
);

export default UserBaseLayout;
