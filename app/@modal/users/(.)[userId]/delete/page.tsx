import DeleteDepartmentModal from "@/features/department/components/delete-department-modal";
import { getDepartmentById } from "@/features/department/services/department.service";

type Props = {
  params: {
    departmentId: string;
  };
};

const DeleteDepartmentIntercept = async ({ params }: Props) => {
  const data = await getDepartmentById(Number(params?.departmentId));
  if (!data) return null;

  return <DeleteDepartmentModal data={data} />;
};

export default DeleteDepartmentIntercept;
