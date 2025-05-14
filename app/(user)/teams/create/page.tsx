import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TeamForm from "@/features/team/components/team-form";

const CreateTeamPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Tambah Tim Unit"
            subtitle="Tambah data tim unit baru ke dalam data unit kerja"
          />
        </CardHeader>
        <CardContent>
          <TeamForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateTeamPage;
