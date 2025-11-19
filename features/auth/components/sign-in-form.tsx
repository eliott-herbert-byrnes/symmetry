import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { homePath } from "@/app/paths";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { LucideLoaderCircle } from "lucide-react";
import { requestDemo } from "../actions/request-demo-otp";
import { useRouter } from "next/navigation";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const signInWithDemo = () => {
    startTransition(async () => {
      const res = await requestDemo();
      if (res.ok) {
        setSent(true);
        toast.success("Demo credentials loaded. Redirecting...");
        router.refresh();
        setTimeout(() => {
          router.push(homePath());
        }, 500);
      } else {
        toast.error(res.message ?? "Failed to load demo credentials");
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {!sent ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            {/* <CardDescription>Login with demo account</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-1">
                  Login with demo account
                </FieldSeparator>
                <Field>
                  <Button
                    variant="default"
                    className="w-full cursor-pointer"
                    onClick={signInWithDemo}
                    disabled={pending}
                    type="button"
                  >
                    {pending ? (
                      <LucideLoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      "🚀 Sign in with Demo"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <LucideLoaderCircle className="h-8 w-8 animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          </CardContent>
        </Card>
      )}
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
