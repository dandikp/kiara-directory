import { getRoles } from "@/features/role/services/role.service";
import SelectRoleModal from "@/features/user/components/select-role-modal";
import { getUserById } from "@/features/user/services/user.service";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const EditUserRolesIntercept = async ({ params }: Props) => {
  const id = (await params).userId;
  const data = await getUserById(Number(id));
  if (!data) return null;
  const safeData = { ...data, dob: data?.dob ? data.dob.toISOString() : null };
  const roles = await getRoles({ page: 1, limit: 50 });

  return <SelectRoleModal data={safeData} roles={roles} />;
};

export default EditUserRolesIntercept;
