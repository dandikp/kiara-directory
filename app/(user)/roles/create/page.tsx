import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleForm from "@/features/role/components/role-form";

const CreateDepartmentPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Tambah Peran / Jabatan"
            subtitle="Tambah peran atau jabatan untuk pengguna."
          />
        </CardHeader>
        <CardContent>
          <RoleForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateDepartmentPage;
