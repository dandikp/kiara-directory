import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UpdateUserForm } from "@/features/user/components/user-form";
import { getUserById } from "@/features/user/services/user.service";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const EditUserPage = async ({ params }: Props) => {
  const id = (await params).userId;
  const data = await getUserById(Number(id));

  if (!data) return null;
  const safeData = { ...data, dob: data?.dob ? data.dob.toISOString() : null };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Pengguna"
            subtitle="Ubah dan simpan data pengguna."
          />
        </CardHeader>
        <CardContent>
          <UpdateUserForm data={safeData} userId={Number(id)} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditUserPage;
