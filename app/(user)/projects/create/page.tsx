import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProjectForm from "@/features/project/components/project-form";

const CreateDepartmentPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Tambah Proyek Baru"
            subtitle="Simpan dan tambah proyek pekerjaan baru"
          />
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateDepartmentPage;
