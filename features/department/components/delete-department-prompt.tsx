"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteDepartmentById } from "../services/department.service";
import { SafeDepartmentType } from "../types/department.type";

const DeleteDepartmentPrompt = ({ data }: { data: SafeDepartmentType }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(() => {
      const deletePromise = deleteDepartmentById(data.id);

      toast.promise(deletePromise, {
        loading: "Menghapus data...",
        success: (response) => {
          if (response.status === "success") {
            router.replace("/departments");
            return response.message;
          } else {
            throw new Error(
              response.message ||
                "Terjadi kesalahan yang tidak diketahui, coba beberapa saat lagi.",
            );
          }
        },
        error: (error) => {
          return error instanceof Error
            ? error.message
            : "Terjadi kesalahan yang tidak diketahui, coba beberapa saat lagi.";
        },
        onDismiss: () => {
          router.back();
        },
        onAutoClose: () => {
          router.back();
        },
        duration: 2000,
      });
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-600">
        Anda yakin ingin menghapus data ini: {data.name}?
      </h2>
      <p className=" text-slate-500 text-sm -mt-2">
        Data yang dihapus tidak akan dapat dikembalikan atau dipulihkan.
      </p>

      <div className="flex gap-4 justify-end ">
        <Button variant="outline" onClick={handleCancel} disabled={isPending}>
          Batal
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          Hapus
        </Button>
      </div>
    </div>
  );
  return <div>DeleteDepartmentPrompt</div>;
};

export default DeleteDepartmentPrompt;
