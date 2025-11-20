"use client";

import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { userDelete } from "../actions/user-delete";
import { UserDeleteDialog } from "./user-delete-dialog";

const UserDeleteButton = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;

}) => {
  const [actionState, action, isPending] = useActionState(
    userDelete,
    EMPTY_ACTION_STATE
  );

  return (
    <UserDeleteDialog
      title="Are you sure you want to delete this user?"
      description="Deleting a user will permanently remove all their data from the system."
      action={action}
      actionState={actionState}
      userId={userId}
      isAdmin={isAdmin}
      isPending={isPending}
    />
  );
};

export { UserDeleteButton };
