"use client";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { LucideLoaderCircle, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteInvite } from "../actions/delete-invite";

type InvitationDeleteButtonProps = {
  email: string;
};

const InvitationDeleteButton = ({
  email,
}: InvitationDeleteButtonProps) => {
  const router = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    title: "Are you sure you want to delete this invitation?",
    description: "This action cannot be undone.",
    action: deleteInvite.bind(null, email),
    trigger: (isPending) => (
      <Button variant="outline" disabled={isPending}>
        {isPending ? (
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <TrashIcon className="h-4 w-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { InvitationDeleteButton };