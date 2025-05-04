"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import DepartmentForm from "./department-form";

const CreateDepartmentModal = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const closeModalHandler = () => {
    setOpen(false);
    router.back();
  };

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Modal
      open={open}
      handleClose={closeModalHandler}
      title="Tambah Departemen Baru"
      description="Simpan dan tambah departemen baru ke dalam data unit kerja"
      renderContent={<DepartmentForm />}
    />
  );
};

export default CreateDepartmentModal;
