import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FieldForm from "@/features/field/components/field-form";
import { getFieldById } from "@/features/field/services/field.service";

type Props = {
  params: {
    fieldId: string;
  };
};

const EditFieldPage = async ({ params }: Props) => {
  const data = await getFieldById(Number(params.fieldId));
  if (!data) return null;

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Bidang Kerja"
            subtitle="Ubah dan simpan data bidang kerja ke dalam data unit kerja."
          />
        </CardHeader>
        <CardContent>
          <FieldForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditFieldPage;
