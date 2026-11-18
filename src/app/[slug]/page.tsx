import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { normalizeVanitySlug, parseDiscordInviteCode } from "@/lib/vanity-links/validation";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type VanityLink = {
  slug: string;
  inviteCode: string;
  title: string;
  description: string;
};

type VanityLinkResolution =
  | { kind: "found"; link: VanityLink }
  | { kind: "not-found" }
  | { kind: "unavailable" };

const metadataCrawlerPattern = /bot|crawler|spider|preview/i;

const resolveVanityLink = cache(async (rawSlug: string): Promise<VanityLinkResolution> => {
  const slug = normalizeVanitySlug(rawSlug);
  if (!slug) return { kind: "not-found" };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("resolve_discapp_vanity_link", {
      requested_slug: slug,
    });

    if (error) return { kind: "unavailable" };

    const resolved = Array.isArray(data) ? data[0] : data;
    if (
      !resolved
      || typeof resolved !== "object"
      || typeof resolved.title !== "string"
      || typeof resolved.description !== "string"
    ) {
      return { kind: "not-found" };
    }

    const inviteCode = parseDiscordInviteCode(resolved.invite_code);
    if (!inviteCode) return { kind: "not-found" };

    return {
      kind: "found",
      link: { slug, inviteCode, title: resolved.title, description: resolved.description },
    };
  } catch {
    return { kind: "unavailable" };
  }
});

export async function generateMetadata({ params }: RouteContext): Promise<Metadata> {
  const { slug } = await params;
  const resolution = await resolveVanityLink(slug);

  if (resolution.kind !== "found") {
    return { robots: { index: false, follow: false } };
  }

  const { link } = resolution;
  return {
    title: link.title,
    description: link.description,
    alternates: { canonical: `/${link.slug}` },
    openGraph: {
      title: link.title,
      description: link.description,
      url: `/${link.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: link.title,
      description: link.description,
    },
  };
}

export default async function VanityLinkPage({ params }: RouteContext) {
  const { slug } = await params;
  const resolution = await resolveVanityLink(slug);

  if (resolution.kind === "not-found") notFound();
  if (resolution.kind === "unavailable") {
    throw new Error("Vanity links are temporarily unavailable.");
  }

  const { link } = resolution;
  const userAgent = (await headers()).get("user-agent") ?? "";

  if (metadataCrawlerPattern.test(userAgent)) {
    const inviteUrl = `https://discord.gg/${link.inviteCode}`;
    return (
      <main>
        <p>Discord invite: <a href={inviteUrl}>{inviteUrl}</a></p>
      </main>
    );
  }

  redirect(`https://discord.gg/${link.inviteCode}`);
}