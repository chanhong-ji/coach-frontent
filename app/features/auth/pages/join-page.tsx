import { SignupForm } from "~/common/components/signup-form";
import { redirect } from "react-router";
import z from "zod";
import type { Route } from "./+types/join-page";
import { createClient } from "~/client";
import { CREATE_USER_MUTATION } from "~/graphql/queries";
import type { CreateUserMutation, CreateUserMutationVariables } from "~/graphql/__generated__/graphql";

const formValidation = z.object({
  name: z.coerce.string().min(1),
  email: z.string().email(),
  password: z.coerce.string().min(4),
  confirmPassword: z.coerce.string().min(4),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const parsedData = formValidation.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    return { ok: false, error: parsedData.error.message };
  }

  if (parsedData.data.password !== parsedData.data.confirmPassword) {
    console.log("Passwords do not match", ":Passwords do not match from action");
    return { ok: false, error: "Passwords do not match" };
  }

  const { client } = createClient(request);
  const {
    createUser: { ok, error },
  } = await client.request<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER_MUTATION, {
    CreateUserInput: {
      name: parsedData.data.name,
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  if (error || !ok) {
    console.log(error, ":error from action");
    return { ok: false, error: error ?? error };
  }

  return redirect("/login");
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
        {actionData?.error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{actionData.error}</div>}
      </div>
    </div>
  );
}
