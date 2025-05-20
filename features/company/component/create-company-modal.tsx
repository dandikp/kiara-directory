"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import CompanyForm from "./company-form";

const CreateCompanyModal = () => {
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
      title="Tambah Perusahaan"
      description="Simpan dan tambah data perusahaan"
      renderContent={<CompanyForm />}
    />
  );
};

export default CreateCompanyModal;
