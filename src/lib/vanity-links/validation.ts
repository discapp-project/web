export const vanitySlugPattern = /^[a-z0-9](?:[a-z0-9_-]{1,30}[a-z0-9])$/;
export const discordInviteCodePattern = /^[A-Za-z0-9-]{2,32}$/;
export const maxVanityTitleLength = 80;
export const maxVanityDescriptionLength = 300;

const reservedVanitySlugs = new Set([
  "ansi-builder",
  "android-chrome-192x192",
  "android-chrome-512x512",
  "api",
  "apple-icon",
  "asset-compressor",
  "asset-resizer",
  "asset-stealer",
  "auth",
  "automod-library",
  "automod-permission-decoder",
  "automod-tester",
  "favicon",
  "font-generator",
  "gradient-finder",
  "icon",
  "manifest",
  "markdown-cheatsheet",
  "news",
  "not-found",
  "privacy",
  "regex-creator",
  "robots",
  "role-icon-maker",
  "rpc-builder",
  "server-lookup",
  "sitemap",
  "snowflake-decoder",
  "soundboard-studio",
  "space-generator",
  "terms-of-use",
  "timestamp-generator",
  "user-lookup",
  "vanity-checker",
  "vanity-url",
  "webhook-builder",
  "webhook-json-formatter",
]);

export type VanityLinkInput = {
  slug: string;
  inviteCode: string;
  title: string;
  description: string;
};

export type SavedVanityLink = VanityLinkInput;

export type VanityLinkValidation =
  | { ok: true; value: VanityLinkInput }
  | { ok: false; field: keyof VanityLinkInput; message: string };

export function isReservedVanitySlug(slug: string): boolean {
  return reservedVanitySlugs.has(slug);
}

export function normalizeVanitySlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const slug = value.normalize("NFKC").trim().toLowerCase();
  return vanitySlugPattern.test(slug) ? slug : null;
}

export function parseDiscordInviteCode(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 512) return null;
  const input = value.trim();
  if (discordInviteCodePattern.test(input)) return input;

  let url: URL;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    return null;
  }

  if (
    url.protocol !== "https:"
    || !["discord.gg", "www.discord.gg", "discord.com", "www.discord.com", "discordapp.com", "www.discordapp.com"].includes(url.hostname)
    || url.port
    || url.username
    || url.password
    || url.search
    || url.hash
  ) {
    return null;
  }

  const segments = url.pathname.split("/").filter(Boolean);
  const code = url.hostname.endsWith("discord.gg")
    ? segments.length === 1 ? segments[0] : null
    : segments.length === 2 && segments[0] === "invite" ? segments[1] : null;

  return code && discordInviteCodePattern.test(code) ? code : null;
}

function sanitizeMetadataText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const clean = value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.length <= maxLength ? clean : null;
}

export function validateVanityLinkInput(value: unknown): VanityLinkValidation {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, field: "slug", message: "Enter a valid vanity link." };
  }

  const input = value as Record<string, unknown>;
  const slug = normalizeVanitySlug(input.slug);
  if (!slug) {
    return { ok: false, field: "slug", message: "Use 3–32 lowercase letters, numbers, underscores, or hyphens. The first and last character must be a letter or number." };
  }

  if (isReservedVanitySlug(slug)) {
    return { ok: false, field: "slug", message: "That URL is reserved by the site." };
  }

  const inviteCode = parseDiscordInviteCode(input.invite);
  if (!inviteCode) {
    return { ok: false, field: "inviteCode", message: "Enter a valid Discord invite code or discord.gg link." };
  }

  const title = sanitizeMetadataText(input.title, maxVanityTitleLength);
  if (!title) {
    return { ok: false, field: "title", message: `Enter a title of 1–${maxVanityTitleLength} characters.` };
  }

  const description = sanitizeMetadataText(input.description, maxVanityDescriptionLength);
  if (description === null) {
    return { ok: false, field: "description", message: `Keep the description to ${maxVanityDescriptionLength} characters or fewer.` };
  }

  return {
    ok: true,
    value: { slug, inviteCode, title, description },
  };
}

export function parseSavedVanityLink(value: unknown): SavedVanityLink | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const validation = validateVanityLinkInput({
    slug: record.slug,
    invite: record.invite_code,
    title: record.title,
    description: record.description,
  });
  return validation.ok ? validation.value : null;
}

export function parseVanityLinkDraft(value: unknown): VanityLinkInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const validation = validateVanityLinkInput({
    slug: record.slug,
    invite: record.inviteCode,
    title: record.title,
    description: record.description,
  });
  return validation.ok ? validation.value : null;
}