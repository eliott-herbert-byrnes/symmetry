"use server";

import { modelsPath } from "@/app/paths";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createActionClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editModelSchema = z.object({
  modelId: z.string().min(1, "Model ID is required"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  type: z
    .string()
    .min(1, "Type is required")
    .max(100, "Type must be less than 100 characters"),
  formula: z
    .string()
    .min(0)
    .max(100, "Formula must be less than 100 characters")
    .nullable(),
  molecular_weight: z
    .string()
    .min(0)
    .max(100, "Molecular weight must be less than 100 characters")
    .nullable(),
  symmetry: z
    .string()
    .min(0)
    .max(100, "Symmetry must be less than 100 characters")
    .nullable(),
  space_group: z
    .string()
    .min(0)
    .max(100, "Space group must be less than 100 characters")
    .nullable(),
  unit_cell: z
    .string()
    .min(0)
    .max(100, "Unit cell must be less than 100 characters")
    .nullable(),
  unit_cell_angles: z
    .string()
    .min(0)
    .max(100, "Unit cell angles must be less than 100 characters")
    .nullable(),
  description: z
    .string()
    .min(0)
    .max(1000, "Description must be less than 1000 characters")
    .nullable(),
});

export async function editModelAction(
  _actionState: ActionState,
  formData: FormData
) {
  try {
    const validatedData = editModelSchema.parse({
      modelId: formData.get("modelId"),
      name: formData.get("name"),
      type: formData.get("type"),
      formula: formData.get("formula") || null,
      molecular_weight: formData.get("molecular_weight") || null,
      symmetry: formData.get("symmetry") || null,
      space_group: formData.get("space_group") || null,
      unit_cell: formData.get("unit_cell") || null,
      unit_cell_angles: formData.get("unit_cell_angles") || null,
      description: formData.get("description") || null,
    });

    const supabase = await createActionClient();

    const { error: updateError } = await supabase
      .from("models")
      .update({
        name: validatedData.name,
        type: validatedData.type,
        formula: validatedData.formula,
        molecular_weight: validatedData.molecular_weight,
        symmetry: validatedData.symmetry,
        space_group: validatedData.space_group,
        unit_cell: validatedData.unit_cell,
        unit_cell_angles: validatedData.unit_cell_angles,
        description: validatedData.description,
      })
      .eq("id", validatedData.modelId);

    if (updateError) {
      return toActionState(
        "ERROR",
        `Failed to update model: ${updateError.message}`,
        formData
      );
    }

    revalidatePath(modelsPath());
    return toActionState("SUCCESS", "Model updated successfully", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}

