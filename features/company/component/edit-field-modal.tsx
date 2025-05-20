"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeCompanyType } from "../types/company.type";
import CompanyForm from "./company-form";

const EditCompanyModal = ({ data }: { data: SafeCompanyType }) => {
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
      title="Edit Perusahaan"
      description="Ubah dan simpan data perusahaan"
      renderContent={<CompanyForm data={data} />}
    />
  );
};

export default EditCompanyModal;
