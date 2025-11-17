import ControlPanel from "@/features/control-panel/components/control-panel";
import ModelViewer from "@/features/modelViewer/components/model-viewer";

export const revalidate = 7200;

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-2">
      <div className="h-[400px] md:h-full md:col-span-10">
        <ModelViewer />
      </div>
      <div className="md:col-span-2 md:h-full">
        <ControlPanel />
      </div>
    </div>
  );
}
