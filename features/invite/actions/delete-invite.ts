"use server";
import { invitesPath, signInPath } from "@/app/paths";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getProfile, isAdmin } from "@/lib/auth";
import { createActionClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteInvite = async (email: string) => {
  try {
    const profile = await getProfile();
    if (!profile) {
      redirect(signInPath());
    }

    const isAdminUser = isAdmin(profile);
    if (!isAdminUser) {
      return toActionState("ERROR", "You are not authorized to delete invites");
    }

    const supabase = await createActionClient();

    const { error: deleteError } = await supabase
      .from("invitations")
      .delete()
      .eq("email", email);

    if (deleteError) {
      return toActionState(
        "ERROR",
        `Failed to delete invite: ${deleteError.message}`
      );
    }

    revalidatePath(invitesPath());
    return toActionState("SUCCESS", "Invite deleted successfully");
  } catch (error) {
    return fromErrorToActionState(error);
  }
};
