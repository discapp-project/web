import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createVanityPreviewHtml } from "@/lib/vanity-links/preview";
import { normalizeVanitySlug, parseDiscordInviteCode } from "@/lib/vanity-links/validation";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

const metadataCrawlerPattern = /bot|crawler|spider|preview/i;

function notFound() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = normalizeVanitySlug(rawSlug);
  if (!slug) return notFound();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("resolve_discapp_vanity_link", {
      requested_slug: slug,
    });

    if (error) {
      return new NextResponse("Vanity links are temporarily unavailable.", {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const resolved = Array.isArray(data) ? data[0] : data;
    if (!resolved || typeof resolved !== "object") return notFound();

    const inviteCode = parseDiscordInviteCode(resolved.invite_code);
    if (
      !inviteCode
      || typeof resolved.title !== "string"
      || typeof resolved.description !== "string"
    ) {
      return notFound();
    }

    const inviteUrl = new URL(inviteCode, "https://discord.gg/");
    const userAgent = request.headers.get("user-agent") ?? "";
    const headers = {
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "Vary": "User-Agent",
      "X-Content-Type-Options": "nosniff",
    };

    if (metadataCrawlerPattern.test(userAgent)) {
      return new NextResponse(createVanityPreviewHtml({
        slug,
        inviteCode,
        title: resolved.title,
        description: resolved.description,
      }), {
        status: 200,
        headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const response = NextResponse.redirect(inviteUrl, 302);
    Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));
    return response;
  } catch {
    return new NextResponse("Vanity links are temporarily unavailable.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}