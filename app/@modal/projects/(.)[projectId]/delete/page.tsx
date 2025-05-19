import DeleteProjectModal from "@/features/project/components/delete-project-modal";
import { getProjectById } from "@/features/project/services/project.service";

type Props = {
  params: {
    departmentId: string;
  };
};

const DeleteProjectIntercept = async ({ params }: Props) => {
  const data = await getProjectById(Number(params?.departmentId));
  if (!data) return null;

  return <DeleteProjectModal data={data} />;
};

export default DeleteProjectIntercept;
