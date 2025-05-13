import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FieldForm from "@/features/field/components/field-form";

const CreateFieldPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Tambah Bidang Kerja"
            subtitle="Tambah data data bidang kerja baru"
          />
        </CardHeader>
        <CardContent>
          <FieldForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateFieldPage;
