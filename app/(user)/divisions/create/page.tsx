import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DivisionForm from "@/features/division/components/division-form";

const CreateDepartmentPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle title="Tambah Divisi" subtitle="Tambah data divisi baru" />
        </CardHeader>
        <CardContent>
          <DivisionForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateDepartmentPage;
