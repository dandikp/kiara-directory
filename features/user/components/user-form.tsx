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
import {
  CreateUserSchema,
  EditUserSchema,
  UserRolesFormSchema,
} from "../schemas/user.schema";
import {
  CreateUserType,
  EditUserType,
  SafeUserType,
} from "../types/user.types";
import { DatePicker } from "@/components/date-picker";
import { SafeRoleType } from "@/features/role/types/role.types";
import { z } from "zod";
import { Select } from "@/components/ui/select";
import Combobox from "@/components/combobox";
import { ScopeType } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const CreateUserForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      avatar: null,
      bio: null,
      dob: null,
    },
  });

  const onSubmitHandler = async (values: CreateUserType) => {
    let id: string | number = "";

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const promise = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const response = await promise.json();

      if (response.status === "success") {
        toast.success(response.message);

        if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data?.id
        ) {
          router.replace("/users");
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
                <FormLabel>Nama Pengguna</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama pengguna" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan email pengguna"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan no. telepon pengguna"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan password baru pengguna"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan konfirmasi password pengguna"
                    {...field}
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
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

export const UpdateUserForm = ({
  data,
  userId,
}: {
  data: SafeUserType;
  userId: number;
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<EditUserType>({
    resolver: zodResolver(EditUserSchema),
    mode: "all",
    defaultValues: {
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      bio: data?.bio ?? "",
      dob: data?.dob ? new Date(data.dob) : undefined,
    },
  });

  const onSubmitHandler = async (values: EditUserType) => {
    let id: string | number = "";

    try {
      setIsPending(true);
      id = toast.loading("Mohon tunggu, sedang memproses...");
      const promise = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, dob: values.dob?.toISOString() }),
      });
      const response = await promise.json();

      if (response.status === "success") {
        toast.success(response.message);

        if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data?.id
        ) {
          router.replace("/users");
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
                <FormLabel>Nama Pengguna</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama pengguna" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan email pengguna"
                    type="email"
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan no. telepon pengguna"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio (Singkat)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan bio singkat pengguna"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder="Masukkan tanggal lahir pengguna"
                    {...field}
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
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
};

type UserRolesInputProps = {
  roles: SafeRoleType[];
  onChange?: (roleId: number) => void;
  index?: number;
};

const SCOPE_TYPE_OPTIONS = Object.values(ScopeType).map((value) => ({
  value,
  label: {
    DEPARTMENT: "Departemen",
    FIELD: "Bidang",
    DIVISION: "Divisi",
  }[value],
}));

export const UserRoleScopeInputGroup = ({
  roles,
  onChange,
  index,
}: UserRolesInputProps) => {
  const selection = roles.map((role) => ({
    label: role.name,
    value: String(role.id),
  }));
  const onChangeHandler = (selectedId: string) =>
    onChange && onChange(Number(selectedId));

  console.log({ SCOPE_TYPE_OPTIONS });

  return (
    <div className="w-full flex flex-nowrap flex-col gap-2">
      <span className="text-lg font-semibold">Peran {index}</span>
      <div className="w-full flex flex-wrap gap-4">
        <Combobox
          options={selection}
          placeholder="Pilih peran / jabatan"
          searchPlaceholder="Cari peran / jabatan..."
          onChange={onChangeHandler}
        />
        <div className="w-full gap-2 grid grid-cols-2">
          <Combobox
            className="basis-1/2"
            options={SCOPE_TYPE_OPTIONS}
            placeholder="Pilih unit kerja"
            searchPlaceholder="Cari unit kerja..."
            onChange={onChangeHandler}
          />
          <Combobox
            className="basis-1/2"
            options={SCOPE_TYPE_OPTIONS}
            placeholder="Pilih unit kerja"
            searchPlaceholder="Cari unit kerja..."
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-full flex items-center space-x-2">
          <Switch id={`main-role-switch=${index}`} />
          <Label htmlFor={`main-role-switch=${index}`} className="w-fit">
            Peran / jabatan utama
          </Label>
        </div>
      </div>
    </div>
  );
};

export const SelectUserRolesForm = ({
  data,
  userId,
  roles,
}: {
  roles: SafeRoleType[];
  data: SafeUserType;
  userId: number;
}) => {
  const form = useForm<z.infer<typeof UserRolesFormSchema>>({
    resolver: zodResolver(UserRolesFormSchema),
    mode: "all",
    defaultValues: { roleIds: [] },
  });

  const onSubmitHandler = () => {};

  return (
    <div className="flex justify-center max-w-lg mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="w-full flex flex-col gap-6"
        >
          <UserRoleScopeInputGroup roles={roles} index={1} />
          <UserRoleScopeInputGroup roles={roles} index={2} />
          <UserRoleScopeInputGroup roles={roles} index={3} />
          <Button>Tambah Peran / Jabatan</Button>
        </form>
      </Form>
    </div>
  );
};
