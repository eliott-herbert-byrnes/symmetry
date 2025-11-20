"use server";
import { signInPath, usersPath } from "@/app/paths";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getProfile, isAdmin } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const userDeleteSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export async function userDelete(
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
        "You are not authorized to delete users",
        formData
      );
    }

    const validatedData = userDeleteSchema.parse({
      userId: formData.get("userId"),
    });

    if (validatedData.userId === profile.user.id) {
      return toActionState(
        "ERROR",
        "You cannot delete your own account",
        formData
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(validatedData.userId);

    if (deleteUserError) {
      return toActionState(
        "ERROR",
        `Failed to delete user: ${deleteUserError.message}`,
        formData
      );
    }

    revalidatePath(usersPath());
    return toActionState("SUCCESS", "User deleted successfully", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}
