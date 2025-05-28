import { ResetPasswordSchema } from "@/features/auth/schemas/auth.schema";
import { FormVisibility } from "@/features/auth/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SafeUserType } from "../types/user.types";

const ResetPasswordForm = ({
  data,
  userId,
}: {
  data: SafeUserType;
  userId: number;
}) => {
  const [formVisibility, setFormVisibility] = React.useState<FormVisibility>({
    password: false,
    passwordConfirmation: false,
  });
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const toggleVisibility = (field: keyof FormVisibility) => {
    setFormVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = React.useCallback(
    async (values: z.infer<typeof ResetPasswordSchema>) => {
      startTransition(async () => {
        if (!userId) return;
        const loaderId = toast.loading("Mengatur ulang password...");

        try {
          const promise = await setNewPasswordByToken(token, userId, values);
          if (promise.code === 200 && promise.status === "success") {
            toast.success(promise.message, { duration: 6000 });
            form.setValue("password", "");
            form.setValue("passwordConfirmation", "");
          } else {
            throw new Error(promise.message);
          }
        } catch (error) {
          const err = error as Error;
          toast.error(
            err.message || "Terjadi Kesalahan, coba beberapa saat lagi!",
          );
        } finally {
          await new Promise((res) => setTimeout(res, 100));
          if (loaderId) toast.dismiss(loaderId);
        }
      });
    },
    [token, userId],
  );

  return;
  <div className="w-full flex flex-col gap-4">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="w-full relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
                    <Lock weight="bold" />
                  </span>
                  <Input
                    className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 pr-10 focus-visible:ring-0 focus-visible:ring-neutral-300"
                    placeholder="Kata sandi"
                    type={formVisibility[field.name] ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 text-xl"
                    onClick={() => toggleVisibility(field.name)}
                    type="button"
                  >
                    {formVisibility[field.name] ? <EyeSlash /> : <Eye />}
                  </Button>
                </div>
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
                <div className="w-full relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 text-base">
                    <Lock weight="bold" />
                  </span>
                  <Input
                    className="bg-neutral-100 text-sm md:text-base placeholder:text-neutral-600 text-neutral-700 pl-8 pr-10 focus-visible:ring-0 focus-visible:ring-neutral-300"
                    placeholder="Ketik ulang kata sandi"
                    type={formVisibility[field.name] ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 text-xl"
                    onClick={() => toggleVisibility(field.name)}
                    type="button"
                  >
                    {formVisibility[field.name] ? <EyeSlash /> : <Eye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="cursor-pointer disabled:cursor-none"
        >
          {isPending ? "..." : "Atur Ulang"}
        </Button>
      </form>
    </Form>
  </div>;
};

export default ResetPasswordForm;
