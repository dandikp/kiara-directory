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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldFormType, SafeFieldType } from "../types/field.type";
import { FieldFormSchema } from "../schemas/field.schema";
import { upsertField } from "../services/field.service";
import Combobox from "@/components/combobox";
import { getDepartments } from "@/features/department/services/department.service";

interface FieldFormProps {
  data?: SafeFieldType;
}

type ComboboxValueType = {
  value: string;
  label: string;
};

const FieldForm = ({ data }: FieldFormProps) => {
  const [departments, setDepartments] = useState<ComboboxValueType[]>([]);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<FieldFormType>({
    resolver: zodResolver(FieldFormSchema),
    mode: "all",
    defaultValues: {
      departmentId: data?.departmentId ?? 0,
      name: data?.name ?? "",
      code: data?.code ?? "",
    },
  });

  const onSubmitHandler = async (values: FieldFormType) => {
    let id: string | number = "";

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const response = await upsertField(values, data?.id);

      if (response.status === "success") {
        toast.success(response.message);

        if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data?.id
        ) {
          router.replace("/fields");
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

  const fetchDepartments = async () => {
    try {
      const result = await getDepartments({ page: 1, limit: 100 });
      if (result)
        setDepartments(
          result.map((department) => ({
            value: String(department.id),
            label: department.name,
          })),
        );
    } catch (error) {
      console.error("An error occured while executing fetchDepartments", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDepartments();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

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
                <FormLabel>Nama Bidang Kerja</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama bidang kerja" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Bidang Kerja</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan kode bidang kerja" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Departemen</FormLabel>
                <FormControl>
                  <Combobox
                    options={departments}
                    value={String(field.value)}
                    placeholder="Pilih departemen"
                    searchPlaceholder="Cari departemen..."
                    onChange={(value) => {
                      form.setValue("departmentId", Number(value));
                    }}
                  />
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
            {data ? "Simpan" : "Tambah"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FieldForm;
