/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Combobox from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useRoles from "@/features/role/hooks/useRoles";
import { getScopeTypeByRoleID } from "@/features/role/iibs/role-scope.lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScopeType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  CreateUserSchema,
  EditUserSchema,
  UserRoleScopeFormSchema,
} from "../schemas/user.schema";
import {
  CreateUserType,
  EditUserType,
  SafeUserType,
  UserRoleScopeFormType,
} from "../types/user.types";
import useRoleScope from "@/features/role/hooks/useRoleScope";
import useUserRoles from "../hooks/useUserRoles";

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
  onSubmit?: (type: "CREATE" | "UPDATE", userRoleId: number) => void;
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

type MinimalScope = { id: number; name: string };

export const UserRoleScopeForm = ({ onSubmit, index }: UserRolesInputProps) => {
  const { roles, loading: loadingRoles } = useRoles();

  const form = useForm<UserRoleScopeFormType>({
    resolver: zodResolver(UserRoleScopeFormSchema),
    mode: "all",
    defaultValues: {
      userId: 0,
      scopeType: undefined,
      roleId: 0,
      isMain: false,
    },
  });

  const selection = roles.map((role) => ({
    label: role.name,
    value: String(role.id),
  }));

  const onSubmitHandler = () => onSubmit && onSubmit("CREATE", 0);
  const roleId = useWatch({
    control: form.control,
    name: "roleId",
  });
  const scopeType = useWatch({
    control: form.control,
    name: "scopeType",
  });
  const availableScopeType = getScopeTypeByRoleID(roleId);
  const finalScopeType =
    scopeType === availableScopeType ? scopeType : undefined;
  const { data: scopes, isLoading: isLoadingScope } = useRoleScope(
    finalScopeType,
    {
      enabled: !!finalScopeType,
    },
  ) as { data: MinimalScope[]; isLoading: boolean };
  const scopeTypeOptions = SCOPE_TYPE_OPTIONS.map((option) => ({
    ...option,
    ...(option.value !== availableScopeType ? { disabled: true } : undefined),
  }));
  const scopeOptions = Array.isArray(scopes)
    ? scopes.map((scope) => ({ value: scope.id.toString(), label: scope.name }))
    : [];

  useEffect(() => {
    if (!finalScopeType) {
      form.setValue("scopeType", undefined);
      form.setValue("scopeId", undefined);
    }
  }, [finalScopeType, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="w-full flex flex-nowrap flex-col gap-2"
      >
        <span className="text-lg font-semibold">Peran {index}</span>
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peran / Jabatan</FormLabel>
              <FormControl>
                <Combobox
                  options={selection}
                  placeholder="Pilih peran / jabatan"
                  searchPlaceholder="Cari peran / jabatan..."
                  disabled={loadingRoles}
                  value={String(field.value)}
                  onChange={(value) => {
                    form.setValue("roleId", Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-wrap gap-4">
          {availableScopeType && (
            <div className="w-full gap-2 grid grid-cols-2">
              <FormField
                control={form.control}
                name="scopeType"
                render={({ field }) => (
                  <FormItem>
                    <Combobox
                      className="basis-1/2"
                      options={scopeTypeOptions}
                      placeholder="Pilih unit kerja"
                      searchPlaceholder="Cari unit kerja..."
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scopeId"
                render={({ field }) => (
                  <FormItem>
                    <Combobox
                      className="basis-1/2"
                      options={scopeOptions}
                      placeholder="Pilih unit kerja"
                      searchPlaceholder="Cari unit kerja..."
                      value={String(field.value)}
                      disabled={!finalScopeType || isLoadingScope}
                      onChange={(value) => {
                        form.setValue("scopeId", Number(value));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="isMain"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex items-center space-x-2">
                  <Switch
                    id={`main-role-switch-${index}`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label
                    htmlFor={`main-role-switch-${index}`}
                    className="w-fit"
                  >
                    Peran / jabatan utama
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export const SelectUserRolesForm = ({
  data,
  userId,
}: {
  data: SafeUserType;
  userId: number;
}) => {
  const {
    isLoading,
    data: roles,
    refetch,
  } = useUserRoles(userId, { enabled: !!userId });
  return (
    <div className="flex justify-center w-full flex-col gap-6 max-w-lg mt-4">
      <UserRoleScopeForm index={1} />
      <UserRoleScopeForm index={2} />
      <UserRoleScopeForm index={3} />
      <Button>Tambah Peran / Jabatan</Button>
    </div>
  );
};
