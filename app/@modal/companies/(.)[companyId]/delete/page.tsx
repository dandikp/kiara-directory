import DeleteCompanyModal from "@/features/company/component/delete-company-modal";
import { getCompanyById } from "@/features/company/services/company.service";

type Props = {
  params: Promise<{ companyId: string }>;
};

const DeleteCompanyIntercept = async ({ params }: Props) => {
  const id = (await params).companyId;
  const data = await getCompanyById(Number(id));
  if (!data) return null;

  return <DeleteCompanyModal data={data} />;
};

export default DeleteCompanyIntercept;
