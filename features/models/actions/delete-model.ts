"use server";
import { modelsPath } from "@/app/paths";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { createActionClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteModelSchema = z.object({
  modelId: z.string().min(1, "Model ID is required"),
});

export async function deleteModelAction(
  _actionState: ActionState,
  formData: FormData,
) {
  try {
    const validatedData = deleteModelSchema.parse({
      modelId: formData.get("modelId"),
    });

    const supabase = await createActionClient();
    
    const {data: model, error: fetchError} = await supabase
    .from("models")
    .select("storage_path")
    .eq("id", validatedData.modelId)
    .single();

    if (fetchError) {
        return toActionState(
            "ERROR",
            `Failed to fetch model: ${fetchError.message}`,
            formData
        );
    }

    if (model.storage_path) {
        const fileName = model.storage_path.startsWith("models/")
        ? model.storage_path.replace("models/", "")
        : model.storage_path;

        const {error: storageError} = await supabase.storage
        .from("models")
        .remove([fileName]);

        if (storageError) {
            console.error("Error deleting model file:", storageError);
        }
    }

    const {error: deleteError} = await supabase
    .from("models")
    .delete()
    .eq("id", validatedData.modelId);

    if (deleteError) {
        return toActionState(
            "ERROR",
            `Failed to delete model: ${deleteError.message}`,
            formData
        );
    }

    revalidatePath(modelsPath());
    return toActionState("SUCCESS", "Model deleted successfully", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}