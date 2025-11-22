"use client";
import { useActionState } from "@/components/form/hooks/use-action-state";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { ModelEditDialog } from "./model-edit-dialog";
import { editModelAction } from "../actions/edit-model";
import { Model } from "./model-list";

export function ModelEditButton({ model }: { model: Model }) {
  const [actionState, action, isPending] = useActionState(
    editModelAction,
    EMPTY_ACTION_STATE
  );
  return (
    <ModelEditDialog
      model={model}
      action={action}
      actionState={actionState}
      isPending={isPending}
    />
  );
}

