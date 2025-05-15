import EditRoleModal from "@/features/role/components/edit-role-modal";
import { getRoleById } from "@/features/role/services/role.service";

type Props = {
  params: {
    roleId: string;
  };
};

const EditRoleIntercept = async ({ params }: Props) => {
  const data = await getRoleById(Number(params?.roleId));
  if (!data) return null;

  return <EditRoleModal data={data} />;
};

export default EditRoleIntercept;
