import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SelectUserRolesForm } from "@/features/user/components/user-form";
import { getUserById } from "@/features/user/services/user.service";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const EditRoleUserPage = async ({ params }: Props) => {
  const id = (await params).userId;
  const data = await getUserById(Number(id));

  if (!data) return null;
  const safeData = { ...data, dob: data?.dob ? data.dob.toISOString() : null };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Peran / Jabatan"
            subtitle={`Ubah dan simpan data peran / jabatan pengguna '${safeData.name} (${safeData.email})'.`}
          />
        </CardHeader>
        <CardContent>
          <SelectUserRolesForm data={safeData} userId={safeData.id} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditRoleUserPage;
