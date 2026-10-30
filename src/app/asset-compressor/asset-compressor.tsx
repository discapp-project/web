"use client";

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import NextImage from "next/image";
import { Upload, Download, Sparkles } from "lucide-react";
import { compressToLimit } from "./compression.mjs";

export default function EmojiStickerCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [targetType, setTargetType] = useState<"emoji" | "sticker">("emoji");
  const [quality, setQuality] = useState<number>(0.8);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
  }, [previewUrl, compressedUrl]);

  const maxSizeBytes = targetType === "emoji" ? 256 * 1024 : 500 * 1024;
  const maxDimensions = targetType === "emoji" ? 128 : 320;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setOriginalSize(selected.size);
    setPreviewUrl(URL.createObjectURL(selected));
    setCompressedUrl(null);
    setCompressedBlob(null);
    setCompressedSize(0);
    setProcessingError("");
  };

  const changeTargetType = (type: "emoji" | "sticker") => {
    setTargetType(type);
    setCompressedUrl(null);
    setCompressedBlob(null);
    setCompressedSize(0);
    setProcessingError("");
  };

  const processImage = () => {
    if (!file) return;
    setIsProcessing(true);
    setProcessingError("");

    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);
    img.onload = async () => {
      URL.revokeObjectURL(sourceUrl);
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsProcessing(false);
        return;
      }

      const dimensionScale = Math.min(1, maxDimensions / Math.max(img.width, img.height));
      const baseWidth = Math.max(1, Math.round(img.width * dimensionScale));
      const baseHeight = Math.max(1, Math.round(img.height * dimensionScale));
      const mimeType = targetType === "sticker" && file.type === "image/png" ? "image/png" : "image/webp";

      try {
        const result = await compressToLimit((attemptQuality, scale) => new Promise<Blob | null>((resolve) => {
          const width = Math.max(1, Math.round(baseWidth * scale));
          const height = Math.max(1, Math.round(baseHeight * scale));
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          if (!context) {
            resolve(null);
            return;
          }
          context.clearRect(0, 0, width, height);
          context.drawImage(img, 0, 0, width, height);
          canvas.toBlob(resolve, mimeType, attemptQuality);
        }), maxSizeBytes, quality);

        if (!result.blob) {
          setCompressedBlob(null);
          setCompressedUrl(null);
          setCompressedSize(0);
          setProcessingError("This image could not be reduced below the selected Discord size limit. Try another image.");
        } else {
          setCompressedBlob(result.blob);
          setCompressedSize(result.blob.size);
          setCompressedUrl(URL.createObjectURL(result.blob));
        }
      } catch {
        setProcessingError("This image could not be processed. Try a different file format or image.");
      } finally {
        setIsProcessing(false);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      setProcessingError("This image could not be opened. Try a different file.");
      setIsProcessing(false);
    };
    img.src = sourceUrl;
  };

  const downloadFile = () => {
    if (!compressedUrl || !file) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = `compressed_${targetType}_${file.name.split(".")[0] || "asset"}.${
      targetType === "sticker" && file.type === "image/png" ? "png" : "webp"
    }`;
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 KB";
    return (bytes / 1024).toFixed(1) + " KB";
  };

  return (
    <main className="tool-page compressor-page">
      <header className="tool-page-heading">
          <h1>
            Emoji & Sticker Compressor
          </h1>
          <p>
            Resize and optimize assets to fit Discord&apos;s strict upload limits.
          </p>
      </header>

      <section className="tool-panel compressor-panel" aria-label="Image compression settings">
          
          <div className="tool-segmented-control" role="group" aria-label="Asset type">
            <button
              className={`tool-segment-button${targetType === "emoji" ? " is-active" : ""}`}
              onClick={() => changeTargetType("emoji")}
              aria-pressed={targetType === "emoji"}
              type="button"
            >
              Emoji (256 KB / 128x128)
            </button>
            <button
              className={`tool-segment-button${targetType === "sticker" ? " is-active" : ""}`}
              onClick={() => changeTargetType("sticker")}
              aria-pressed={targetType === "sticker"}
              type="button"
            >
              Sticker (500 KB / 320x320)
            </button>
          </div>

          <div className="compressor-upload">
            <input
              className="compressor-file-input"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              id="file-upload"
            />
            <label
              className="compressor-file-label"
              htmlFor="file-upload"
            >
              <Upload className="compressor-upload-icon" aria-hidden="true" />
              <span className="compressor-upload-name">
                {file ? file.name : "Choose an image or drop it here"}
              </span>
              <span className="compressor-upload-hint">
                Supports PNG, JPEG, or WEBP
              </span>
            </label>
          </div>

          {file && (
            <div className="compressor-settings">
              <div className="compressor-quality-heading">
                <label htmlFor="compression-quality">
                  Compression Level
                </label>
                <span>
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                id="compression-quality"
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => {
                  setQuality(parseFloat(e.target.value));
                  setCompressedUrl(null);
                  setCompressedBlob(null);
                  setCompressedSize(0);
                }}
                className="compressor-quality-range"
              />
              <button
                onClick={processImage}
                disabled={isProcessing}
                className="tool-button tool-button-primary compressor-action"
              >
                <Sparkles size={16} aria-hidden="true" />
                {isProcessing ? "Processing..." : "Compress"}
              </button>
            </div>
          )}

          {processingError && (
            <p className="compressor-error" role="status">{processingError}</p>
          )}

          {(previewUrl || compressedUrl) && (
            <div className="compressor-results">
              
              {previewUrl && (
                <div className="compressor-result">
                  <div className="compressor-result-title">
                    Original
                  </div>
                  <div className="compressor-image-preview">
                    <NextImage
                      src={previewUrl}
                      alt="Original"
                      width={320}
                      height={320}
                      unoptimized
                      style={{
                        maxWidth: targetType === "emoji" ? "128px" : "160px",
                        maxHeight: targetType === "emoji" ? "128px" : "160px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="compressor-output-size">
                    <span>File Size:</span>
                    <span>{formatSize(originalSize)}</span>
                  </div>
                </div>
              )}

              {compressedUrl && (
                <div className="compressor-result">
                  <div className="compressor-result-title">
                    Compressed
                  </div>
                  <div className="compressor-image-preview">
                    <NextImage
                      src={compressedUrl}
                      alt="Compressed"
                      width={320}
                      height={320}
                      unoptimized
                      style={{
                        maxWidth: targetType === "emoji" ? "128px" : "160px",
                        maxHeight: targetType === "emoji" ? "128px" : "160px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="compressor-output-size">
                    <span>Output Size:</span>
                    <span
                      className={compressedSize <= maxSizeBytes ? "is-within-limit" : "is-over-limit"}
                    >
                      {formatSize(compressedSize)} {compressedSize <= maxSizeBytes ? "✓" : "✕ (Over Limit)"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={downloadFile}
                    disabled={!compressedBlob || compressedSize > maxSizeBytes}
                    className="tool-button tool-button-secondary compressor-action"
                  >
                    <Download size={14} aria-hidden="true" />
                    Download File
                  </button>
                </div>
              )}

            </div>
          )}

      </section>
      <canvas ref={canvasRef} className="compressor-canvas" />
    </main>
  );
}