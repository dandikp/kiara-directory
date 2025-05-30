import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AUTH_OPTIONS } from "@/features/auth/config/auth.config";
import ResetUserPasswordForm from "@/features/user/components/reset-password-form";
import { getUserById } from "@/features/user/services/user.service";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    userId: string;
  };
};

const ResetPasswordUserPage = async ({ params }: Props) => {
  const id = params.userId;
  const session = await getServerSession(AUTH_OPTIONS);
  const currentUserId = session?.user?.id;

  if (Number(id) === Number(currentUserId)) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <PageTitle
              title="Tidak Diizinkan"
              subtitle="Anda tidak dapat mengubah password sendiri melalui halaman ini."
            />
          </CardHeader>
        </Card>
      </PageContainer>
    );
  }

  const data = await getUserById(Number(id));

  if (!data) return null;
  const safeData = { ...data, dob: data?.dob ? data.dob.toISOString() : null };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Ubah Password"
            subtitle="Ubah dan simpan data password pengguna."
          />
        </CardHeader>
        <CardContent>
          <ResetUserPasswordForm data={safeData} userId={Number(id)} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ResetPasswordUserPage;
