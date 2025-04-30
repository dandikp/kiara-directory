import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import ProjectTable from "@/features/project/components/project-table";
import { getProjectsTable } from "@/features/project/services/project.service";
import { type RolePageSearchParams } from "@/features/role/types/role.types";

interface PageProps {
  searchParams: RolePageSearchParams;
}

const ProjectPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;

  const result = await getProjectsTable({ page, limit: pageSize, search });

  return (
    <PageContainer>
      <PageTitle
        title="Proyek Pekerjaan"
        subtitle="Menampilkan semua data proyek pekerjaan dari perusahaan"
      />
      <ProjectTable {...result} />
    </PageContainer>
  );
};

export default ProjectPage;
