import { z } from "zod";
import { ForgotPasswordSchema } from "../schemas/auth.schema";

export const createResetPasswordToken = async (
  data: z.infer<typeof ForgotPasswordSchema>,
) => {
  const validation = ForgotPasswordSchema.safeParse(data);

  if (!validation.success) {
  }
};
