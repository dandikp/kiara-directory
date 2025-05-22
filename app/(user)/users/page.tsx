import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import UserTable from "@/features/user/components/user-table";
import { getUsersTable } from "@/features/user/services/user.service";
import { type UserPageSearchParams } from "@/features/user/types/user.types";

interface PageProps {
  searchParams: UserPageSearchParams;
}

const UserPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = parseInt(params.page as string) || 1;
  const pageSize = parseInt(params.pageSize as string) || 10;
  const search = params.search;
  const email = params.email;
  const phone = params.phone;

  const result = await getUsersTable({
    page,
    limit: pageSize,
    search,
    email,
    phone,
  });

  return (
    <PageContainer>
      <PageTitle title="Pengguna" subtitle="Menampilkan semua data pengguna" />
      <UserTable {...result} />
    </PageContainer>
  );
};

export default UserPage;
