export function normalizeDiscordInvite(input: string): string | null {
  const value = input.trim();
  if (!value) return null;

  const candidate = value.includes("://")
    ? value
    : value.includes(".")
      ? `https://${value}`
      : `https://discord.gg/${value}`;

  try {
    const url = new URL(candidate);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    let code: string | undefined;

    if (hostname === "discord.gg") {
      code = url.pathname.split("/").filter(Boolean)[0];
    } else if (hostname === "discord.com" || hostname === "discordapp.com") {
      const path = url.pathname.split("/").filter(Boolean);
      if (path[0] === "invite") code = path[1];
    }

    if (!code || !/^[a-zA-Z0-9_-]{2,64}$/.test(code)) return null;
    return `https://discord.gg/${code}`;
  } catch {
    return null;
  }
}
