"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { SafeDivisionType } from "../types/division.type";
import DivisionForm from "./division-form";

const EditDivisionModal = ({ data }: { data: SafeDivisionType }) => {
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
      title="Edit Divisi"
      description="Ubah dan simpan data divisi ke dalam data unit kerja"
      renderContent={<DivisionForm data={data} />}
    />
  );
};

export default EditDivisionModal;
