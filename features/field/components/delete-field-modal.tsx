"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeFieldType } from "../types/field.type";
import DeleteFieldPrompt from "./delete-field-prompt";

const DeleteDepartmentModal = ({ data }: { data: SafeFieldType }) => {
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
      title="Hapus Bidang Kerja"
      description=""
      renderContent={<DeleteFieldPrompt data={data} />}
    />
  );
};

export default DeleteDepartmentModal;
