"use server";
import { invitesPath, signInPath } from "@/app/paths";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getProfile, isAdmin } from "@/lib/auth";
import { createActionClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createInviteSchema = z.object({
  email: z.email("Invalid email address"),
});

export const createInvite = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const profile = await getProfile();
    if (!profile) {
      redirect(signInPath());
    }

    const isAdminUser = isAdmin(profile);
    if (!isAdminUser) {
      return toActionState(
        "ERROR",
        "You are not authorized to create invites",
        formData
      );
    }

    const validatedData = createInviteSchema.parse({
        email: formData.get("email"),
    });

    const supabase = await createActionClient();
    const { error: insertError } = await supabase.from("invitations").insert({
        email: validatedData.email,
        role: "student",
        token: crypto.randomUUID(),
        status: "pending",
        invited_by: profile.user.id,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days,
    });

    if (insertError) {
      return toActionState(
        "ERROR",
        `Failed to create invite: ${insertError.message}`,
        formData
      );
    }

    console.log(`Invite created for ${validatedData.email}`);

    revalidatePath(invitesPath());
    return toActionState("SUCCESS", "Invite created successfully", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
};
