"use client";

import { Copy, ExternalLink, Link2, LoaderCircle, LogIn, Save, Trash2 } from "lucide-react";
import { startTransition, useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { createClient, signInWithDiscord } from "@/lib/supabase/client";
import {
  maxVanityDescriptionLength,
  maxVanityTitleLength,
  normalizeVanitySlug,
  parseSavedVanityLink,
  parseVanityLinkDraft,
  validateVanityLinkInput,
  type SavedVanityLink,
  type VanityLinkInput,
} from "@/lib/vanity-links/validation";

const vanityDraftStorageKey = "discapp-vanity-link-draft";
const emptyDraft: VanityLinkInput = { slug: "", inviteCode: "", title: "", description: "" };

function valueFromRecord(value: unknown, key: string): unknown {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  return (value as Record<string, unknown>)[key];
}

function messageFromResponse(value: unknown): string | null {
  const message = valueFromRecord(value, "message");
  return typeof message === "string" ? message : null;
}

function subscribeToOrigin() {
  return () => {};
}

function getBrowserOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "https://discapp.org";
}

export default function VanityLinkManager() {
  const [form, setForm] = useState<VanityLinkInput>(emptyDraft);
  const [link, setLink] = useState<SavedVanityLink | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const siteOrigin = useSyncExternalStore(subscribeToOrigin, getBrowserOrigin, getServerOrigin);

  useEffect(() => {
    let savedDraft: unknown;
    try {
      const storedValue = window.sessionStorage.getItem(vanityDraftStorageKey);
      if (storedValue) savedDraft = JSON.parse(storedValue);
    } catch {
      window.sessionStorage.removeItem(vanityDraftStorageKey);
    }

    const restored = parseVanityLinkDraft(savedDraft);
    if (restored) startTransition(() => setForm(restored));
  }, []);

  const normalizedSlug = normalizeVanitySlug(form.slug);
  const previewUrl = normalizedSlug ? `${siteOrigin}/${normalizedSlug}` : null;

  function updateField<K extends keyof VanityLinkInput>(field: K, value: VanityLinkInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function setStatus(nextMessage: string, error: boolean) {
    setMessage(nextMessage);
    setIsError(error);
  }

  async function handleSignIn() {
    setBusy(true);
    setStatus("", false);
    try {
      const { error } = await signInWithDiscord("/vanity-url");
      if (error) setStatus("Discord sign-in could not be started. Please try again.", true);
    } catch {
      setStatus("Discord sign-in is unavailable right now.", true);
    } finally {
      setBusy(false);
    }
  }

  async function loadExistingLink(): Promise<"loaded" | "empty" | "error"> {
    const response = await fetch("/api/vanity-links", { cache: "no-store" });
    const body: unknown = await response.json();
    if (!response.ok) {
      setStatus(messageFromResponse(body) ?? "Could not check your existing link.", true);
      return "error";
    }

    const existing = parseSavedVanityLink(valueFromRecord(body, "link"));
    if (!existing) return "empty";

    setLink(existing);
    setForm(existing);
    setStatus("You already have a link claimed! Review it, then save changes to replace it.", false);
    return "loaded";
  }

  async function handleClaim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("", false);

    const validation = validateVanityLinkInput({
      slug: form.slug,
      invite: form.inviteCode,
      title: form.title,
      description: form.description,
    });
    if (!validation.ok) {
      setStatus(validation.message, true);
      return;
    }

    setBusy(true);
    try {
      const supabase = createClient();
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setStatus("Could not verify sign-in. Please try again.", true);
        return;
      }

      if (!sessionData.session) {
        try {
          window.sessionStorage.setItem(vanityDraftStorageKey, JSON.stringify(validation.value));
        } catch {
          setStatus("Please try again after signing in.", true);
          return;
        }
        setNeedsSignIn(true);
        setStatus("Sign in before claiming your link!", false);
        return;
      }

      if (!link) {
        const existingLink = await loadExistingLink();
        if (existingLink !== "empty") return;
      }

      const response = await fetch("/api/vanity-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: validation.value.slug,
          invite: validation.value.inviteCode,
          title: validation.value.title,
          description: validation.value.description,
        }),
      });
      const body: unknown = await response.json();
      if (!response.ok) {
        setStatus(messageFromResponse(body) ?? "Could not save your vanity link.", true);
        return;
      }

      const savedLink = parseSavedVanityLink(valueFromRecord(body, "link"));
      if (!savedLink) {
        setStatus("The saved link could not be verified. Reload and try again.", true);
        return;
      }

      window.sessionStorage.removeItem(vanityDraftStorageKey);
      setLink(savedLink);
      setForm(savedLink);
      setNeedsSignIn(false);
      setStatus(link ? "Changes saved." : "Vanity link claimed.", false);
    } catch {
      setStatus("Could not save your vanity link. Please try again.", true);
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove() {
    if (!window.confirm("Remove this vanity link? The URL will become available for someone else to claim.")) return;

    setBusy(true);
    setStatus("", false);
    try {
      const response = await fetch("/api/vanity-links", { method: "DELETE" });
      const body: unknown = await response.json();
      if (!response.ok) {
        setStatus(messageFromResponse(body) ?? "Could not remove your vanity link.", true);
        return;
      }

      window.sessionStorage.removeItem(vanityDraftStorageKey);
      setLink(null);
      setForm(emptyDraft);
      setStatus("Vanity link removed.", false);
    } catch {
      setStatus("Could not remove your vanity link. Please try again.", true);
    } finally {
      setBusy(false);
    }
  }

  async function handleCopyLink() {
    if (!previewUrl) return;
    try {
      await navigator.clipboard.writeText(previewUrl);
      setStatus("Link copied.", false);
    } catch {
      setStatus("Could not copy the link. Select and copy it instead.", true);
    }
  }

  return (
    <main className="tool-page vanity-manager-page">
      <header className="tool-page-heading">
        <h1>Custom Vanity Link</h1>
        <p>Create a custom vanity link for a Discord invite.</p>
      </header>

      <section className="tool-panel vanity-manager-panel" aria-label="Manage your vanity link">
        <form className="vanity-manager-form" onSubmit={handleClaim}>
          <div className="vanity-manager-columns">
            <div className="vanity-manager-primary-fields">
              <label className="tool-field" htmlFor="vanity-slug">
                Vanity URL
                <span className="vanity-manager-input-prefix">
                  <span>{siteOrigin.replace(/^https?:\/\//, "")}/</span>
                  <input
                    id="vanity-slug"
                    className="tool-input"
                    value={form.slug}
                    onChange={(event) => updateField("slug", event.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32))}
                    minLength={3}
                    maxLength={32}
                    pattern="[a-z0-9](?:[a-z0-9_]|-){1,30}[a-z0-9]"
                    placeholder="my_discord"
                    autoComplete="off"
                    required
                  />
                </span>
                <span className="vanity-manager-hint">3–32 lowercase letters, numbers, underscores, or hyphens.</span>
              </label>
              <label className="tool-field" htmlFor="vanity-invite">
                Discord invite
                <input
                  id="vanity-invite"
                  className="tool-input"
                  value={form.inviteCode}
                  onChange={(event) => updateField("inviteCode", event.target.value)}
                  maxLength={512}
                  placeholder="discord.gg/invite-code"
                  autoComplete="url"
                  required
                />
              </label>
              {previewUrl && (
                <div className="vanity-manager-preview">
                  <span className="vanity-manager-preview-label">Your link</span>
                  <div className="vanity-manager-preview-row">
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                      <Link2 size={15} aria-hidden="true" />
                      <span>{previewUrl.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                    {link && (
                      <button className="vanity-manager-copy" type="button" onClick={handleCopyLink} aria-label="Copy vanity link" title="Copy link">
                        <Copy size={15} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  {link && <p className="vanity-manager-target">Redirects to discord.gg/{link.inviteCode}</p>}
                </div>
              )}
            </div>

            <div className="vanity-manager-metadata-fields">
              <label className="tool-field" htmlFor="vanity-title">
                Link title
                <input
                  id="vanity-title"
                  className="tool-input"
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  maxLength={maxVanityTitleLength}
                  autoComplete="off"
                  required
                />
                <span className="vanity-manager-count">{form.title.length}/{maxVanityTitleLength}</span>
              </label>
              <label className="tool-field" htmlFor="vanity-description">
                Link description
                <textarea
                  id="vanity-description"
                  className="tool-input vanity-manager-description"
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  maxLength={maxVanityDescriptionLength}
                  rows={5}
                />
                <span className="vanity-manager-count">{form.description.length}/{maxVanityDescriptionLength}</span>
              </label>
            </div>
          </div>

          {needsSignIn && (
            <div className="vanity-manager-auth-prompt" role="group" aria-label="Sign in to claim your link">
              <p>Sign in with Discord to claim this link!</p>
              <button className="tool-button tool-button-secondary" type="button" onClick={handleSignIn} disabled={busy}>
                <LogIn size={15} aria-hidden="true" />
                <span>{busy ? "Connecting…" : "Sign in"}</span>
              </button>
            </div>
          )}

          <div className="vanity-manager-actions">
            <button className="tool-button tool-button-primary" type="submit" disabled={busy}>
              {busy && <LoaderCircle className="vanity-manager-button-spinner" size={15} aria-hidden="true" />}
              <Save size={15} aria-hidden="true" />
              <span>{busy ? "Checking…" : link ? "Save changes" : "Claim link"}</span>
            </button>
            {link && (
              <button className="tool-button tool-button-secondary vanity-manager-remove" type="button" onClick={handleRemove} disabled={busy}>
                <Trash2 size={15} aria-hidden="true" />
                <span>Remove link</span>
              </button>
            )}
          </div>
        </form>

        {message && (
          <p className={`vanity-manager-message${isError ? " is-error" : ""}`} role={isError ? "alert" : "status"}>
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
