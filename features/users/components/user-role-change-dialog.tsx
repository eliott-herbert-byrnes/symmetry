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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, UserIcon } from "lucide-react";
import { useState } from "react";

type UserRoleChangeDialogProps = {
  title: string;
  description: string;
  action: (payload: FormData) => void;
  actionState: ActionState;
  userId: string;
  isAdmin: boolean;
  isPending: boolean;
  currentRole: string;
};

const UserRoleChangeDialog = ({
  title,
  description,
  action,
  actionState,
  userId,
  isAdmin,
  isPending,
  currentRole,
}: UserRoleChangeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(currentRole); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start gap-4" disabled={!isAdmin}>
          <UserIcon className="w-4 h-4 text-muted-foreground" />
          <span className="font-normal">Change Role</span>
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
          <input type="hidden" name="role" value={selectedRole} />
          
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <Separator className="my-4"/>
          
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter className="flex flex-row gap-2 mt-4">
            <Button
              className="w-[75px]"
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-[75px]" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { UserRoleChangeDialog };