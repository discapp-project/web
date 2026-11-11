"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createClient() {
  const { url, publishableKey } = getSupabaseConfig();
  return createBrowserClient(url, publishableKey);
}

export async function signInWithDiscord(returnPath?: string) {
  const supabase = createClient();
  const safeReturnPath = typeof returnPath === "string"
    && returnPath.startsWith("/")
    && !returnPath.startsWith("//")
    && !returnPath.includes("\\")
    && !/[\u0000-\u001f\u007f]/.test(returnPath)
    ? returnPath
    : null;
  const callbackUrl = new URL("/auth/callback", window.location.origin);
  if (safeReturnPath) callbackUrl.searchParams.set("next", safeReturnPath);

  return supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      scopes: "identify",
      redirectTo: callbackUrl.toString(),
    },
  });
}

export async function signOut() {
  return createClient().auth.signOut();
}