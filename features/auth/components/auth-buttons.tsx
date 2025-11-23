import { signInPath } from "@/app/paths";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export async function AuthButtons() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const signedIn = session !== null;

  return (
    <>
      {!signedIn ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={signInPath()}>
            <LogInIcon />
            Sign In
          </Link>
        </Button>
      ) : (
        <SignOutButton />
      )}
    </>
  );
}
