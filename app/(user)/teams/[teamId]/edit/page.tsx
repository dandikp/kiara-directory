import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Departemen"
            subtitle="Ubah dan simpan data departemen ke dalam data unit kerja."
          />
        </CardHeader>
        <CardContent>
          <DepartmentForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditDepartmentPage;
