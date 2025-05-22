"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { CreateUserForm } from "./user-form";

const CreateUserModal = () => {
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
      title="Tambah Pengguna Baru"
      description="Simpan dan tambah pengguna baru"
      renderContent={<CreateUserForm />}
    />
  );
};

export default CreateUserModal;
