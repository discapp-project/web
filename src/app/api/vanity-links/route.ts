import { NextResponse, type NextRequest } from "next/server";
import { readLimitedBody, RequestBodyTooLargeError } from "@/app/api/read-limited-body";
import { createClient } from "@/lib/supabase/server";
import { validateVanityLinkInput } from "@/lib/vanity-links/validation";

export const dynamic = "force-dynamic";

const maxRequestBytes = 4096;
const userIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const linkColumns = "slug, invite_code, title, description";
const noStoreHeaders = { "Cache-Control": "no-store" };

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: noStoreHeaders });
}

function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim()
    ?? request.headers.get("host")?.trim();
  if (!origin || !host) return false;

  try {
    const parsedOrigin = new URL(origin);
    return ["http:", "https:"].includes(parsedOrigin.protocol)
      && parsedOrigin.host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

async function getOwnerUserId() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || typeof userId !== "string" || !userIdPattern.test(userId)) {
    return { supabase, userId: null };
  }

  return { supabase, userId };
}

export async function GET() {
  try {
    const { supabase, userId } = await getOwnerUserId();
    if (!userId) return jsonResponse({ message: "Sign in to manage a vanity link." }, 401);

    const { data, error } = await supabase
      .from("discapp_vanity_links")
      .select(linkColumns)
      .eq("owner_user_id", userId)
      .maybeSingle();

    if (error) return jsonResponse({ message: "Could not load your vanity link." }, 503);
    return jsonResponse({ link: data });
  } catch {
    return jsonResponse({ message: "Vanity links are temporarily unavailable." }, 503);
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ message: "Invalid request origin." }, 403);
  }

  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return jsonResponse({ message: "Content-Type must be application/json." }, 415);
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && /^\d+$/.test(contentLength) && Number(contentLength) > maxRequestBytes) {
    return jsonResponse({ message: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(await readLimitedBody(request, maxRequestBytes));
  } catch (error) {
    const tooLarge = error instanceof RequestBodyTooLargeError;
    return jsonResponse(
      { message: tooLarge ? "Request is too large." : "Invalid request payload." },
      tooLarge ? 413 : 400,
    );
  }

  const validation = validateVanityLinkInput(body);
  if (!validation.ok) {
    return jsonResponse({ message: validation.message, field: validation.field }, 400);
  }

  try {
    const { supabase, userId } = await getOwnerUserId();
    if (!userId) return jsonResponse({ message: "Sign in to save a vanity link." }, 401);

    const { data, error } = await supabase
      .from("discapp_vanity_links")
      .upsert({
        owner_user_id: userId,
        slug: validation.value.slug,
        invite_code: validation.value.inviteCode,
        title: validation.value.title,
        description: validation.value.description,
      }, { onConflict: "owner_user_id" })
      .select(linkColumns)
      .single();

    if (error?.code === "23505") {
      return jsonResponse({ message: "That vanity URL is already claimed." }, 409);
    }
    if (error?.code === "23514") {
      return jsonResponse({ message: "One or more values are invalid." }, 400);
    }
    if (error || !data) {
      return jsonResponse({ message: "Could not save your vanity link." }, 503);
    }

    return jsonResponse({ link: data });
  } catch {
    return jsonResponse({ message: "Vanity links are temporarily unavailable." }, 503);
  }
}

export async function DELETE(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ message: "Invalid request origin." }, 403);
  }

  try {
    const { supabase, userId } = await getOwnerUserId();
    if (!userId) return jsonResponse({ message: "Sign in to remove a vanity link." }, 401);

    const { data, error } = await supabase
      .from("discapp_vanity_links")
      .delete()
      .eq("owner_user_id", userId)
      .select("slug")
      .maybeSingle();

    if (error) return jsonResponse({ message: "Could not remove your vanity link." }, 503);
    if (!data) return jsonResponse({ message: "No vanity link is registered." }, 404);
    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse({ message: "Vanity links are temporarily unavailable." }, 503);
  }
}