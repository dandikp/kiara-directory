import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleForm from "@/features/role/components/role-form";
import { getRoleById } from "@/features/role/services/role.service";

type Props = {
  params: {
    roleId: string;
  };
};

const EditRolePage = async ({ params }: Props) => {
  const data = await getRoleById(Number(params.roleId));
  if (!data) return null;

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Peran / Jabatan"
            subtitle="Ubah dan simpan peran atau jabatan untuk pengguna."
          />
        </CardHeader>
        <CardContent>
          <RoleForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditRolePage;
