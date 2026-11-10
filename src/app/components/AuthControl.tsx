"use client";

import { LoaderCircle, LogIn, LogOut, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createClient, signInWithDiscord, signOut } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { parseDiscappProfile, type DiscappProfile } from "@/lib/supabase/profile-validation";

type AuthStatus = "loading" | "signed-out" | "signed-in" | "unavailable";

export default function AuthControl() {
  const [status, setStatus] = useState<AuthStatus>(
    () => isSupabaseConfigured() ? "loading" : "unavailable",
  );
  const [profile, setProfile] = useState<DiscappProfile | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const accountMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeMenuOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !accountMenuRef.current?.contains(event.target)) {
        if (accountMenuRef.current) accountMenuRef.current.open = false;
      }
    }

    function closeMenuOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || !accountMenuRef.current?.open) return;
      accountMenuRef.current.open = false;
      accountMenuRef.current.querySelector("summary")?.focus();
    }

    document.addEventListener("pointerdown", closeMenuOnOutsideClick);
    document.addEventListener("keydown", closeMenuOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenuOnOutsideClick);
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = createClient();
    let active = true;
    let profileRequest = 0;

    async function loadProfile(userId: string | null) {
      const requestId = ++profileRequest;
      if (!userId) {
        if (active && requestId === profileRequest) {
          setProfile(null);
          setStatus("signed-out");
        }
        return;
      }

      const { data, error } = await supabase
        .from("discapp_profiles")
        .select("discord_user_id, display_name")
        .eq("user_id", userId)
        .maybeSingle();

      if (!active || requestId !== profileRequest) return;

      const nextProfile = error ? null : parseDiscappProfile(data);
      setProfile(nextProfile);
      setStatus("signed-in");
      setMessage(nextProfile ? "" : "Your profile is temporarily unavailable.");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        void loadProfile(session?.user.id ?? null);
      }, 0);
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setStatus("signed-out");
        setMessage("Could not check your sign-in status. Please try again.");
        return;
      }

      void loadProfile(data.session?.user.id ?? null);
    }).catch(() => {
      if (!active) return;
      setStatus("signed-out");
      setMessage("Could not check your sign-in status. Please try again.");
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignIn() {
    setBusy(true);
    setMessage("");
    try {
      const { error } = await signInWithDiscord();
      if (error) setMessage("Discord sign-in could not be started. Please try again.");
    } catch {
      setMessage("Discord sign-in is unavailable right now.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    setBusy(true);
    setMessage("");
    try {
      const { error } = await signOut();
      if (error) setMessage("You could not be signed out. Please try again.");
    } catch {
      setMessage("Sign-out is unavailable right now.");
    } finally {
      setBusy(false);
    }
  }

  if (status === "unavailable") {
    return (
      <div className="auth-control">
        <span className="auth-control-unavailable" role="status">
          <UserRound size={15} aria-hidden="true" />
          <span>Sign-in unavailable</span>
        </span>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="auth-control">
        <span className="auth-control-loading" role="status" aria-label="Checking sign-in status">
          <LoaderCircle size={18} aria-hidden="true" />
        </span>
      </div>
    );
  }

  return (
    <div className="auth-control" aria-busy={busy}>
      {status === "signed-in" ? (
        <details className="auth-control-menu" ref={accountMenuRef}>
          <summary className="auth-control-icon-button" aria-label="Account menu" title="Account">
            <UserRound size={18} aria-hidden="true" />
          </summary>
          <div className="auth-control-dropdown">
            <div className="auth-control-dropdown-profile">
              <span className="auth-control-label">Discord account</span>
              <span className="auth-control-name" title={profile?.display_name ?? "Signed in"}>
                {profile?.display_name ?? "Signed in"}
              </span>
            </div>
            <button
              className="auth-control-dropdown-action"
              type="button"
              onClick={handleSignOut}
              disabled={busy}
            >
              <LogOut size={15} aria-hidden="true" />
              <span>{busy ? "Signing out…" : "Sign out"}</span>
            </button>
          </div>
        </details>
      ) : (
        <button
          className="auth-control-button auth-control-button-primary"
          type="button"
          onClick={handleSignIn}
          disabled={busy}
        >
          <LogIn size={15} aria-hidden="true" />
          <span>{busy ? "Connecting…" : "Sign in"}</span>
        </button>
      )}
      {message && <span className="auth-control-message" role="alert">{message}</span>}
    </div>
  );
}