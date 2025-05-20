import EditCompanyModal from "@/features/company/component/edit-field-modal";
import { getCompanyById } from "@/features/company/services/company.service";

type Props = {
  params: Promise<{ companyId: string }>;
};

const EditDepartmentIntercept = async ({ params }: Props) => {
  const id = (await params).companyId;
  const data = await getCompanyById(Number(id));
  if (!data) return null;

  return <EditCompanyModal data={data} />;
};

export default EditDepartmentIntercept;
