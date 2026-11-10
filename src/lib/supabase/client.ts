"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createClient() {
  const { url, publishableKey } = getSupabaseConfig();
  return createBrowserClient(url, publishableKey);
}

export async function signInWithDiscord() {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      scopes: "identify",
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  return createClient().auth.signOut();
}