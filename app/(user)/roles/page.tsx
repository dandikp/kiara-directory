import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import RoleTable from "@/features/role/components/role-table";
import { getRolesTable } from "@/features/role/services/role.service";
import { type RolePageSearchParams } from "@/features/role/types/role.types";

interface PageProps {
  searchParams: RolePageSearchParams;
}

const RolePage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;
  const level = searchParams.level;

  const result = await getRolesTable({ page, limit: pageSize, search, level });

  return (
    <PageContainer>
      <PageTitle
        title="Peran / Jabatan"
        subtitle="Menampilkan semua data peran atau jabatan pengguna"
      />
      <RoleTable {...result} />
    </PageContainer>
  );
};

export default RolePage;
