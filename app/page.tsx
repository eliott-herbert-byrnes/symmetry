import ControlPanel from "@/features/control-panel/components/control-panel";
import ModelViewer from "@/features/models/components/model-viewer";

export const revalidate = 7200;

export default function Home() {
  return (
    <div className="relative h-full w-full">
      {/* ModelViewer takes full space */}
      <div className="absolute inset-0 z-0">
        <ModelViewer />
      </div>

      {/* ControlPanel overlays on top */}
      <div className="absolute top-4 right-4 z-10 w-60 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <ControlPanel />
      </div>
    </div>
  );
}
