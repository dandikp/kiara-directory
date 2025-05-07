"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import FieldForm from "./field-form";

const CreateFieldModal = () => {
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
      title="Tambah Bidang Kerja Baru"
      description="Simpan dan tambah bidang kerja baru ke dalam data unit kerja"
      renderContent={<FieldForm />}
    />
  );
};

export default CreateFieldModal;
