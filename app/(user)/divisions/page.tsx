import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import DivisionTable from "@/features/division/components/division-table";
import { getDivisionsTable } from "@/features/division/services/division.service";
import { DivisionPageSearchParams } from "@/features/division/types/division.type";

interface PageProps {
  searchParams: DivisionPageSearchParams;
}

const DivisionPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;
  const code = searchParams.code;
  const fieldId = searchParams.fieldId;
  const departmentId = searchParams.departmentId;

  const result = await getDivisionsTable({
    page,
    limit: pageSize,
    search,
    code,
    fieldId,
    departmentId,
  });

  return (
    <PageContainer>
      <PageTitle
        title="Divisi"
        subtitle="Menampilkan semua data divisi di perusahaan"
      />
      <DivisionTable {...result} />
    </PageContainer>
  );
};

export default DivisionPage;
