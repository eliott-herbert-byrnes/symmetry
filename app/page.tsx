import { supabase } from "@/lib/supabase/client";
import ControlPanel from "@/features/control-panel/components/control-panel";
import ModelViewer from "@/features/models/components/model-viewer";

type HomeProps = {
  searchParams: Promise<{
    modelId?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
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
      <div className="absolute inset-0 z-0">
        <ModelViewer url={modelUrl || "/allene.pdb"} />
      </div>

      <div className="absolute top-4 right-4 z-10 w-60 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <ControlPanel model={model} models={models || []} />
      </div>
    </div>
  );
}
