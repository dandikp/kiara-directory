import EditDivisionModal from "@/features/division/components/edit-division-modal";
import { getDivisionById } from "@/features/division/services/division.service";

type Props = {
  params: {
    divisionId: string;
  };
};

const EditDivisionIntercept = async ({ params }: Props) => {
  const data = await getDivisionById(Number(params?.divisionId));
  if (!data) return null;

  return <EditDivisionModal data={data} />;
};

export default EditDivisionIntercept;
