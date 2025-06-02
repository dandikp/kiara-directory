import Modal from "@/components/modal";
import { SafeRoleType } from "@/features/role/types/role.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SafeUserType } from "../types/user.types";
import { SelectUserRolesForm } from "./user-form";

const SelectRoleModal = ({
  data,
  roles,
}: {
  data: SafeUserType;
  roles: SafeRoleType[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const closeModalHandler = () => {
    setOpen(false);
    router.back();
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Modal
      open={open}
      handleClose={closeModalHandler}
      title="Edit Peran / Jabatan"
      description="Ubah dan simpan data peran / jabatan dari pengguna"
      renderContent={
        <SelectUserRolesForm data={data} userId={data.id} roles={roles} />
      }
    />
  );
};

export default SelectRoleModal;
