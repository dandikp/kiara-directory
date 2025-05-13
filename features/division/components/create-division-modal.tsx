"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import DivisionForm from "./division-form";

const CreateDivisionModal = () => {
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
      title="Tambah Divisi Baru"
      description="Simpan dan tambah divisi baru ke dalam data unit kerja"
      renderContent={<DivisionForm />}
    />
  );
};

export default CreateDivisionModal;
