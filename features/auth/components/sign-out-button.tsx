"use client";
import { useTransition } from "react";
import { signOut } from "../actions/sign-out";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOutIcon, LucideLoaderCircle } from "lucide-react";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut();
        toast.success("Signed out successfully");
      } catch (error) {
        toast.error("Failed to sign out");
        console.error("Failed to sign out:", error);
      }
    });
  };

  return (
    <Button variant="default" onClick={handleSignOut} disabled={pending}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <LogOutIcon />
      )}
      {pending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
