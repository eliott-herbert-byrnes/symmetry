"use server";

import { createActionClient } from "@/lib/supabase/server";

export async function requestDemo() {
  const supabase = await createActionClient();
  const email = "demo@symmetryudn.com";
  const password = process.env.SUPABASE_DEMO_PASSWORD as string;

  if (!password) {
    return {
      ok: false,
      message: "Demo password is not set",
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      }

      return {
        ok: true,
        code: true,
        user: data.user,
        profile: profile,
      };
    }

    return {
      ok: false,
      message: "Authentication failed",
    };
  } catch (error) {
    console.error("Error authenticating:", error);
    return {
      ok: false,
      message: "Authentication failed",
    };
  }
}
