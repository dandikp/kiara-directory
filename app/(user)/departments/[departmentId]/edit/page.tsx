import DepartmentForm from "@/features/department/components/department-form";
import { getDepartmentById } from "@/features/department/services/department.service";
import React from "react";

type Props = {
  params: {
    departmentId: string;
  };
};

const EditDepartmentPage = async ({ params }: Props) => {
  const data = await getDepartmentById(Number(params.departmentId));
  if (!data) return null;

  return <DepartmentForm data={data} />;
};

export default EditDepartmentPage;
