"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeTeamType } from "../types/team.type";
import DeleteTeamPrompt from "./delete-team-prompt";

const DeleteTeamModal = ({ data }: { data: SafeTeamType }) => {
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
      title="Hapus Tim Unit"
      description=""
      renderContent={<DeleteTeamPrompt data={data} />}
    />
  );
};

export default DeleteTeamModal;
