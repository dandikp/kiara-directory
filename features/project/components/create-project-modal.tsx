"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import ProjectForm from "./project-form";

const CreateProjectForm = () => {
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
      title="Tambah Proyek Baru"
      description="Simpan dan tambah proyek pekerjaan baru"
      renderContent={<ProjectForm />}
    />
  );
};

export default CreateProjectForm;
