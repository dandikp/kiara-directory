import { AppSidebar } from "@/components/base/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const UserBaseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar items={[]} />
      <main className="relative flex-1 space-y-6 h-full max-h-dvh overflow-y-auto"></main>
      {children}
    </SidebarProvider>
  );
};

export default UserBaseLayout;
