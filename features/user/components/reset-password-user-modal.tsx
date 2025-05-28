"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SafeUserType } from "../types/user.types";

const ModalContent = ({
  data,
  userId,
}: {
  data: SafeUserType;
  userId: number;
}) => {
  return <div></div>;
};

const ResetPasswordUserModal = ({ data }: { data: SafeUserType }) => {
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
      renderContent={<ModalContent data={data} userId={data.id} />}
    />
  );
};

export default ResetPasswordUserModal;
