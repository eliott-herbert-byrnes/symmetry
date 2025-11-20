"use server";
import { signInPath, usersPath } from "@/app/paths";
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

const changeUserRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.string().min(1, "Role is required"),
});
export async function changeUserRole(
  _actionState: ActionState,
  formData: FormData
) {
  try {
    const profile = await getProfile();
    if (!profile) {
      redirect(signInPath());
    }

    const isAdminUser = isAdmin(profile);
    if (!isAdminUser) {
      return toActionState(
        "ERROR",
        "You are not authorized to change user roles",
        formData
      );
    }

    const validatedData = changeUserRoleSchema.parse({
      userId: formData.get("userId"),
      role: formData.get("role"),
    });

    const supabase = await createActionClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        role: validatedData.role,
      })
      .eq("id", validatedData.userId);

    if (error) {
      return toActionState(
        "ERROR",
        `Failed to change user role: ${error.message}`,
        formData
      );
    }

    revalidatePath(usersPath());
    return toActionState("SUCCESS", "User role changed successfully", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}
