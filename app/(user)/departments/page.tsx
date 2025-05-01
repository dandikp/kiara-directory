import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import DepartmentTable from "@/features/department/components/department-table";
import { getDepartmentsTable } from "@/features/department/services/department.service";
import { DepartmentPageSearchParams } from "@/features/department/types/department.type";

interface PageProps {
  searchParams: DepartmentPageSearchParams;
}

const DepartementPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;
  const code = searchParams.code;

  const result = await getDepartmentsTable({
    page,
    limit: pageSize,
    search,
    code,
  });

  return (
    <PageContainer>
      <PageTitle
        title="Departemen"
        subtitle="Menampilkan semua data departemen di perusahaan"
      />
      <DepartmentTable {...result} />
    </PageContainer>
  );
};

export default DepartementPage;
