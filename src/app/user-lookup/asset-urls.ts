const discordCdn = "https://cdn.discordapp.com";
const discordIdPattern = /^\d{17,20}$/;
const assetHashPattern = /^[A-Za-z0-9_-]{1,128}$/;
const nameplatePathPattern = /^[A-Za-z0-9/_-]{1,200}$/;

export function getAvatarUrl(id: string, hash: string | null) {
  if (!discordIdPattern.test(id)) return `${discordCdn}/embed/avatars/0.png`;
  if (!hash) return `${discordCdn}/embed/avatars/0.png`;
  if (!assetHashPattern.test(hash)) return `${discordCdn}/embed/avatars/0.png`;

  const extension = hash.startsWith("a_") ? "gif" : "png";
  return `${discordCdn}/avatars/${id}/${hash}.${extension}?size=1024`;
}

export function getBannerUrl(id: string, hash: string | null) {
  if (!discordIdPattern.test(id) || !hash || !assetHashPattern.test(hash)) return null;

  const extension = hash.startsWith("a_") ? "gif" : "png";
  return `${discordCdn}/banners/${id}/${hash}.${extension}?size=1024`;
}

export function getClanBadgeUrl(guildId?: string, badgeHash?: string) {
  if (!guildId || !discordIdPattern.test(guildId) || !badgeHash || !assetHashPattern.test(badgeHash)) return null;
  return `${discordCdn}/clan-badges/${guildId}/${badgeHash}.png`;
}

export function getAvatarDecorationUrl(asset?: string) {
  if (!asset || !assetHashPattern.test(asset)) return null;
  return `${discordCdn}/avatar-decoration-presets/${asset}.png`;
}

export function getNameplateUrl(assetPath?: string) {
  if (!assetPath || assetPath.length > 256) return null;

  const prefix = `${discordCdn}/assets/`;
  const relativePath = assetPath.startsWith(prefix)
    ? assetPath.slice(prefix.length)
    : assetPath;
  const path = relativePath.replace(/\/$/, "");

  if (
    !path
    || path.includes("..")
    || !nameplatePathPattern.test(path)
    || /^https?:/i.test(path)
    || path.startsWith("/")
  ) {
    return null;
  }

  return `${prefix}${path}/asset.png`;
}
