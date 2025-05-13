"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeDivisionType } from "../types/division.type";
import DeleteFieldPrompt from "./delete-division-prompt";

const DeleteDivisionModal = ({ data }: { data: SafeDivisionType }) => {
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
      title="Hapus Divisi"
      description=""
      renderContent={<DeleteFieldPrompt data={data} />}
    />
  );
};

export default DeleteDivisionModal;
