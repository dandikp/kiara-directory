import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DivisionForm from "@/features/division/components/division-form";
import { getDivisionById } from "@/features/division/services/division.service";

type Props = {
  params: {
    divisionId: string;
  };
};

const EditDepartmentPage = async ({ params }: Props) => {
  const data = await getDivisionById(Number(params.divisionId));
  if (!data) return null;

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Divisi"
            subtitle="Ubah dan simpan data divisi ke dalam data unit kerja."
          />
        </CardHeader>
        <CardContent>
          <DivisionForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditDepartmentPage;
