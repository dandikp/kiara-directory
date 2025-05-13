import DeleteFieldModal from "@/features/field/components/delete-field-modal";
import { getFieldById } from "@/features/field/services/field.service";

type Props = {
  params: {
    fieldId: string;
  };
};

const DeleteFieldIntercept = async ({ params }: Props) => {
  const data = await getFieldById(Number(params?.fieldId));
  if (!data) return null;

  return <DeleteFieldModal data={data} />;
};

export default DeleteFieldIntercept;
