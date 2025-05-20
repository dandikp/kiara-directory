import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CompanyForm from "@/features/company/component/company-form";
import { getCompanyById } from "@/features/company/services/company.service";

type Props = {
  params: Promise<{ companyId: string }>;
};

const EditCompanyPage = async ({ params }: Props) => {
  const id = (await params).companyId;
  const data = await getCompanyById(Number(id));
  if (!data) return null;

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Perusahaan"
            subtitle="Ubah dan simpan data perusahaan."
          />
        </CardHeader>
        <CardContent>
          <CompanyForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditCompanyPage;
