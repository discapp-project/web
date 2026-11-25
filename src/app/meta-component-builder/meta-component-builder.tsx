"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Plus, Trash2 } from "lucide-react";

const httpUrlPattern = /^https?:\/\/[^\s]+$/i;

type ImagePosition = "top" | "middle" | "bottom";
type GalleryItem = { id: string; url: string; position: ImagePosition };
type ButtonItem = { id: string; label: string; url: string; emojiName: string; emojiId: string; animated: boolean };

function makeId() { return crypto.randomUUID(); }

const emojiPattern = /<(a?):([A-Za-z0-9_]{2,32}):(\d{17,20})>/;
const animCache: Record<string, boolean> = {};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] ?? character));
}

export default function ComponentEmbedBuilder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [accentColor, setAccentColor] = useState("#2b2d31");
  const [themeColor, setThemeColor] = useState("#2b2d31");
  const [redirectEnabled, setRedirectEnabled] = useState(false);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [extraText, setExtraText] = useState("");
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [buttons, setButtons] = useState<ButtonItem[]>([]);
  const [showSeparator, setShowSeparator] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewView, setPreviewView] = useState<"discord" | "fallback">("discord");

  const cleanTitle = title.trim();
  const cleanDescription = description.trim();
  const cleanOgImage = ogImage.trim();
  const cleanThumbnail = thumbnailUrl.trim();
  const cleanExtraText = extraText.trim();
  const ogImageError = Boolean(cleanOgImage && !httpUrlPattern.test(cleanOgImage));
  const thumbnailError = Boolean(cleanThumbnail && !httpUrlPattern.test(cleanThumbnail));

  const validGallery = gallery
    .map((item) => ({ ...item, url: item.url.trim() }))
    .filter((item) => item.url.length <= 2048 && /^https?:\/\/[^\s?#]+\.(?:png|jpe?g|gif|webp|avif)(?:[?#]\S*)?$/i.test(item.url))
    .slice(0, 4);

  const validButtons = buttons
    .map((button) => {
      const label = button.label.trim().slice(0, 80);
      const url = button.url.trim();
      if (!url || !httpUrlPattern.test(url) || url.length > 512 || (!label && !button.emojiId)) return null;
      const emoji = /^\d{17,20}$/.test(button.emojiId.trim()) && /^[A-Za-z0-9_]{2,32}$/.test(button.emojiName.trim())
        ? { id: button.emojiId.trim(), name: button.emojiName.trim(), ...(button.animated ? { animated: true } : {}) }
        : undefined;
      return { type: 2, style: 5, url, ...(label ? { label } : {}), ...(emoji ? { emoji } : {}) };
    })
    .filter((button) => button !== null)
    .slice(0, 5);

  const componentPayload = useMemo(() => {
    const components: Record<string, unknown>[] = [];
    const getGallery = (position: ImagePosition) => {
      const items = validGallery.filter((item) => item.position === position).map((item) => ({ media: { url: item.url } }));
      return items.length ? [{ type: 12, items }] : [];
    };

    components.push(...getGallery("top"));

    const textContent = [cleanTitle, cleanDescription].filter(Boolean).join("\n");
    if (textContent) {
      const text = { type: 10, content: cleanTitle && cleanDescription ? `# ${cleanTitle}\n${cleanDescription}` : cleanTitle ? `# ${cleanTitle}` : cleanDescription };
      if (cleanThumbnail && !thumbnailError) {
        components.push({ type: 9, components: [text], accessory: { type: 11, media: { url: cleanThumbnail } } });
      } else {
        components.push(text);
      }
    }

    components.push(...getGallery("middle"));
    if (cleanExtraText) components.push({ type: 10, content: cleanExtraText });
    components.push(...getGallery("bottom"));

    if (showSeparator) components.push({ type: 14, divider: true, spacing: 1 });
    if (validButtons.length) components.push({ type: 1, components: validButtons });

    return {
      component: {
        type: 17,
        accent_color: Number.parseInt(accentColor.slice(1), 16),
        components,
      },
    };
  }, [accentColor, cleanDescription, cleanExtraText, cleanThumbnail, cleanTitle, showSeparator, validButtons, validGallery, thumbnailError]);

  const html = useMemo(() => {
    const scriptJson = JSON.stringify(componentPayload, null, 2).replace(/<\//g, "<\\/");
    const fallbackTitle = cleanTitle || "Embed";
    const firstButton = validButtons[0] as { url?: string } | undefined;
    const lines = [
      "<!DOCTYPE html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `<title>${escapeHtml(fallbackTitle)}</title>`,
      `<meta property="og:title" content="${escapeHtml(fallbackTitle)}">`,
      ...(cleanDescription ? [`<meta property="og:description" content="${escapeHtml(cleanDescription)}">`] : []),
      ...(cleanOgImage && !ogImageError ? [`<meta property="og:image" content="${escapeHtml(cleanOgImage)}">`] : []),
      `<meta name="theme-color" content="${themeColor}">`,
      ...(redirectEnabled && firstButton?.url ? [`<meta http-equiv="refresh" content="0;url=${escapeHtml(firstButton.url)}">`] : []),
      '<script id="discord:component-embed" type="application/json">',
      scriptJson,
      "</script>",
      "</head>",
      "<body>",
      `<p>${escapeHtml(fallbackTitle)}</p>`,
      "</body>",
      "</html>",
    ];
    return lines.join("\n");
  }, [cleanDescription, cleanOgImage, cleanTitle, componentPayload, ogImageError, redirectEnabled, themeColor, validButtons]);

  const payloadBytes = useMemo(() => new TextEncoder().encode(JSON.stringify(componentPayload).replace(/<\//g, "<\\/")).length, [componentPayload]);
  const badImages = gallery.some((item) => item.url.trim() && (item.url.trim().length > 2048 || !/^https?:\/\/[^\s?#]+\.(?:png|jpe?g|gif|webp|avif)(?:[?#]\S*)?$/i.test(item.url.trim())));
  const badButtons = buttons.some((button) => {
    const hasAny = button.label.trim() || button.emojiName.trim() || button.emojiId.trim() || button.url.trim();
    if (!hasAny) return false;
    const emojiPart = button.emojiName.trim() || button.emojiId.trim();
    const emojiValid = !emojiPart || (/^\d{17,20}$/.test(button.emojiId.trim()) && /^[A-Za-z0-9_]{2,32}$/.test(button.emojiName.trim()));
    return !/^https?:\/\/\S+$/i.test(button.url.trim()) || !emojiValid || !(button.label.trim() || emojiPart);
  });

  const detectEmojiAnimation = (buttonId: string, emojiId: string) => {
    if (!/^\d{17,20}$/.test(emojiId)) return;
    if (emojiId in animCache) {
      setButtons((current) => current.map((button) => button.id === buttonId ? { ...button, animated: animCache[emojiId] } : button));
      return;
    }
    fetch(`https://cdn.discordapp.com/emojis/${emojiId}.webp?animated=true`)
      .then((response) => response.ok ? response.arrayBuffer() : Promise.reject())
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        const riff = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === "RIFF" && String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]) === "WEBP";
        const animated = riff && bytes.length > 20 && (bytes[20] & 2) === 2;
        animCache[emojiId] = animated;
        setButtons((current) => current.map((button) => button.id === buttonId ? { ...button, animated } : button));
      })
      .catch(() => undefined);
  };

  const copyHtml = async () => { try { await navigator.clipboard.writeText(html); setCopied(true); window.setTimeout(() => setCopied(false), 1500); } catch { setCopied(false); } };
  const downloadHtml = () => { const url = URL.createObjectURL(new Blob([html], { type: "text/html" })); const link = document.createElement("a"); link.href = url; link.download = "index.html"; link.click(); URL.revokeObjectURL(url); };

  return (
    <main className="tool-page component-embed-page">
      <header className="tool-page-heading"><h1>Meta Component Builder</h1><p>Create website embeds for Discord with full component support.</p></header>
      <div className="component-embed-layout">
        <section className="component-embed-editor" aria-label="Meta component builder">
          <div className="component-embed-section">
            <h2>Text</h2>
            <label className="component-embed-field"><input value={title} maxLength={255} onChange={(event) => setTitle(event.target.value)} placeholder="Embed title" /></label>
            <label className="component-embed-field"><textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Embed description" /></label>
          </div>

          <div className="component-embed-section">
            <h2>Content</h2>
            <label className="component-embed-field"><textarea value={extraText} onChange={(event) => setExtraText(event.target.value)} placeholder="Extra text (optional)" /></label>
            <label className="component-embed-field">Thumbnail URL (optional)<input value={thumbnailUrl} onChange={(event) => setThumbnailUrl(event.target.value)} placeholder="https://host.com/small.png" /></label>
            {thumbnailError && <p className="component-embed-error">Thumbnail must be a valid HTTP or HTTPS image URL.</p>}
            <label className="component-embed-toggle"><input type="checkbox" checked={showSeparator} onChange={(event) => setShowSeparator(event.target.checked)} /> Divider before the buttons</label>
          </div>

          <div className="component-embed-section">
            <h2>Colors & Fallback</h2>
            <div className="component-embed-appearance">
              <label className="component-embed-field">Accent<input type="color" value={accentColor} onChange={(event) => setAccentColor(event.target.value)} /></label>
              <label className="component-embed-field">Theme<input type="color" value={themeColor} onChange={(event) => setThemeColor(event.target.value)} /></label>
            </div>
            <label className="component-embed-field">Fallback image (og:image)<input value={ogImage} onChange={(event) => setOgImage(event.target.value)} placeholder="https://host.com/banner.png" /></label>
            {ogImageError && <p className="component-embed-error">Fallback image must be a valid HTTP or HTTPS URL.</p>}
            <label className="component-embed-toggle"><input type="checkbox" checked={redirectEnabled} onChange={(event) => setRedirectEnabled(event.target.checked)} /> Redirect visitors to the first button&apos;s link</label>
          </div>

          <div className="component-embed-section">
            <h2>Images</h2>
            {gallery.length === 0 && <div className="component-embed-empty"><strong>No images yet</strong><span>Add up to 4 and choose where each one sits.</span></div>}
            {gallery.map((item, index) => (
              <div className="component-embed-row" key={item.id}>
                <input aria-label={`Gallery item ${index + 1} URL`} value={item.url} onChange={(event) => setGallery((current) => current.map((entry) => entry.id === item.id ? { ...entry, url: event.target.value } : entry))} placeholder="https://example.com/image.png" />
                <select aria-label={`Gallery item ${index + 1} position`} value={item.position} onChange={(event) => setGallery((current) => current.map((entry) => entry.id === item.id ? { ...entry, position: event.target.value as ImagePosition } : entry))}>
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                </select>
                <button type="button" className="component-embed-icon-button" aria-label={`Remove gallery item ${index + 1}`} onClick={() => setGallery((current) => current.filter((entry) => entry.id !== item.id))}><Trash2 size={15} /></button>
              </div>
            ))}
            <button type="button" className="component-embed-add" disabled={gallery.length >= 4} onClick={() => setGallery((current) => [...current, { id: makeId(), url: "", position: "middle" }])}><Plus size={14} /> Add image</button>
            {badImages && <p className="component-embed-error">One image link is not a direct image URL (.png, .jpg, .jpeg, .gif, .webp or .avif).</p>}
            <p className="component-embed-small">Each needs a direct image link ending in .png, .jpg, .jpeg, .gif, .webp or .avif.</p>
          </div>

          <div className="component-embed-section">
            <h2>Buttons</h2>
            {buttons.length === 0 && <div className="component-embed-empty"><strong>No buttons yet</strong><span>Add up to 5 link buttons, each with an optional emoji.</span></div>}
            {buttons.map((button, index) => (
              <div className="component-embed-button-editor" key={button.id}>
                <div className="component-embed-row">
                  <input aria-label={`Button ${index + 1} label`} value={button.label} maxLength={80} onChange={(event) => setButtons((current) => current.map((entry) => entry.id === button.id ? { ...entry, label: event.target.value } : entry))} placeholder="Button label" />
                  <input aria-label={`Button ${index + 1} URL`} value={button.url} onChange={(event) => setButtons((current) => current.map((entry) => entry.id === button.id ? { ...entry, url: event.target.value } : entry))} placeholder="https://example.com" />
                  <button type="button" className="component-embed-icon-button" aria-label={`Remove button ${index + 1}`} onClick={() => setButtons((current) => current.filter((entry) => entry.id !== button.id))}><Trash2 size={15} /></button>
                </div>
                <div className="component-embed-row component-embed-emoji-row">
                  <input aria-label={`Button ${index + 1} emoji name`} value={button.emojiName} onChange={(event) => {
                    const value = event.target.value;
                    const match = emojiPattern.exec(value);
                    if (match) {
                      setButtons((current) => current.map((entry) => entry.id === button.id ? { ...entry, animated: match[1] === "a", emojiName: match[2], emojiId: match[3] } : entry));
                      detectEmojiAnimation(button.id, match[3]);
                    } else {
                      setButtons((current) => current.map((entry) => entry.id === button.id ? { ...entry, emojiName: value.replace(/`/g, "") } : entry));
                    }
                  }} placeholder="Emoji name" />
                  <input aria-label={`Button ${index + 1} emoji ID`} value={button.emojiId} onChange={(event) => {
                    const emojiId = event.target.value.replace(/[^\d]/g, "");
                    setButtons((current) => current.map((entry) => entry.id === button.id ? { ...entry, emojiId } : entry));
                    detectEmojiAnimation(button.id, emojiId);
                  }} placeholder="Emoji ID" />
                  <label className="component-embed-toggle"><input type="checkbox" checked={button.animated} onChange={(event) => setButtons((current) => current.map((entry) => entry.id === button.id ? { ...entry, animated: event.target.checked } : entry))} /> Animated</label>
                </div>
              </div>
            ))}
            <button type="button" className="component-embed-add" disabled={buttons.length >= 5} onClick={() => setButtons((current) => [...current, { id: makeId(), label: "", url: "", emojiName: "", emojiId: "", animated: false }])}><Plus size={14} /> Add button</button>
            {badButtons && <p className="component-embed-error">A button needs an http(s) URL, plus a label or a full emoji (name and 17-20 digit ID).</p>}
          </div>
        </section>

        <aside className="component-embed-preview-panel">
          <div className="component-embed-preview-heading">
            <span>{previewView === "discord" ? "Preview" : "Fallback preview"}</span>
            {ogImageError === false && /^https?:\/\/\S+$/i.test(cleanOgImage) && (
              <button type="button" className="component-embed-swap" onClick={() => setPreviewView((current) => current === "discord" ? "fallback" : "discord")}>
                {previewView === "discord" ? "Check fallback embed" : "See Discord embed"}
              </button>
            )}
          </div>
          {previewView === "discord" ? (
          <div className="component-embed-preview" style={{ borderLeftColor: accentColor }}>
            {validGallery.filter((item) => item.position === "top").length > 0 && (
              <div className="component-embed-preview-gallery">
                {validGallery.filter((item) => item.position === "top").map((item) => <img key={item.id} src={item.url} alt="" />)}
              </div>
            )}
            {(cleanTitle || cleanDescription) && (
              <div className="component-embed-preview-thumbnail-row">
                <p>{cleanTitle ? `# ${cleanTitle}` : ""}{cleanTitle && cleanDescription ? "\n" : ""}{cleanDescription}</p>
                {cleanThumbnail && !thumbnailError && <img src={cleanThumbnail} alt="" />}
              </div>
            )}
            {validGallery.filter((item) => item.position === "middle").length > 0 && (
              <div className="component-embed-preview-gallery">
                {validGallery.filter((item) => item.position === "middle").map((item) => <img key={item.id} src={item.url} alt="" />)}
              </div>
            )}
            {cleanExtraText && <p className="component-embed-preview-text">{cleanExtraText}</p>}
            {validGallery.filter((item) => item.position === "bottom").length > 0 && (
              <div className="component-embed-preview-gallery">
                {validGallery.filter((item) => item.position === "bottom").map((item) => <img key={item.id} src={item.url} alt="" />)}
              </div>
            )}
            {showSeparator && validButtons.length > 0 && <hr />}
            {validButtons.length > 0 && (
              <div className="component-embed-preview-buttons">
                {validButtons.map((button, index) => <a key={index} href={button.url} target="_blank" rel="noreferrer">{button.emoji && <img src={`https://cdn.discordapp.com/emojis/${button.emoji.id}.${button.emoji.animated ? "gif" : "png"}?size=48`} alt="" />}{button.label}</a>)}
              </div>
            )}
          </div>
          ) : (
          <div className="component-embed-fallback" style={{ borderLeftColor: themeColor }}>
            {cleanTitle && <p className="component-embed-fallback-title">{cleanTitle}</p>}
            {cleanDescription && <p className="component-embed-fallback-description">{cleanDescription}</p>}
            {cleanOgImage && <img src={cleanOgImage} alt="Fallback preview" />}
          </div>
          )}

          <div className="component-embed-payload"><span>{payloadBytes}/3000 bytes</span><div className="component-embed-meter"><i style={{ transform: `scaleX(${Math.min(1, payloadBytes / 3000)})`, background: payloadBytes <= 1200 ? "#9ccfa0" : payloadBytes <= 2250 ? "#e6c97a" : "#f0a3a0" }} /></div></div>
          {payloadBytes > 3000 && <p className="component-embed-error">Too big, Discord will ignore it.</p>}

          <div className="component-embed-actions">
            <button type="button" onClick={copyHtml}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy HTML"}</button>
            <button type="button" onClick={downloadHtml}><Download size={14} /> Download</button>
          </div>
          <label className="component-embed-field"><textarea className="component-embed-output" readOnly spellCheck={false} value={html} /></label>
          <section className="component-embed-attribution" aria-label="Original contributor">
            <img src="/shadow999.png" alt="ItzMeShadow999 profile picture" />
            <div>
              <p>Contributed by <strong>ItzMeShadow999</strong></p>
              <p>Check out the <a href="https://github.com/ItzMeShadow999/Discord-Embed-builder" target="_blank" rel="noopener noreferrer">original</a> and show some love!</p>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
