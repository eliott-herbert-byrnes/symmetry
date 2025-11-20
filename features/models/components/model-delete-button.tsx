"use client";
import { useActionState } from "@/components/form/hooks/use-action-state";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { ModelDeleteDialog } from "./model-delete-dialog";
import { deleteModelAction } from "../actions/delete-model";


export function ModelDeleteButton({ modelId }: { modelId: string }) {
  const [actionState, action, isPending] = useActionState(
    deleteModelAction,
    EMPTY_ACTION_STATE
  );
  return (
    <ModelDeleteDialog
      modelId={modelId}
      action={action}
      actionState={actionState}
      isPending={isPending}
    />
  );
}
