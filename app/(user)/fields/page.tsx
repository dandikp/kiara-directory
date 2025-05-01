import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import FieldTable from "@/features/field/components/field-table";
import { getFieldsTable } from "@/features/field/services/field.service";
import { FieldPageSearchParams } from "@/features/field/types/field.type";

interface PageProps {
  searchParams: FieldPageSearchParams;
}

const FieldPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;
  const code = searchParams.code;
  const departmentId = searchParams.departmentId;

  const result = await getFieldsTable({
    page,
    limit: pageSize,
    search,
    code,
    departmentId,
  });

  return (
    <PageContainer>
      <PageTitle
        title="Divisi"
        subtitle="Menampilkan semua data divisi di perusahaan"
      />
      <FieldTable {...result} />
    </PageContainer>
  );
};

export default FieldPage;
