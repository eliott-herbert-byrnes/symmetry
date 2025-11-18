import { supabase } from "@/lib/supabaseClient";
import { Suspense } from "react";
import { SkeletonList } from "@/components/skeleton-list";
import { Heading } from "@/components/heading";
import { Model, ModelList } from "@/features/models/components/model-list";
import { ThemeDebug } from "@/components/theme-debug";

type ModelPageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

const ModelsPage = async ({ searchParams }: ModelPageProps) => {

const params = await searchParams;
const search = params.search;
const page = params.page ? parseInt(params.page, 10) : 1;
const limit = 10;
const offset = (page - 1) * limit;

let query = supabase.from("models").select("*");

if (search) {
    query = query.ilike("name", `%${search}%`);
}

const { data: models} = await query.range(offset, offset + limit - 1);
return (
    <>
    <Heading
      title="Modelbase"
      description="View and manage models for this application"
    />
    <Suspense fallback={<SkeletonList />} key={search}>
      <ModelList 
        data={models ?? [] as Model[]} 
      />
    </Suspense>
  </>
)

};

export default ModelsPage;
