"use client";
import { useTransition } from "react";
import { signOut } from "../actions/sign-out";
import { Button } from "@/components/ui/button";
import { LogOutIcon, LucideLoaderCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";


export function SignOutButton() {
  const [pending, startTransition] = useTransition();
  const isMobile = useIsMobile(); 

  const handleSignOut = () => {
    startTransition(async () => {

      await signOut();
    });
  };

  return (
    <Button variant="default" size="sm" onClick={handleSignOut} disabled={pending}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <LogOutIcon />
      )}
      {pending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
