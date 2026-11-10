import "server-only";
import { createClient } from "./server";
import { parseDiscappProfile, type DiscappProfile } from "./profile-validation";

export async function getCurrentProfile(): Promise<DiscappProfile | null> {
  const supabase = await createClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;

  if (claimsError || typeof userId !== "string") return null;

  const { data, error } = await supabase
    .from("discapp_profiles")
    .select("discord_user_id, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error("Could not load the signed-in profile.");
  return parseDiscappProfile(data);
}