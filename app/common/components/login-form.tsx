import { cn } from "~/lib/utils";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/common/components/ui/field";
import { Input } from "~/common/components/ui/input";
import { Form, Link } from "react-router";
import { BorderBeam } from "./ui/border-beam";

interface LoginFormProps extends React.ComponentProps<"div"> {
  error?: string;
}

export function LoginForm({ error, className, ...props }: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FieldGroup>
              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/join">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
        <BorderBeam duration={4} size={300} reverse className="from-transparent via-green-500 to-transparent" />
      </Card>
    </div>
  );
}
