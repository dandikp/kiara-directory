import { z } from "zod";
import { ForgotPasswordSchema } from "../schemas/auth.schema";
import AppResponse from "@/lib/response/AppResponse";

export const createResetPasswordToken = async (
  data: z.infer<typeof ForgotPasswordSchema>,
) => {
  const validation = ForgotPasswordSchema.safeParse(data);

  if (!validation.success) {
    console.log({ validation });
    return AppResponse.error("Tidak sesuai");
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
};

// export const createUser = async (
//   data: CreateUserType,
//   revalidateUrl?: string,
// ): Promise<CustomResponse> => {
//   const validate = CreateUserSchema.safeParse(data);

//   if (!validate.success) {
//     return await handleResponse(
//       "Validation error: " +
//         validate.error.errors.map((e) => e.message).join(", "),
//       false,
//     );
//   }

//   try {
//     const API_KEY = process.env.REOON_API_KEY ?? "";
//     const mailValidator = new MailValidator(API_KEY);
//     const validateEmail = await mailValidator.validate(validate.data.email);

//     if (validateEmail.status !== "safe") {
//       return await handleResponse(
//         `${validateEmail.email} is not a valid email address. Please use another email address!`,
//         false,
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { email: validate.data.email },
//     });

//     if (existingUser && !existingUser.deletedAt) {
//       return await handleResponse(
//         `Email ${validate.data.email} is already in use.`,
//         false,
//       );
//     }

//     const hashedPassword = await bcrypt.hash(validate.data.password, 10);

//     if (existingUser && existingUser.deletedAt) {
//       await prisma.user.update({
//         where: { id: existingUser.id },
//         data: {
//           name: validate.data.name,
//           email: validate.data.email,
//           phone: validate.data.phone,
//           password: hashedPassword,
//           role: validate.data.role,
//           deletedAt: null,
//         },
//       });
//       safeRevalidatePath(revalidateUrl);
//       return await handleResponse("User created successfully!", true);
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         name: validate.data.name,
//         email: validate.data.email,
//         password: hashedPassword,
//         role: validate.data.role,
//         phone: validate.data.phone,
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         role: true,
//       },
//     });
//     safeRevalidatePath(revalidateUrl);
//     return await handleResponse("User created successfully!", true, newUser);
//   } catch (error) {
//     const errorMessage = getErrorMessage(error);
//     console.error(`Error: ${errorMessage}`);
//     return await handleResponse(
//       `Failed to create user: ${errorMessage}`,
//       false,
//     );
//   }
// };
