import { z } from "zod";
import { CompanySchema, SafeCompanySchema } from "../schemas/company.schema";

export type CompanyType = z.infer<typeof CompanySchema>;
export type SafeCompanyType = z.infer<typeof SafeCompanySchema>;
