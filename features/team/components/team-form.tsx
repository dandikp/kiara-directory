"use client";

import { Divider } from "@/components/divider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { TeamFormSchema } from "../schemas/team.schema";
import { upsertTeam } from "../services/team.service";
import { SafeTeamType, TeamFormType } from "../types/team.type";

interface TeamFormProps {
  data?: SafeTeamType;
}

const TeamForm = ({ data }: TeamFormProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<TeamFormType>({
    resolver: zodResolver(TeamFormSchema),
    mode: "all",
    defaultValues: {
      name: data?.name ?? "",
    },
  });

  const onSubmitHandler = async (values: TeamFormType) => {
    let id: string | number = "";

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const response = await upsertTeam(values, data?.id);

      if (response.status === "success") {
        toast.success(response.message);

        if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data?.id
        ) {
          router.replace("/teams");
        }
      } else {
        toast.error(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
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
                <FormLabel>Nama Tim Unit</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama tim unit" {...field} />
                </FormControl>
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
            {data ? "Simpan & Edit Anggota" : "Tambah & Pilih Anggota"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TeamForm;
