"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import RoleForm from "./role-form";

const CreateRoleModal = () => {
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
      title="Tambah Peran / Jabatan"
      description="Simpan dan tambah peran atau jabatan untuk pengguna"
      renderContent={<RoleForm />}
    />
  );
};

export default CreateRoleModal;
