import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DepartmentForm from "@/features/department/components/department-form";
import { getDepartmentById } from "@/features/department/services/department.service";
import React from "react";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const EditUserPage = async ({ params }: Props) => {
  const id = (await params).userId;
  const data = await getDepartmentById(Number(id));

  if (!data) return null;

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Edit Pengguna"
            subtitle="Ubah dan simpan data pengguna."
          />
        </CardHeader>
        <CardContent>
          <DepartmentForm data={data} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditUserPage;
