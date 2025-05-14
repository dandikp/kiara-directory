import { PaginationSearchParams } from "@/types/datatable.type";
import { z } from "zod";
import {
  SafeTeamSchema,
  TeamFormSchema,
  TeamSchema,
} from "../schemas/team.schema";

export type TeamType = z.infer<typeof TeamSchema>;
export type SafeTeamType = z.infer<typeof SafeTeamSchema>;
export type TeamPageSearchParams = PaginationSearchParams & Partial<TeamType>;
export type TeamFormType = z.infer<typeof TeamFormSchema>;
