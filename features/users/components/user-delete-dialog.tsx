"use client";
import { Form } from "@/components/form/form";
import { ActionState } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, TrashIcon } from "lucide-react";
import { useState } from "react";

type UserDeleteDialogProps = {
  title: string;
  description: string;
  action: (payload: FormData) => void;
  actionState: ActionState;
  userId: string;
  isAdmin: boolean;
  isPending: boolean;
};
const UserDeleteDialog = ({
  title,
  description,
  action,
  actionState,
  userId,
  isAdmin,
  isPending,
}: UserDeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start gap-4" disabled={!isAdmin}>
          <TrashIcon className="w-4 h-4 text-muted-foreground" />
          <span className="font-normal">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form
          action={action}
          actionState={actionState}
          onSuccess={handleClose}
          onError={handleClose}
        >
          <input type="hidden" name="userId" value={userId} />
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-destructive">
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2 mt-4">
            <Button
              className="w-[75px]"
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-[75px]" disabled={isPending} variant="destructive">
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { UserDeleteDialog };