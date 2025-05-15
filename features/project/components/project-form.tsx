"use client";

import Combobox from "@/components/combobox";
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
import { getCompanies } from "@/features/company/services/company.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProjectFormSchema } from "../schemas/project.schema";
import { ProjectFormType, SafeProjectType } from "../types/project.type";
import { WorkFieldEnum } from "@prisma/client";
import { upsertProject } from "../services/project.service";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProjectFormProps {
  data?: SafeProjectType;
}

type ComboboxValueType = {
  value: string;
  label: string;
};

const startYear = new Date().getFullYear();
const endYear = 1970;
const years: ComboboxValueType[] = Array.from(
  { length: startYear - endYear + 1 },
  (_, i) => {
    const year = startYear - i;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  },
);

const ProjectForm = ({ data }: ProjectFormProps) => {
  const [companies, setCompanies] = useState<ComboboxValueType[]>([]);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<ProjectFormType>({
    resolver: zodResolver(ProjectFormSchema),
    mode: "all",
    defaultValues: {
      companyId: data?.companyId ?? 0,
      year: data?.year ?? 0,
      name: data?.name ?? "",
      code: data?.code ?? "",
      workField: data?.workField ?? WorkFieldEnum.ENVIRONMENTAL,
    },
  });

  const onSubmitHandler = async (values: ProjectFormType) => {
    let id: string | number = "";

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const response = await upsertProject(values, data?.id);

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

  const fetchCompanies = async () => {
    try {
      const result = await getCompanies({ page: 1, limit: 100 });
      if (result)
        setCompanies(
          result.map((companies) => ({
            value: String(companies.id),
            label: companies.name,
          })),
        );
    } catch (error) {
      console.error("An error occured while executing fetchCompanies", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCompanies();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
                <FormLabel>Nama Proyek Pekerjaan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan proyek pekerjaan" {...field} />
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
                <FormLabel>Kode Proyek Pekerjaan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan kode proyek pekerjaan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Perusahaan</FormLabel>
                <FormControl>
                  <Combobox
                    options={companies}
                    value={String(field.value)}
                    placeholder="Pilih perusahaan"
                    searchPlaceholder="Cari perusahaan..."
                    onChange={(value) => {
                      form.setValue("companyId", Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Pekerjaan</FormLabel>
                <FormControl>
                  <Combobox
                    options={years}
                    value={String(field.value)}
                    placeholder="Pilih tahun"
                    searchPlaceholder="Cari tahun..."
                    onChange={(value) => {
                      form.setValue("year", Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bidang Pekerjaan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ENVIRONMENTAL" />
                      </FormControl>
                      <FormLabel className="font-normal">Lingkungan</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="URBAN_PLANNING" />
                      </FormControl>
                      <FormLabel className="font-normal">Tata Ruang</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="FLAG_BORROWING" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Pinjam Bendera
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
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

export default ProjectForm;
