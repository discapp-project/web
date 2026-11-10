import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const requestedPath = request.nextUrl.searchParams.get("next");
  const path = requestedPath?.startsWith("/")
    && !requestedPath.startsWith("//")
    && !requestedPath.includes("\\")
    ? requestedPath
    : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(path, request.url));
  }

  return NextResponse.redirect(new URL("/?auth=error", request.url));
}