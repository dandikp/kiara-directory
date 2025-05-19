"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeProjectType } from "../types/project.type";

const DeleteProjectModal = ({ data }: { data: SafeProjectType }) => {
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
      title="Hapus Proyek Kerja"
      description=""
      renderContent={<DeleteProjectModal data={data} />}
    />
  );
};

export default DeleteProjectModal;
