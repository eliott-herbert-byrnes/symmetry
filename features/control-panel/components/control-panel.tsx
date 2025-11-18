"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Model } from "@/features/models/components/model-list";
import { useRouter } from "next/navigation";

export default function ControlPanel({
  model,
  models,
}: {
  model: Model | null;
  models: Model[];
}) {
  const router = useRouter();

  const handleModelChange = (modelId: string) => {
    router.push(`/?modelId=${modelId}`);
  };

  return (
    <Card>
      <CardContent className="h-full overflow-y-auto p-4">
        <Select value={model?.id} onValueChange={handleModelChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={model?.name || "Select a model"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {models.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 mt-4">
            {model && (
              <>
                <p className="text-sm font-semibold mt-2">Properties</p>
                <Separator className="my-2" />
                <p className="text-sm font-semibold">Name </p>
                <p className="text-muted-foreground text-sm">{model.name}</p>

                <p className="text-sm font-semibold">Formula </p>
                <p className="text-muted-foreground text-sm">{model.formula}</p>

                <p className="text-sm font-semibold">Molecular Weight </p>
                <p className="text-muted-foreground text-sm">
                  {model.molecular_weight}
                </p>

                <p className="text-sm font-semibold">Symmetry </p>
                <p className="text-muted-foreground text-sm">
                  {model.symmetry}
                </p>

                <p className="text-sm font-semibold">Space Group </p>
                <p className="text-muted-foreground text-sm">
                  {model.space_group}
                </p>

                <p className="text-sm font-semibold">Unit Cell </p>
                <p className="text-muted-foreground text-sm">
                  {model.unit_cell}
                </p>

                <p className="text-sm font-semibold">Unit Cell Angles </p>
                <p className="text-muted-foreground text-sm">
                  {model.unit_cell_angles}
                </p>

                <p className="text-sm font-semibold">Unit Cell Volume </p>
                <p className="text-muted-foreground text-sm">
                  {model.unit_cell_angles}
                </p>

                <p className="text-sm font-semibold">Description </p>
                <p className="text-muted-foreground text-sm">
                  {model.description}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
