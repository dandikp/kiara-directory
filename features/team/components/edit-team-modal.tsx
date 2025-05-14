"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeTeamType } from "../types/team.type";
import TeamForm from "./team-form";

const EditTeamModal = ({ data }: { data: SafeTeamType }) => {
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
      title="Edit Tim Unit"
      description="Ubah dan simpan data bidang tim unit ke dalam data unit kerja"
      renderContent={<TeamForm data={data} />}
    />
  );
};

export default EditTeamModal;
