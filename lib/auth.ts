import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";

export const getProfile = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return null;
  }
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return {
    user: session.user,
    profile: profile,
  };
};

export interface Profile {
  user: User;
  profile: {
    id: string;
    role: string;
    full_name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

export const isAdmin = (profile: Profile) => {
  return profile.profile.role === "admin";
};

export const getAdminProfile = async (profileId: string) => {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .eq("role", "admin")
    .single();
  if (error) {
    console.error("Error fetching admin profile:", error);
    return null;
  }
  return profile;
};
