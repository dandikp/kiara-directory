import ResetPasswordUserModal from "@/features/user/components/reset-password-user-modal";
import { getUserById } from "@/features/user/services/user.service";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const ResetPasswordUserIntercept = async ({ params }: Props) => {
  const id = (await params).userId;
  const data = await getUserById(Number(id));
  if (!data) return null;
  const safeData = { ...data, dob: data?.dob ? data.dob.toISOString() : null };

  return <ResetPasswordUserModal data={safeData} />;
};

export default ResetPasswordUserIntercept;
