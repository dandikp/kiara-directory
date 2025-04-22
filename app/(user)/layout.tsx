import AppHeader from "@/components/base/app-header";
import { AppSidebar } from "@/components/base/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";

const UserBaseLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();

  console.log({ session });
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 space-y-6 h-full max-h-dvh overflow-y-auto">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserBaseLayout;
