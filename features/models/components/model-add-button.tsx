"use client";
import { useActionState } from "@/components/form/hooks/use-action-state";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { addModelAction } from "../actions/add-model";
import { ModelAddDialog } from "./model-add-dialog";

export function ModelAddButton() {
  const [actionState, action, isPending] = useActionState(
    addModelAction,
    EMPTY_ACTION_STATE
  );
  return (
    <ModelAddDialog
      action={action}
      actionState={actionState}
      isPending={isPending}
    />
  );
}
