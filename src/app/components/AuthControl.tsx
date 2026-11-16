"use client";

import { LoaderCircle, LogIn, LogOut, Trash2, UserRound } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
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
  const [confirmation, setConfirmation] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const accountMenuRef = useRef<HTMLDetailsElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

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

  function openDeleteDialog() {
    setConfirmation("");
    setDeleteMessage("");
    if (accountMenuRef.current) accountMenuRef.current.open = false;
    deleteDialogRef.current?.showModal();
  }

  function closeDeleteDialog() {
    if (busy) return;
    deleteDialogRef.current?.close();
  }

  async function handleDeleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmation !== "confirm" || busy) return;

    setBusy(true);
    setDeleteMessage("");
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
      });

      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const serverMessage = result && typeof result === "object" && "message" in result
          && typeof result.message === "string" ? result.message : null;
        setDeleteMessage(serverMessage ?? "Your account could not be deleted. Please try again.");
        return;
      }

      deleteDialogRef.current?.close();
      setProfile(null);
      setStatus("signed-out");
      setMessage("");
      try {
        await signOut();
      } catch {
      }
    } catch {
      setDeleteMessage("Your account could not be deleted. Please check your connection and try again.");
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
            <button
              className="auth-control-dropdown-action auth-control-dropdown-danger"
              type="button"
              onClick={openDeleteDialog}
              disabled={busy}
            >
              <Trash2 size={15} aria-hidden="true" />
              <span>Delete account</span>
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
      <dialog
        className="account-delete-dialog"
        ref={deleteDialogRef}
        aria-labelledby="account-delete-title"
        onClose={() => setConfirmation("")}
      >
        <h2 id="account-delete-title">Delete your account?</h2>
        <p>
          This will delete your account and all associated data.  Bug reports details are kept to continue fixing issues. We cannot recover any of your data after deletion.
        </p>
        <form className="account-delete-form" onSubmit={handleDeleteAccount}>
          <label className="account-delete-field">
            <span>Type <strong>confirm</strong> to continue</span>
            <input
              autoFocus
              autoComplete="off"
              spellCheck={false}
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              disabled={busy}
            />
          </label>
          {deleteMessage && <p className="account-delete-error" role="alert">{deleteMessage}</p>}
          <div className="account-delete-actions">
            <button className="account-delete-cancel" type="button" onClick={closeDeleteDialog} disabled={busy}>
              Cancel
            </button>
            <button className="account-delete-submit" type="submit" disabled={busy || confirmation !== "confirm"}>
              {busy ? "Deleting…" : "Delete account"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}