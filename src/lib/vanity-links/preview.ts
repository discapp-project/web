export type VanityPreview = {
  slug: string;
  inviteCode: string;
  title: string;
  description: string;
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&#39;";
    }
  });
}

export function createVanityPreviewHtml(link: VanityPreview): string {
  const title = escapeHtml(link.title);
  const description = escapeHtml(link.description);
  const canonicalUrl = escapeHtml(`https://discapp.org/${link.slug}`);
  const inviteUrl = escapeHtml(`https://discord.gg/${link.inviteCode}`);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
</head>
<body>
  <p>Discord invite: <a href="${inviteUrl}">${inviteUrl}</a></p>
</body>
</html>`;
}