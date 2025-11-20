import { Suspense } from "react";
import { SkeletonList } from "@/components/skeleton-list";
import { Heading } from "@/components/heading";
import { getProfile, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signInPath } from "../paths";
import { UserList, UserProfile } from "@/features/users/components/user-list";
import { createClient } from "@/lib/supabase/server";

type UsersPageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const profile = await getProfile();
  if (!profile) {
    redirect(signInPath());
  }

  const isAdminUser = isAdmin(profile);

  const params = await searchParams;
  const search = params.search;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const supabase = await createClient();
  let query = supabase.from("users_with_auth").select("*");

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data: users, error } = await query
  .order("created_at", { ascending: false })
  .range(offset, offset + limit - 1);

  if (error) {
    console.log(error);
  }

  return (
    <>
      <Heading
        title="Users"
        description="View and manage models for this application"
      />
      <Suspense fallback={<SkeletonList />} key={search}>
        <UserList data={users ?? ([] as UserProfile[])} isAdmin={isAdminUser} />
      </Suspense>
    </>
  );
};

export default UsersPage;
