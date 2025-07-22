"use client";

import ControlledSlider from "@/components/controlled-slider";
import { Divider } from "@/components/divider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RoleFormSchema } from "../schemas/role.schema";
import { upsertRole } from "../services/role.service";
import { RoleFormType, SafeRoleType } from "../types/role.types";

interface RoleFormProps {
  data?: SafeRoleType;
}

const RoleForm = ({ data }: RoleFormProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<RoleFormType>({
    resolver: zodResolver(RoleFormSchema),
    mode: "all",
    defaultValues: {
      name: data?.name ?? "",
      level: data?.level ?? 0,
    },
  });

  const onSubmitHandler = async (values: RoleFormType) => {
    let id: string | number = "";

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const response = await upsertRole(values, data?.id);

      if (response.status === "success") {
        toast.success(response.message);

        if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data?.id
        ) {
          router.replace("/roles");
          router.refresh();
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error({ error });
      toast.error(
        "Terjadi kesalahan yang tidak diketahui. Mohon coba beberapa saat lagi.",
      );
    } finally {
      setTimeout(() => {
        if (id) toast.dismiss(id);
      }, 300);

      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center max-w-lg mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Peran / Jabatan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama peran atau jabatan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level Peran</FormLabel>
                <FormControl>
                  <ControlledSlider
                    min={1}
                    max={7}
                    step={1}
                    {...field}
                    label="Level"
                  />
                </FormControl>
                <FormDescription>
                  Semakin kecil angka semakin tinggi level jabatan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Divider />

          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 w-fit ml-auto"
          >
            {data ? "Simpan" : "Tambah"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RoleForm;
