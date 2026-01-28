import { createClient } from "@/lib/supabase/server";
import ControlPanel from "@/features/control-panel/components/control-panel";
import ModelViewer from "@/features/models/components/model-viewer";

type HomeProps = {
  searchParams: Promise<{
    modelId?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const modelId = params.modelId;

  let model = null;
  let modelUrl = null;

  if (modelId) {
    const { data } = await supabase
      .from("models")
      .select("*")
      .eq("id", modelId)
      .single();

    if (data) {
      model = data;

      let storagePath = data.storage_path;
      if (storagePath.startsWith("models/")) {
        storagePath = storagePath.replace("models/", "");
      }

      const { data: urlData } = supabase.storage
        .from("models")
        .getPublicUrl(storagePath);
      modelUrl = urlData.publicUrl;
    }
  }

  const { data: models } = await supabase.from("models").select("*");
  return (
    <div className="relative h-full w-full">
      {/* 3D Model Viewer - Full Screen */}
      <div className="absolute inset-0">
        <ModelViewer url={modelUrl || "/allene.pdb"} />
      </div>

      {/* Control Panel - Responsive Positioning */}
      <div className="absolute top-4 right-4 z-10 w-72 max-w-[calc(100vw-2rem)] hidden md:block">
        <ControlPanel model={model} models={models || []} />
      </div>

      {/* Mobile Control Panel (Floating Button + Sheet) - Handled in ControlPanel component */}
      <div className="md:hidden">
        <ControlPanel model={model} models={models || []} />
      </div>
    </div>
  );
}
