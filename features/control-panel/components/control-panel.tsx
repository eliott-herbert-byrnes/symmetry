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

export default function ControlPanel() {
  return (
    <Card>
      <CardContent className="h-full overflow-y-auto p-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Allene" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              <SelectItem value="allene">Allene</SelectItem>
              <SelectItem value="ammonia">Ammonia</SelectItem>
              <SelectItem value="borane">Borane</SelectItem>
              <SelectItem value="boric-acid">Boric Acid</SelectItem>
              <SelectItem value="diamond">Diamond</SelectItem>
              <SelectItem value="diazene">Diazene</SelectItem>
              <SelectItem value="graphite">Graphite</SelectItem>
              <SelectItem value="hydrazine">Hydrazine</SelectItem>
              <SelectItem value="methane">Methane</SelectItem>
              <SelectItem value="sulfur-hexafluoride">
                Sulfur Hexafluoride
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-2">
          {/* <Separator className="mt-6" /> */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm font-semibold">Properties</p>
            <Separator className="my-2" />

            <p className="text-sm font-semibold">Name </p>
            <p className="text-muted-foreground text-sm">Diazene</p>

            <p className="text-sm font-semibold">Formula </p>
            <p className="text-muted-foreground text-sm">H2N2</p>

            <p className="text-sm font-semibold">Molecular Weight </p>
            <p className="text-muted-foreground text-sm">30.01</p>

            <p className="text-sm font-semibold">Symmetry </p>
            <p className="text-muted-foreground text-sm">D2h</p>

            <p className="text-sm font-semibold">Space Group </p>
            <p className="text-muted-foreground text-sm">P212121</p>

            <p className="text-sm font-semibold">Unit Cell </p>
            <p className="text-muted-foreground text-sm">10.00 10.00 10.00</p>

            <p className="text-sm font-semibold">Unit Cell Angles </p>
            <p className="text-muted-foreground text-sm">90.00 90.00 90.00</p>

            <p className="text-sm font-semibold">Unit Cell Volume </p>
            <p className="text-muted-foreground text-sm">1000.00</p>

            <p className="text-sm font-semibold">Description </p>
            <p className="text-muted-foreground text-sm">
              Diimide must be generated in situ. It is an effective reagent for
              the syn-reduction of alkenes and favors reduction of the more
              substituted olefin.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
