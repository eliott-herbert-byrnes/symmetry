"use client";

import { useActionState } from "@/components/form/hooks/use-action-state";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { InvitationDialog } from "./invite-create-dialog";
import { createInvite } from "../actions/create-invite";

const InvitationCreateButton = () => {
  const [actionState, action, isPending] = useActionState(
    createInvite,
    EMPTY_ACTION_STATE
  );

  return (
    <InvitationDialog
      title="Invite Member"
      description="Invite a user by email to this application"
      action={action}
      actionState={actionState}
      isPending={isPending}
    />
  );
};

export { InvitationCreateButton };
