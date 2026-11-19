"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { CornerSquareType, DotType } from "qr-code-styling";
import { Copy, Download, ImagePlus, QrCode, RotateCcw, Trash2 } from "lucide-react";
import { normalizeDiscordInvite } from "./invite-utils";

const COLOR_PRESETS = [
  { name: "Blurple", start: "#5865F2", end: "#9B59FF" },
  { name: "Ocean", start: "#00B4DB", end: "#0083B0" },
  { name: "Sunset", start: "#FF512F", end: "#DD2476" },
  { name: "Mint", start: "#00C9A7", end: "#92FE9D" },
];

const DOT_STYLES = [
  ["square", "Square"],
  ["dots", "Dots"],
  ["rounded", "Rounded"],
  ["classy", "Classy"],
  ["classy-rounded", "Soft classy"],
  ["extra-rounded", "Extra rounded"],
] as const;

function makeGradient(start: string, end: string, rotation: number) {
  return {
    type: "linear" as const,
    rotation: (rotation * Math.PI) / 180,
    colorStops: [
      { offset: 0, color: start },
      { offset: 1, color: end },
    ],
  };
}

export default function InviteQrCode() {
  const previewRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [libraryReady, setLibraryReady] = useState(false);
  const [invite, setInvite] = useState("");
  const [startColor, setStartColor] = useState("#5865F2");
  const [endColor, setEndColor] = useState("#9B59FF");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [gradientEnabled, setGradientEnabled] = useState(true);
  const [rotation, setRotation] = useState(45);
  const [dotStyle, setDotStyle] = useState<DotType>("rounded");
  const [cornerStyle, setCornerStyle] = useState<CornerSquareType>("extra-rounded");
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageSize, setImageSize] = useState(0.24);
  const [outputSize, setOutputSize] = useState(512);
  const [status, setStatus] = useState("");

  const normalizedInvite = useMemo(() => normalizeDiscordInvite(invite), [invite]);
  const image = uploadedImage;

  const qrOptions = useMemo(() => {
    const foreground = gradientEnabled
      ? { gradient: makeGradient(startColor, endColor, rotation) }
      : { color: startColor };
    return {
      type: "svg" as const,
      width: outputSize,
      height: outputSize,
      data: normalizedInvite ?? "https://discord.gg/invite",
      margin: 12,
      qrOptions: { errorCorrectionLevel: "H" as const },
      dotsOptions: { type: dotStyle, ...foreground },
      cornersSquareOptions: { type: cornerStyle, ...foreground },
      cornersDotOptions: { type: "dot" as const, ...foreground },
      backgroundOptions: { color: backgroundColor },
      image,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize,
        margin: 5,
        crossOrigin: "anonymous",
      },
    };
  }, [backgroundColor, cornerStyle, dotStyle, endColor, gradientEnabled, image, imageSize, normalizedInvite, outputSize, rotation, startColor]);
  const qrOptionsRef = useRef(qrOptions);

  useEffect(() => {
    qrOptionsRef.current = qrOptions;
  }, [qrOptions]);

  useEffect(() => {
    let active = true;
    void import("qr-code-styling").then(({ default: QRCodeStylingLibrary }) => {
      if (!active || !previewRef.current) return;
      const qr = new QRCodeStylingLibrary(qrOptionsRef.current);
      qr.append(previewRef.current);
      qrRef.current = qr;
      setLibraryReady(true);
    }).catch(() => {
      if (active) setStatus("The QR generator could not be loaded. Please refresh and try again.");
    });
    return () => {
      active = false;
      qrRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!libraryReady || !qrRef.current) return;
    try {
      qrRef.current.update(qrOptions);
    } catch {
      console.error("Could not update the QR code with the selected style.");
    }
  }, [libraryReady, qrOptions]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      setStatus("Choose a PNG, JPEG, WebP, or GIF image for the center logo.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setStatus("The center image must be smaller than 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedImage(reader.result);
        setStatus("");
      }
    };
    reader.onerror = () => setStatus("Could not read that image. Please try another file.");
    reader.readAsDataURL(file);
  };

  const downloadQr = async (extension: "png" | "svg") => {
    if (!normalizedInvite || !qrRef.current) return;
    try {
      await qrRef.current.download({ name: "discapp-qrcode", extension });
      setStatus(`QR code downloaded as ${extension.toUpperCase()}.`);
    } catch {
      setStatus(`Could not download the ${extension.toUpperCase()} file. Please try again.`);
    }
  };

  const copyInvite = async () => {
    if (!normalizedInvite) return;
    try {
      await navigator.clipboard.writeText(normalizedInvite);
      setStatus("Invite link copied.");
    } catch {
      setStatus("Could not copy the invite link. You can copy it from the field above.");
    }
  };

  const resetStyle = () => {
    setStartColor("#5865F2");
    setEndColor("#9B59FF");
    setBackgroundColor("#FFFFFF");
    setGradientEnabled(true);
    setRotation(45);
    setDotStyle("rounded");
    setCornerStyle("extra-rounded");
    setUploadedImage("");
    setImageSize(0.24);
    setOutputSize(512);
    setStatus("");
  };

  return (
    <main className="tool-page invite-qr-page">
      <header className="tool-page-heading">
        <h1>Discord Invite QR Code Generator</h1>
        <p>Turn any server invite into a custom QR code. Style it to your liking and download it ready to share.</p>
      </header>

      <div className="invite-qr-layout">
        <section className="tool-panel invite-qr-settings" aria-label="QR code settings">
          <label className="tool-field">
            Invite Link
            <input
              className="tool-input"
              type="text"
              value={invite}
              onChange={(event) => {
                setInvite(event.target.value);
                setStatus("");
              }}
              placeholder="discord.gg/your-invite"
              autoComplete="url"
              spellCheck={false}
            />
            <span className="invite-qr-help">Paste a full invite URL or enter just the invite code.</span>
          </label>

          <div className="invite-qr-section">
            <div className="invite-qr-section-heading">
              <span>Color &amp; pattern</span>
              <div className="tool-segmented-control" role="group" aria-label="Color mode">
                <button type="button" className={`tool-segment-button ${!gradientEnabled ? "is-active" : ""}`} aria-pressed={!gradientEnabled} onClick={() => setGradientEnabled(false)}>Solid</button>
                <button type="button" className={`tool-segment-button ${gradientEnabled ? "is-active" : ""}`} aria-pressed={gradientEnabled} onClick={() => setGradientEnabled(true)}>Gradient</button>
              </div>
            </div>

            <div className="invite-qr-presets" aria-label="Color presets">
              {COLOR_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  className="invite-qr-swatch"
                  style={{ background: `linear-gradient(120deg, ${preset.start}, ${preset.end})` }}
                  title={`${preset.name} colors`}
                  aria-label={`Use ${preset.name} colors`}
                  onClick={() => {
                    setStartColor(preset.start);
                    setEndColor(preset.end);
                    setGradientEnabled(true);
                  }}
                />
              ))}
            </div>

            <div className="invite-qr-color-grid">
              <label className="tool-field">
                {gradientEnabled ? "Gradient start" : "QR color"}
                <span className="invite-qr-color-control">
                  <input aria-label="QR code start color" type="color" value={startColor} onChange={(event) => setStartColor(event.target.value)} />
                  <code>{startColor.toUpperCase()}</code>
                </span>
              </label>
              {gradientEnabled && (
                <label className="tool-field">
                  Gradient end
                  <span className="invite-qr-color-control">
                    <input aria-label="QR code end color" type="color" value={endColor} onChange={(event) => setEndColor(event.target.value)} />
                    <code>{endColor.toUpperCase()}</code>
                  </span>
                </label>
              )}
              <label className="tool-field">
                Background
                <span className="invite-qr-color-control">
                  <input aria-label="QR code background color" type="color" value={backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
                  <code>{backgroundColor.toUpperCase()}</code>
                </span>
              </label>
            </div>

            {gradientEnabled && (
              <label className="invite-qr-range">
                <span>Gradient angle <output>{rotation}°</output></span>
                <input type="range" min="0" max="360" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} />
              </label>
            )}

            <div className="invite-qr-select-grid">
              <label className="tool-field">
                Module style
                <select className="tool-select" value={dotStyle} onChange={(event) => setDotStyle(event.target.value as DotType)}>
                  {DOT_STYLES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="tool-field">
                Corner style
                <select className="tool-select" value={cornerStyle} onChange={(event) => setCornerStyle(event.target.value as CornerSquareType)}>
                  <option value="extra-rounded">Extra rounded</option>
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
                </select>
              </label>
            </div>
          </div>

          <div className="invite-qr-section">
            <div className="invite-qr-section-heading">
              <span>Center image</span>
            </div>
            <div className="invite-qr-upload-row">
              <label className="invite-qr-upload">
                <ImagePlus size={16} aria-hidden="true" />
                {uploadedImage ? "Replace image" : "Upload image"}
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleImageUpload} />
              </label>
              {uploadedImage && (
                <button
                  type="button"
                  className="invite-qr-remove-logo"
                  aria-label="Remove uploaded image"
                  title="Remove uploaded image"
                  onClick={() => setUploadedImage("")}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              )}
            </div>
            {image && (
              <label className="invite-qr-range">
                <span>Symbol size <output>{Math.round(imageSize * 100)}%</output></span>
                <input type="range" min="12" max="34" value={Math.round(imageSize * 100)} onChange={(event) => setImageSize(Number(event.target.value) / 100)} />
              </label>
            )}
          </div>

          <div className="invite-qr-section">
            <label className="invite-qr-range">
              <span>Download resolution <output>{outputSize}px</output></span>
              <input type="range" min="256" max="1024" step="64" value={outputSize} onChange={(event) => setOutputSize(Number(event.target.value))} />
            </label>
          </div>
        </section>

        <aside className="tool-panel invite-qr-preview-panel" aria-label="QR code preview">
          <div className="invite-qr-preview-heading">
            <span>Live preview</span>
            <QrCode size={17} aria-hidden="true" />
          </div>
          <div className="invite-qr-preview-stage" hidden={!normalizedInvite}>
            <div className="invite-qr-code" ref={previewRef} />
          </div>
          {normalizedInvite ? (
            <>
              <p className="invite-qr-link" title={normalizedInvite}>{normalizedInvite}</p>
              <div className="invite-qr-actions">
                <button type="button" className="tool-button tool-button-primary" onClick={() => void downloadQr("png")} disabled={!libraryReady}>
                  <Download size={15} aria-hidden="true" /> Download PNG
                </button>
                <button type="button" className="tool-button tool-button-secondary" onClick={() => void downloadQr("svg")} disabled={!libraryReady}>
                  <Download size={15} aria-hidden="true" /> SVG
                </button>
              </div>
              <button type="button" className="invite-qr-copy" onClick={() => void copyInvite()}>
                <Copy size={14} aria-hidden="true" /> Copy normalized invite
              </button>
              <p className="invite-qr-hint">Test the downloaded code before printing. High error correction helps preserve scans with a center logo.</p>
            </>
          ) : (
            <div className="invite-qr-empty">
              <QrCode size={36} aria-hidden="true" />
              <p>Enter a Discord invite to see your QR code.</p>
            </div>
          )}
          <div className="invite-qr-footer">
            <button type="button" className="invite-qr-reset" onClick={resetStyle}><RotateCcw size={13} aria-hidden="true" /> Reset style</button>
          </div>
          <p className="tool-status invite-qr-status" aria-live="polite" role="status">{status}</p>
        </aside>
      </div>
      {invite.trim() && !normalizedInvite && <p className="invite-qr-error" role="alert">Enter a valid Discord invite, such as discord.gg/code or discord.com/invite/code.</p>}
    </main>
  );
}
