import EditFieldModal from "@/features/field/components/edit-field-modal";
import { getFieldById } from "@/features/field/services/field.service";

type Props = {
  params: {
    fieldId: string;
  };
};

const EditFieldIntercept = async ({ params }: Props) => {
  const data = await getFieldById(Number(params?.fieldId));
  if (!data) return null;

  return <EditFieldModal data={data} />;
};

export default EditFieldIntercept;
