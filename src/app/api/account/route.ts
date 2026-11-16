import { NextResponse, type NextRequest } from "next/server";
import { readLimitedBody, RequestBodyTooLargeError } from "@/app/api/read-limited-body";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const maxRequestBytes = 128;
const userIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const noStoreHeaders = { "Cache-Control": "no-store" };

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: noStoreHeaders });
}

function hasValidConfirmation(value: unknown): boolean {
  return value !== null
    && typeof value === "object"
    && !Array.isArray(value)
    && Object.keys(value).length === 1
    && "confirmation" in value
    && value.confirmation === "confirm";
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

export async function DELETE(request: NextRequest) {
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

  if (!hasValidConfirmation(body)) {
    return jsonResponse({ message: "Type confirm to delete your account." }, 400);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    const userId = data?.claims?.sub;
    if (error || typeof userId !== "string" || !userIdPattern.test(userId)) {
      return jsonResponse({ message: "Sign in to delete your account." }, 401);
    }

    const admin = createAdminClient();
    const { error: vanityError } = await admin
      .from("discapp_vanity_links")
      .delete()
      .eq("owner_user_id", userId);
    if (vanityError) {
      return jsonResponse({ message: "Could not delete your account data. Please try again." }, 503);
    }

    const { error: profileError } = await admin
      .from("discapp_profiles")
      .delete()
      .eq("user_id", userId);
    if (profileError) {
      return jsonResponse({ message: "Could not delete your account data. Please try again." }, 503);
    }

    const { error: deleteUserError } = await admin.auth.admin.deleteUser(userId);
    if (deleteUserError) {
      return jsonResponse({ message: "Your saved data was deleted, but the account could not be removed. Please try again." }, 503);
    }

    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse({ message: "Account deletion is temporarily unavailable." }, 503);
  }
}