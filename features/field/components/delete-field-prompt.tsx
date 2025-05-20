"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { SafeFieldType } from "../types/field.type";

const DeleteFieldPrompt = ({ data }: { data: SafeFieldType }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(() => {
      const deletePromise = fetch(`/api/fields/${data.id}`, {
        method: "DELETE",
      }).then(async (res) => {
        const result = await res.json();

        if (!res.ok || result.code !== 200) {
          throw new Error(result.message || "Gagal menghapus data");
        }

        return result;
      });

      toast.promise(deletePromise, {
        loading: "Menghapus data...",
        success: (response) => {
          if (response.status === "success") {
            router.replace("/fields");
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
};

export default DeleteFieldPrompt;
