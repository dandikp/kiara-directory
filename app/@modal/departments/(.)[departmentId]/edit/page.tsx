import EditDepartmentModal from "@/features/department/components/edit-department-modal";
import { getDepartmentById } from "@/features/department/services/department.service";

type Props = {
  params: {
    departmentId: string;
  };
};

const EditDepartmentIntercept = async ({ params }: Props) => {
  const data = await getDepartmentById(Number(params?.departmentId));
  if (!data) return null;

  return <EditDepartmentModal data={data} />;
};

export default EditDepartmentIntercept;
