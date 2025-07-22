"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SafeUserType } from "../types/user.types";
import ResetUserPasswordForm from "./reset-password-form";

const ModalContent = ({
  data,
  userId,
}: {
  data: SafeUserType;
  userId: number;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <ResetUserPasswordForm userId={userId} data={data} />
    </div>
  );
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
      title="Ubah Password"
      description="Ubah dan simpan data password pengguna."
      renderContent={<ModalContent data={data} userId={data.id} />}
    />
  );
};

export default ResetPasswordUserModal;
