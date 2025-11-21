"use client";
import { FieldError } from "@/components/form/field-error";
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
import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type InvitationDialogProps = {
  title: string;
  description: string;
  action: (payload: FormData) => void;
  actionState: ActionState;
  isPending: boolean;
};
const InvitationDialog = ({
  title,
  description,
  action,
  actionState,
  isPending,
}: InvitationDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    handleClose();
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
            <Button variant="outline" disabled>
              <PlusIcon className="w-4 h-4" />
              Invite Team Member
            </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Disabled for MVP</p>
          </TooltipContent>
          </Tooltip>

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form
          action={action}
          actionState={actionState}
          onSuccess={handleSuccess}
          onError={handleClose}
        >
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <FieldError actionState={actionState} name="email" />
          <DialogFooter className="flex flex-row gap-2 mt-4">
            <Button
              className="w-[75px]"
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Invite"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { InvitationDialog };