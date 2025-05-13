import DeleteDivisionModal from "@/features/division/components/delete-division-modal";
import { getDivisionById } from "@/features/division/services/division.service";

type Props = {
  params: {
    divisionId: string;
  };
};

const DeleteDivisionIntercept = async ({ params }: Props) => {
  const data = await getDivisionById(Number(params?.divisionId));
  if (!data) return null;

  return <DeleteDivisionModal data={data} />;
};

export default DeleteDivisionIntercept;
