"use server";
import { homePath } from "@/app/paths";
import { createActionClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createActionClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return {
      ok: false,
      message: error.message,
    };
  }

  revalidatePath(homePath(), "layout");
  redirect(homePath());
}
