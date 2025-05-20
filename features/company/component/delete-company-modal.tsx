"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeCompanyType } from "../types/company.type";
import DeleteCompanyPrompt from "./delete-company-prompt";

const DeleteCompanyModal = ({ data }: { data: SafeCompanyType }) => {
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
      title="Hapus Perusahaan"
      description=""
      renderContent={<DeleteCompanyPrompt data={data} />}
    />
  );
};

export default DeleteCompanyModal;
