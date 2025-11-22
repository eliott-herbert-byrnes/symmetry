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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Textarea } from "@/components/ui/textarea";
import { Model } from "./model-list";

type ModelEditDialogProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  isPending: boolean;
  model: Model;
};

const ModelEditDialog = ({
  action,
  actionState,
  isPending,
  model,
}: ModelEditDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start gap-4">
          <Pencil className="w-4 h-4 text-muted-foreground" />
          <span className="font-normal">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <Form
          action={action}
          actionState={actionState}
          onSuccess={handleClose}
          onError={handleClose}
        >
          <input type="hidden" name="modelId" value={model.id} />
          <DialogHeader>
            <DialogTitle>Edit Model</DialogTitle>
            <DialogDescription>
              Update model information
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Model name"
                maxLength={100}
                defaultValue={model.name}
                required
              />
              <FieldError actionState={actionState} name="name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                placeholder="Model type"
                maxLength={100}
                defaultValue={model.type}
                required
              />
              <FieldError actionState={actionState} name="type" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="formula">Formula</Label>
              <Input
                id="formula"
                name="formula"
                placeholder="Model formula"
                maxLength={100}
                defaultValue={model.formula || ""}
              />
              <FieldError actionState={actionState} name="formula" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="molecular_weight">Molecular Weight</Label>
              <Input
                id="molecular_weight"
                name="molecular_weight"
                placeholder="Model molecular weight"
                defaultValue={model.molecular_weight?.toString() || ""}
              />
              <FieldError actionState={actionState} name="molecular_weight" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="symmetry">Symmetry</Label>
              <Input
                id="symmetry"
                name="symmetry"
                placeholder="Model symmetry"
                maxLength={100}
                defaultValue={model.symmetry || ""}
              />
              <FieldError actionState={actionState} name="symmetry" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="space_group">Space Group</Label>
              <Input
                id="space_group"
                name="space_group"
                placeholder="Model space group"
                maxLength={100}
                defaultValue={model.space_group || ""}
              />
              <FieldError actionState={actionState} name="space_group" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit_cell">Unit Cell</Label>
              <Input
                id="unit_cell"
                name="unit_cell"
                placeholder="Model unit cell"
                maxLength={100}
                defaultValue={model.unit_cell || ""}
              />
              <FieldError actionState={actionState} name="unit_cell" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit_cell_angles">Unit Cell Angles</Label>
              <Input
                id="unit_cell_angles"
                name="unit_cell_angles"
                placeholder="Model unit cell angles"
                maxLength={100}
                defaultValue={model.unit_cell_angles || ""}
              />
              <FieldError actionState={actionState} name="unit_cell_angles" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                name="description"
                placeholder="Model description"
                maxLength={1000}
                defaultValue={model.description || ""}
              />
              <FieldError actionState={actionState} name="description" />
            </div>
          </div>

          <DialogFooter className="flex flex-row gap-2">
            <Button
              className="w-[75px]"
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { ModelEditDialog };

