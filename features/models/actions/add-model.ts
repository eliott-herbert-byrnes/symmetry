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

const addModelSchema = z.object({
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

export async function addModelAction(
    _actionState: ActionState,
    formData: FormData,
) {
  try {
    const file = formData.get("pdb_file") as File;
    if (!file || file.size === 0) {
      return toActionState("ERROR", "PDB file is required", formData);
    }

    if (!file.name.endsWith(".pdb")) {
      return toActionState(
        "ERROR",
        "PDB file must have a .pdb extension",
        formData
      );
    }

    const validatedData = addModelSchema.parse({
      name: formData.get("name"),
      type: formData.get("type"),
      formula: formData.get("formula"),
      molecular_weight: formData.get("molecular_weight"),
      symmetry: formData.get("symmetry"),
      space_group: formData.get("space_group"),
      unit_cell: formData.get("unit_cell"),
      unit_cell_angles: formData.get("unit_cell_angles"),
      description: formData.get("description"),
    });

    const supabase = await createActionClient();

    const timestamp = Date.now();
    const sanitizedName = validatedData.name
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const fileName = `${sanitizedName}_${timestamp}.pdb`;
    const storagePath = `models/${fileName}`;

    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("models")
      .upload(storagePath, fileBuffer, {
        contentType: "checmical/x-pdb",
        upsert: false,
      });

    if (uploadError) {
      return toActionState(
        "ERROR",
        `Failed to upload PDB file: ${uploadError.message}`,
        formData
      );
    }

    const { error: insertError } = await supabase.from("models").insert({
      name: validatedData.name,
      type: validatedData.type,
      formula: validatedData.formula,
      molecular_weight: validatedData.molecular_weight,
      symmetry: validatedData.symmetry,
      space_group: validatedData.space_group,
      unit_cell: validatedData.unit_cell,
      unit_cell_angles: validatedData.unit_cell_angles,
      description: validatedData.description,
      storage_path: storagePath,
    });

    if (insertError) {
      await supabase.storage.from("models").remove([fileName]);
      return toActionState(
        "ERROR",
        `Failed to insert model: ${insertError.message}`,
        formData
      );
    }

    revalidatePath(modelsPath());
    return toActionState("SUCCESS", "Model added successfully", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}
