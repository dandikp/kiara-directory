"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeProjectType } from "../types/project.type";
import ProjectForm from "./project-form";

const EditProjectModal = ({ data }: { data: SafeProjectType }) => {
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
      title="Edit Proyek Pekerjaan"
      description="Ubah dan simpan data proyek pekerjaan"
      renderContent={<ProjectForm data={data} />}
    />
  );
};

export default EditProjectModal;
