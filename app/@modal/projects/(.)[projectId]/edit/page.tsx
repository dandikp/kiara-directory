import EditProjectModal from "@/features/project/components/edit-project-modal";
import { getProjectById } from "@/features/project/services/project.service";

type Props = {
  params: {
    projectId: string;
  };
};

const EditDepartmentIntercept = async ({ params }: Props) => {
  const data = await getProjectById(Number(params?.projectId));
  if (!data) return null;

  return <EditProjectModal data={data} />;
};

export default EditDepartmentIntercept;
