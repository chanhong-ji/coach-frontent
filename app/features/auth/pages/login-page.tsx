import z from "zod";
import { LoginForm } from "~/common/components/login-form";
import type { Route } from "./+types/login-page";
import { createClient } from "~/client";
import { LOGIN_MUTATION } from "~/graphql/queries";
import type { LoginMutation, LoginMutationVariables } from "~/graphql/__generated__/graphql";
import { redirect } from "react-router";

const formValidation = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const parsedData = formValidation.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return { error: parsedData.error.message };
  }

  const { client, headers } = createClient(request);

  const response = await client.rawRequest<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    LoginInput: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });
  const {
    login: { ok, error },
  } = response.data;

  if (error || !ok) {
    return { ok: false, error: error ?? error };
  }

  // const headers = new Headers();
  const token = response.headers.get("set-cookie");
  if (token) {
    headers.append("set-cookie", token);
  }
  // if (token) {
  //   headers.append("set-cookie", token);
  // }
  return redirect("/dashboard", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm error={actionData?.error ?? undefined} />
      </div>
    </div>
  );
}
