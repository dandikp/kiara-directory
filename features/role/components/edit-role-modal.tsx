"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeRoleType } from "../types/role.types";
import RoleForm from "./role-form";

const EditRoleModal = ({ data }: { data: SafeRoleType }) => {
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
      title="Edit Peran / Jabatan"
      description="Ubah dan simpan data peran atau jabatan untuk pengguna"
      renderContent={<RoleForm data={data} />}
    />
  );
};

export default EditRoleModal;
