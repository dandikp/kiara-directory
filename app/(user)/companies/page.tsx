import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import CompanyTable from "@/features/company/component/company-table";
import { getCompaniesTable } from "@/features/company/services/company.service";
import { type UserPageSearchParams } from "@/features/user/types/user.types";

interface PageProps {
  searchParams: UserPageSearchParams;
}

const CompanyPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;

  const result = await getCompaniesTable({
    page,
    limit: pageSize,
    search,
  });

  return (
    <PageContainer>
      <PageTitle
        title="Perusahaan"
        subtitle="Menampilkan semua data perusahaan yang bertugas mengerjakan proyek"
      />
      <CompanyTable {...result} />
    </PageContainer>
  );
};

export default CompanyPage;
