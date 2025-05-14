"use client";

import Modal from "@/components/modal";
import FieldForm from "@/features/field/components/field-form";
import { SafeFieldType } from "@/features/field/types/field.type";
import { useRouter } from "next/navigation";
import React from "react";

const EditFieldModal = ({ data }: { data: SafeFieldType }) => {
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
      title="Edit Bidang Kerja"
      description="Ubah dan simpan data bidang kerja ke dalam data unit kerja"
      renderContent={<FieldForm data={data} />}
    />
  );
};

export default EditFieldModal;
