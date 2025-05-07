"use client";

import Modal from "@/components/modal";
import DeleteDepartmentPrompt from "./delete-department-prompt";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeDepartmentType } from "../types/department.type";

const DeleteDepartmentModal = ({ data }: { data: SafeDepartmentType }) => {
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
      title="Hapus Departemen"
      description=""
      renderContent={<DeleteDepartmentPrompt data={data} />}
    />
  );
};

export default DeleteDepartmentModal;
