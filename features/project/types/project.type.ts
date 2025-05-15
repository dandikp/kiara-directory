import { z } from "zod";
import {
  ProjectFormSchema,
  ProjectSchema,
  SafeProjectSchema,
} from "../schemas/project.schema";

export type ProjectType = z.infer<typeof ProjectSchema>;
export type SafeProjectType = z.infer<typeof SafeProjectSchema>;
export type ProjectFormType = z.infer<typeof ProjectFormSchema>;
