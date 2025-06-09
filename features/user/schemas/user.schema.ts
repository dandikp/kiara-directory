import { SafeUserRoleSchema } from "@/features/role/schemas/role.schema";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  userRoles: z.array(SafeUserRoleSchema),
  email: z.string().email().trim().toLowerCase(),
  phone: z
    .string()
    .regex(/^(?:\+62|62|0)8[1235789][0-9]{7,10}$/, {
      message: "Nomor telepon tidak valid",
    })
    .trim(),
  password: z
    .string()
    .min(6, { message: "Password minimal berisi 6 karakter" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password harus mengandung satu huruf kapital (A-Z)",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password harus mengandung satu huruf kecil (a-z)",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password harus mengandung satu angka (0-9)",
    }),
  name: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, { message: "Nama harus diisi" }),
  avatar: z
    .string()
    .url({ message: "URL avatar tidak valid" })
    .nullable()
    .optional(),
  bio: z
    .string()
    .max(1024, { message: "Maksimal isi bio 1024 karakter" })
    .nullable()
    .optional(),
  dob: z.string().date().nullable(),
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeUserSchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const SimpleUserSchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  userRoles: true,
});

export const UserFormSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  userRoles: true,
});

export const EditUserSchema = UserFormSchema.omit({
  password: true,
  bio: true,
  dob: true,
}).extend({
  bio: z
    .string()
    .max(1024, { message: "Maksimal isi bio 1024 karakter" })
    .optional(),
  dob: z.date().optional(),
});

export const CreateUserSchema = UserFormSchema.extend({
  passwordConfirmation: z
    .string()
    .min(6, { message: "Password minimal berisi 6 karakter" }),
}).refine((data) => data.passwordConfirmation === data.password, {
  message: "Password dan konfirmasi password harus sama",
  path: ["passwordConfirmation"],
});

export const SafeUserWithNoRolesSchema = SafeUserSchema.omit({
  userRoles: true,
});

export const UserRolesFormSchema = z.object({
  roleIds: z.array(
    z
      .number({
        required_error: "ID peran / jabatan harus diisi.",
        message: "ID peran / jabatan harus berupa angka.",
      })
      .min(1, {
        message:
          "Pengguna harus setidaknya memiliki 1 peran / jabatan yang aktif.",
      }),
  ),
});

const ScopeTypeEnum = z.enum(["DEPARTMENT", "FIELD", "DIVISION"]);

export const UserRoleScopeFormSchema = z
  .object({
    userId: z
      .number({
        required_error: "ID pengguna harus diisi.",
        message: "ID pengguna harus berupa angka.",
      })
      .positive(),
    roleId: z
      .number({
        required_error: "ID peran / jabatan harus diisi.",
        message: "ID peran / jabatan harus berupa angka.",
      })
      .positive(),
    scopeType: ScopeTypeEnum.optional(),
    departmentId: z
      .number({
        required_error: "ID departemen harus diisi.",
        message: "ID departemen harus berupa angka.",
      })
      .positive()
      .optional(),
    fieldId: z
      .number({
        required_error: "ID bidang kerja harus diisi.",
        message: "ID bidang kerja harus berupa angka.",
      })
      .positive()
      .optional(),
    divisionId: z
      .number({
        required_error: "ID divisi harus diisi.",
        message: "ID divisi harus berupa angka.",
      })
      .positive()
      .optional(),
  })
  .refine(
    (data) => {
      // roleId === 1 for System Administrator
      // roleId === 2 for CEO
      if (data.roleId > 2 && !data.scopeType) return false;
      return true;
    },
    { message: "Tipe scope peran / jabatan harus diisi.", path: ["scopeType"] },
  )
  .refine(
    (data) => {
      if (data.scopeType === "DIVISION") return !!data.divisionId;
      if (data.scopeType === "FIELD") return !!data.fieldId;
      if (data.scopeType === "DEPARTMENT") return !!data.departmentId;

      return true;
    },
    {
      message: "ID scope sesuai harus diisi berdasarkan tipe scope.",
      path: ["scopeType"],
    },
  );
