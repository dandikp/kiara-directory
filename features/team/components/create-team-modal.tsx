"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import TeamForm from "./team-form";

const CreateTeamModal = () => {
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
      title="Tambah Tim Unit Baru"
      description="Simpan dan tambah tim unit baru ke dalam data unit kerja"
      renderContent={<TeamForm />}
    />
  );
};

export default CreateTeamModal;
