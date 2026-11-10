export type DiscappProfile = {
  discord_user_id: string;
  display_name: string;
};

const discordUserIdPattern = /^\d{17,20}$/;

export function normalizeDisplayName(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const displayName = value
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, "")
    .trim()
    .slice(0, 80);

  return displayName || null;
}

export function parseDiscappProfile(value: unknown): DiscappProfile | null {
  if (!value || typeof value !== "object") return null;

  const profile = value as Record<string, unknown>;
  const displayName = normalizeDisplayName(profile.display_name);

  if (
    typeof profile.discord_user_id !== "string"
    || !discordUserIdPattern.test(profile.discord_user_id)
    || !displayName
  ) {
    return null;
  }

  return { discord_user_id: profile.discord_user_id, display_name: displayName };
}