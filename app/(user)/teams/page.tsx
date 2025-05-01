import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import TeamTable from "@/features/team/components/team-table";
import { getTeamsTable } from "@/features/team/services/team.service";
import { TeamPageSearchParams } from "@/features/team/types/team.type";

interface PageProps {
  searchParams: TeamPageSearchParams;
}

const TeamPage = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;
  const search = searchParams.search;

  const result = await getTeamsTable({
    page,
    limit: pageSize,
    search,
  });

  return (
    <PageContainer>
      <PageTitle
        title="Tim"
        subtitle="Menampilkan semua data tim unit di perusahaan"
      />
      <TeamTable {...result} />
    </PageContainer>
  );
};

export default TeamPage;
