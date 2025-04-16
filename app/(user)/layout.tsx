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
      {children}
    </SidebarProvider>
  );
};

export default UserBaseLayout;
