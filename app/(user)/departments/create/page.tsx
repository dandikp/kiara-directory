import { PageTitle } from "@/components/base/app-title";
import { PageContainer } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DepartmentForm from "@/features/department/components/department-form";
import React from "react";

const CreateDepartmentPage = () => {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <PageTitle
            title="Tambah Departemen"
            subtitle="Tambah data departemen baru"
          />
        </CardHeader>
        <CardContent>
          <DepartmentForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CreateDepartmentPage;
