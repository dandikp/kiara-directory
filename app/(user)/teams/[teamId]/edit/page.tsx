import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TeamForm from "@/features/team/components/team-form";
import { getTeamById } from "@/features/team/services/team.service";

type Props = {
  params: {
    teamId: string;
  };
};

const EditDepartmentPage = async ({ params }: Props) => {
  const data = await getTeamById(Number(params.teamId));
  if (!data) return null;

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Tim Unit"
            subtitle="Ubah dan simpan data tim unit ke dalam data unit kerja."
          />
        </CardHeader>
        <CardContent>
          <TeamForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditDepartmentPage;
