import { Heading } from "@/components/heading";
import { SkeletonList } from "@/components/skeleton-list";
import { InvitationCreateButton } from "@/features/invite/components/invite-create-button";
import { InvitationList } from "@/features/invite/components/invite-list";
import { InvitationSearch } from "@/features/invite/components/invite-search";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

type InvitationPageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

const InvitationPage = async ({ searchParams }: InvitationPageProps) => {
  const params = await searchParams;
  const search = params.search;
  const page = params.page ? parseInt(params.page, 10) : 1;

  const supabase = await createClient();
  const { data: invitations, error } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching invitations:", error);
  }

  return (
    <>
      <Heading
        title="Invitations"
        description="Invite your team members to join the application"
        actions={<InvitationCreateButton />}
      />
      <div className="px-1 mb-4">
        <InvitationSearch />
      </div>
      <Suspense fallback={<SkeletonList />} key={`${search}-${page}`}>
        <InvitationList invitations={invitations || []} search={search} page={page} />
      </Suspense>
    </>
  );
};

export default InvitationPage;
