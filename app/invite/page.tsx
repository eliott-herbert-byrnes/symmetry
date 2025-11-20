import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/ui/spinner";
import { InvitationCreateButton } from "@/features/invite/components/invitation-create-button";
import { InvitationList } from "@/features/invite/components/invitation-list";
import { InvitationSearch } from "@/features/invite/components/invitation-search";
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
      <Suspense fallback={<Spinner />} key={`${search}-${page}`}>
        <InvitationList orgId={org.id} search={search} page={page} />
      </Suspense>
    </>
  );
};

export default InvitationPage;