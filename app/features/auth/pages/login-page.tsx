import { LoginForm } from "~/common/components/login-form";
import type { Route } from "./+types/login-page";
import z from "zod";

const formValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const parsedData = formValidation.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return { error: parsedData.error.message };
  }
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm error={actionData?.error} />
      </div>
    </div>
  );
}
