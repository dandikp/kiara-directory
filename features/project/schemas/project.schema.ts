import { SafeCompanySchema } from "@/features/company/schemas/company.schema";
import { WorkFieldEnum } from "@prisma/client";
import { z } from "zod";

const MIN_YEAR = 1970;
const CURRENT_YEAR = new Date().getFullYear();

export const ProjectSchema = z.object({
  id: z.number().positive({ message: "ID harus lebih besar dari 0" }),
  companyId: z.number().positive({
    message: "Perusahaan (company) harus dipilih",
  }),
  company: SafeCompanySchema,
  name: z
    .string()
    .min(3, { message: "Nama divisi harus lebih dari 3 karakter" })
    .max(191, { message: "Nama divisi maksimal 191 karakter" }),
  code: z
    .string()
    .min(3, { message: "Kode divisi harus lebih dari 3 karakter" })
    .max(16, { message: "Kode divisi maksimal 16 karakter" }),
  workField: z.nativeEnum(WorkFieldEnum),
  year: z
    .number({
      required_error: "Tahun harus diisi",
      invalid_type_error: "Tahun harus berupa angka",
    })
    .int()
    .gte(MIN_YEAR, { message: `Tahun minimal ${MIN_YEAR}` })
    .lte(CURRENT_YEAR, { message: `Tahun maksimal ${CURRENT_YEAR}` }),
  createdAt: z.string().time({ precision: 3 }),
  updatedAt: z.string().time({ precision: 3 }).nullable().optional(),
  deletedAt: z.string().time({ precision: 3 }).nullable().optional(),
});

export const SafeProjectSchema = ProjectSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  company: true,
}).extend({
  company: SafeCompanySchema.nullable().optional(),
});

export const ProjectFormSchema = SafeProjectSchema.omit({
  id: true,
  company: true,
});
