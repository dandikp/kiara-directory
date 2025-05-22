"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SafeUserType } from "../types/user.types";
import { UpdateUserForm } from "./user-form";

const EditUserModal = ({ data }: { data: SafeUserType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const closeModalHandler = () => {
    setOpen(false);
    router.back();
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Modal
      open={open}
      handleClose={closeModalHandler}
      title="Edit Pengguna"
      description="Ubah dan simpan data pengguna"
      renderContent={<UpdateUserForm data={data} userId={data.id} />}
    />
  );
};

export default EditUserModal;
