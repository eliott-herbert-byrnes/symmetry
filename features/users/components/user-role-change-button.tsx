"use client";

import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { UserRoleChangeDialog } from "./user-role-change-dialog";
import { changeUserRole } from "../actions/user-change-role";

const UserRoleChangeButton = ({ 
  userId, 
  currentRole, 
  isAdmin 
}: { 
  userId: string;
  currentRole: string;
  isAdmin: boolean;
}) => {
  const [actionState, action, isPending] = useActionState(
    changeUserRole,
    EMPTY_ACTION_STATE
  );

  return (
    <UserRoleChangeDialog
      title="Change User Role"
      description="Changing a user's role will affect their access permissions within the organization."
      action={action}
      actionState={actionState}
      userId={userId}
      currentRole={currentRole}
      isAdmin={isAdmin}
      isPending={isPending}
    />
  );
};

export { UserRoleChangeButton };