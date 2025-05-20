import { z } from "zod";
import {
  CompanyFormSchema,
  CompanySchema,
  SafeCompanySchema,
} from "../schemas/company.schema";

export type CompanyType = z.infer<typeof CompanySchema>;
export type SafeCompanyType = z.infer<typeof SafeCompanySchema>;
export type CompanyFormType = z.infer<typeof CompanyFormSchema>;
