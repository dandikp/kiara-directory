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
import Combobox from "@/components/combobox";
import { getDepartments } from "@/features/department/services/department.service";
import { DivisionFormType, SafeDivisionType } from "../types/division.type";
import { DivisionFormSchema } from "../schemas/division.schema";
import { upsertDivision } from "../services/division.service";
import { getFields } from "@/features/field/services/field.service";

interface DivisionFormProps {
  data?: SafeDivisionType;
}

type ComboboxValueType = {
  value: string;
  label: string;
};

const DEFAULT_FIELD = {
  value: "0",
  label: "Tidak Dipilih",
};

const DivisionForm = ({ data }: DivisionFormProps) => {
  const [departments, setDepartments] = useState<ComboboxValueType[]>([]);
  const [fields, setFields] = useState<ComboboxValueType[]>([]);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<DivisionFormType>({
    resolver: zodResolver(DivisionFormSchema),
    mode: "all",
    defaultValues: {
      departmentId: data?.departmentId ?? 0,
      fieldId: data?.fieldId ?? 0,
      name: data?.name ?? "",
      code: data?.code ?? "",
    },
  });

  const { watch } = form;
  const departmentId = watch("departmentId");

  const onSubmitHandler = async (values: DivisionFormType) => {
    let id: string | number = "";
    console.log({ values });

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const response = await upsertDivision(values, data?.id);

      if (response.status === "success") {
        toast.success(response.message);

        if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data?.id
        ) {
          router.replace("/divisions");
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

  const fetchFields = async (departmentId: number) => {
    if (!departmentId) return null;

    try {
      const result = await getFields({ page: 1, limit: 100, departmentId });
      if (result)
        setFields(
          result.map((field) => ({
            value: String(field.id),
            label: field.name,
          })),
        );
    } catch (error) {
      console.error("An error occured while executing fetchFields", error);
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
    const timeout = setTimeout(() => {
      fetchFields(departmentId);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [departmentId]);

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
                <FormLabel>Nama Divisi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama divisi" {...field} />
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
                <FormLabel>Kode Divisi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan kode divisi" {...field} />
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
          <FormField
            control={form.control}
            name="fieldId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bidang Kerja (Opsional)</FormLabel>
                <FormControl>
                  <Combobox
                    options={departments}
                    value={String(field.value)}
                    placeholder="Pilih bidang kerja"
                    searchPlaceholder="Cari bidang kerja..."
                    onChange={(value) => {
                      form.setValue("fieldId", value ? Number(value) : null);
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

export default DivisionForm;
