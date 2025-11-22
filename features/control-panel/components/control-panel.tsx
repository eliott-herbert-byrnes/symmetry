"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Model } from "@/features/models/components/model-list";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InfoIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

type ControlPanelProps = {
  model: Model | null;
  models: Model[];
};

function ModelProperties({ model }: { model: Model | null }) {
  if (!model) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Select a model to view properties
        </p>
      </div>
    );
  }

  const properties = [
    { label: "Name", value: model.name },
    { label: "Formula", value: model.formula },
    { label: "Molecular Weight", value: model.molecular_weight },
    { label: "Symmetry", value: model.symmetry },
    { label: "Space Group", value: model.space_group },
    { label: "Unit Cell", value: model.unit_cell },
    { label: "Unit Cell Angles", value: model.unit_cell_angles },
    { label: "Description", value: model.description },
  ];

  return (
    <div className="flex flex-col gap-3 p-1">
      {properties
        .filter((prop) => prop.value)
        .map((prop, index) => (
          <div key={index}>
            <p className="text-sm font-semibold">{prop.label}</p>
            <p className="text-muted-foreground text-sm break-words">
              {prop.value}
            </p>
          </div>
        ))}
    </div>
  );
}

export default function ControlPanel({ model, models }: ControlPanelProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleModelChange = (modelId: string) => {
    const newModel = models.find((m) => m.id === modelId);
    router.push(`/?modelId=${modelId}`);
    if (newModel) {
      toast.success(`Model changed to ${newModel.name}`);
    }
  };

  return (
    <>
      {/* Mobile: Sheet (Bottom Drawer) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon-lg"
              className="fixed bottom-4 right-4 z-20 rounded-full shadow-lg h-12 w-12 p-0 bg-secondary text-secondary-foreground"
            >
              <InfoIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <SheetHeader>
              <SheetTitle>Model Properties</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="overflow-y-auto h-[calc(85vh-5rem)] p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block px-1">
                    Select Model
                  </label>
                  <Select value={model?.id} onValueChange={handleModelChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a model" />
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
                </div>

                <Separator />

                <ModelProperties model={model} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Collapsible Card */}
      <div className="hidden md:block">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Model Properties</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 pb-0"
              >
                {isCollapsed ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronUpIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>

          {!isCollapsed && (
            <CardContent className="max-h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="space-y-4">
                <Select value={model?.id} onValueChange={handleModelChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a model" />
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

                <Separator className="my-2" />

                <ModelProperties model={model} />
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}
