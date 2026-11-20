"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { Download, FileVideo2, LoaderCircle, Sparkles, Upload, X } from "lucide-react";

type Resolution = "original" | "1080" | "720" | "480";

const resolutionLimits: Record<Resolution, number | null> = {
  original: null,
  "1080": 1080,
  "720": 720,
  "480": 480,
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) return "Unknown length";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function formatTargetSize(megabytes: number) {
  return megabytes >= 1000 ? "1 GB" : `${megabytes} MB`;
}

export default function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [targetSizePosition, setTargetSizePosition] = useState(434);
  const [resolution, setResolution] = useState<Resolution>("original");
  const [frameRate, setFrameRate] = useState(30);
  const [keepAudio, setKeepAudio] = useState(true);
  const [duration, setDuration] = useState(0);
  const [dimensions, setDimensions] = useState("");
  const [progress, setProgress] = useState(0);
  const [hasKnownDuration, setHasKnownDuration] = useState(true);
  const [encodingPass, setEncodingPass] = useState(1);
  const [encodingPassCount, setEncodingPassCount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => () => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
  }, [sourceUrl, outputUrl]);

  const invalidateOutput = () => {
    setOutputUrl(null);
    setOutputBlob(null);
  };

  const selectFile = (selected: File | undefined) => {
    if (!selected) return;
    if (!selected.type.startsWith("video/")) {
      setError("Choose a video file to get started.");
      return;
    }
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    setFile(selected);
    setSourceUrl(URL.createObjectURL(selected));
    setOutputUrl(null);
    setOutputBlob(null);
    setDuration(0);
    setDimensions("");
    setProgress(0);
    setHasKnownDuration(true);
    setEncodingPass(1);
    setEncodingPassCount(1);
    setError("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const compressVideo = async () => {
    if (!file || isProcessing) return;
    setError("");
    invalidateOutput();
    setProgress(0);

    if (typeof MediaRecorder === "undefined" || !HTMLCanvasElement.prototype.captureStream) {
      setError("Video compression is not supported in this browser. Try the latest version of Chrome, Edge, or Firefox.");
      return;
    }

    const supportedType = ["video/webm;codecs=vp8", "video/webm"]
      .find((type) => MediaRecorder.isTypeSupported(type));
    if (!supportedType) {
      setError("This browser does not support a compatible video format for compression.");
      return;
    }

    setIsProcessing(true);
    cancelledRef.current = false;
    const video = document.createElement("video");
    const sourceObjectUrl = URL.createObjectURL(file);
    video.src = sourceObjectUrl;
    video.preload = "auto";
    video.playsInline = true;
    activeVideoRef.current = video;
    const capturableVideo = video as HTMLVideoElement & {
      captureStream?: () => MediaStream;
      mozCaptureStream?: () => MediaStream;
    };
    const captureSourceStream = () => capturableVideo.captureStream?.() ?? capturableVideo.mozCaptureStream?.() ?? null;
    const useDirectStream = resolution === "original" && frameRate === 30 && Boolean(capturableVideo.captureStream || capturableVideo.mozCaptureStream);
    let audioContext: AudioContext | null = null;
    let audioContextResume: Promise<void> | null = null;
    let animationFrame = 0;
    let canvasStream: MediaStream | null = null;
    let sourceStream: MediaStream | null = null;
    let outputWidth = 0;
    let outputHeight = 0;

    try {
      if (keepAudio && !useDirectStream) {
        audioContext = new AudioContext();
        audioContextResume = audioContext.resume();
      }

      const metadataLoaded = new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error("This video could not be opened. Try another video format."));
      });
      const initialPlayback = video.play();
      await Promise.all([metadataLoaded, initialPlayback]);
      video.pause();
      const getKnownDuration = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) return video.duration;
        if (video.seekable.length) {
          const seekableEnd = video.seekable.end(video.seekable.length - 1);
          if (Number.isFinite(seekableEnd) && seekableEnd > 0) return seekableEnd;
        }
        return null;
      };
      let mediaDuration = getKnownDuration();
      setHasKnownDuration(mediaDuration !== null);

      if (video.currentTime > 0) {
        await new Promise<void>((resolve) => {
          video.addEventListener("seeked", () => resolve(), { once: true });
          video.currentTime = 0;
        });
      }

      let context: CanvasRenderingContext2D | null = null;
      let tracks: MediaStreamTrack[];
      if (useDirectStream) {
        sourceStream = captureSourceStream();
        if (!sourceStream) throw new Error("This browser could not capture the selected video.");
        tracks = sourceStream.getTracks().filter((track) => track.kind !== "audio" || keepAudio);
      } else {
        const maxDimension = resolutionLimits[resolution];
        const scale = maxDimension ? Math.min(1, maxDimension / Math.max(video.videoWidth, video.videoHeight)) : 1;
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
        canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
        outputWidth = canvas.width;
        outputHeight = canvas.height;
        context = canvas.getContext("2d");
        if (!context) throw new Error("This browser could not prepare the video for compression.");

        canvasStream = canvas.captureStream(frameRate);
        tracks = [...canvasStream.getVideoTracks()];
        if (keepAudio && audioContext) {
          const audioDestination = audioContext.createMediaStreamDestination();
          audioContext.createMediaElementSource(video).connect(audioDestination);
          await audioContextResume;
          tracks.push(...audioDestination.stream.getAudioTracks());
        }
      }
      if (!tracks.some((track) => track.kind === "video" && track.readyState === "live")) {
        throw new Error("This browser could not capture video frames from the selected file.");
      }

      const targetMegabytes = Math.round(1000 ** (targetSizePosition / 1000));
      const targetBytes = targetMegabytes * 1024 * 1024;
      const effectiveTargetBytes = Math.min(targetBytes, file.size);
      const totalBitrateLimit = mediaDuration ? (effectiveTargetBytes * 8 / mediaDuration) * 0.96 : Infinity;
      const sourceBitrate = mediaDuration ? file.size * 8 / mediaDuration : Math.min(2_000_000, file.size * 8 / 30);
      const passCount = targetBytes < file.size ? 3 : 1;
      setEncodingPassCount(passCount);
      let requestedBitrate = Math.min(sourceBitrate * 0.98, totalBitrateLimit);
      const maximumBitrate = Math.min(50_000_000, totalBitrateLimit * 16);
      let bestBlob: Blob | null = null;

      for (let attempt = 0; attempt < passCount && !cancelledRef.current; attempt++) {
        if (attempt > 0) {
          video.pause();
          if (video.currentTime > 0) {
            await new Promise<void>((resolve) => {
              video.addEventListener("seeked", () => resolve(), { once: true });
              video.currentTime = 0;
            });
          }
          if (useDirectStream) {
            sourceStream?.getTracks().forEach((track) => track.stop());
            sourceStream = captureSourceStream();
            if (!sourceStream) throw new Error("This browser could not restart video capture.");
            tracks = sourceStream.getTracks().filter((track) => track.kind !== "audio" || keepAudio);
          }
        }

        setEncodingPass(attempt + 1);
        setProgress(0);
        const audioBitrate = keepAudio ? Math.min(96_000, Math.max(1_000, requestedBitrate * 0.15)) : 0;
        const videoBitrate = Math.max(1_000, Math.min(20_000_000, requestedBitrate - audioBitrate));
        const recorder = new MediaRecorder(new MediaStream(tracks), {
          mimeType: supportedType,
          videoBitsPerSecond: videoBitrate,
          ...(keepAudio ? { audioBitsPerSecond: audioBitrate } : {}),
        });
        recorderRef.current = recorder;

        const blob = await new Promise<Blob | null>((resolve, reject) => {
          const chunks: BlobPart[] = [];
          const drawFrame = () => {
            if (context && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
              context.drawImage(video, 0, 0, outputWidth, outputHeight);
            }
            if (context && !video.ended && !cancelledRef.current) animationFrame = requestAnimationFrame(drawFrame);
          };

          recorder.ondataavailable = (event) => {
            if (event.data.size) chunks.push(event.data);
          };
          recorder.onerror = () => reject(new Error("Compression stopped unexpectedly. Try a shorter video or a lower resolution."));
          video.ontimeupdate = () => {
            mediaDuration = getKnownDuration() ?? mediaDuration;
            if (mediaDuration) {
              setHasKnownDuration(true);
              setProgress(Math.min(99, Math.round((video.currentTime / mediaDuration) * 100)));
            }
          };
          video.ondurationchange = () => {
            mediaDuration = getKnownDuration() ?? mediaDuration;
            if (mediaDuration) setHasKnownDuration(true);
          };
          recorder.onstop = () => {
            if (cancelledRef.current) {
              resolve(null);
              return;
            }
            resolve(new Blob(chunks, { type: recorder.mimeType || supportedType }));
          };
          video.onended = () => {
            setProgress(100);
            if (recorder.state !== "inactive") recorder.stop();
          };

          recorder.start(1000);
          if (context) animationFrame = requestAnimationFrame(drawFrame);
          video.play().catch(() => reject(new Error("Playback could not start. Check that this video format is supported by your browser.")));
        });

        if (!blob) break;
        if (!blob.size) throw new Error("The browser produced an empty video. Try a different input format or a supported browser.");

        if (
          !bestBlob
          || (blob.size <= effectiveTargetBytes && bestBlob.size > effectiveTargetBytes)
          || (blob.size <= effectiveTargetBytes && bestBlob.size <= effectiveTargetBytes && blob.size > bestBlob.size)
          || (blob.size > effectiveTargetBytes && bestBlob.size > effectiveTargetBytes && blob.size < bestBlob.size)
        ) {
          bestBlob = blob;
        }

        const sizeRatio = effectiveTargetBytes / blob.size;
        if (blob.size <= effectiveTargetBytes && sizeRatio >= 0.97) break;
        if (attempt + 1 < passCount) {
          const nextBitrate = Math.min(maximumBitrate, Math.max(1_000, requestedBitrate * sizeRatio));
          if (Math.abs(nextBitrate - requestedBitrate) / requestedBitrate < 0.05) break;
          requestedBitrate = nextBitrate;
        }
      }

      if (cancelledRef.current) {
        setProgress(0);
      } else if (bestBlob) {
        setOutputBlob(bestBlob);
        setOutputUrl(URL.createObjectURL(bestBlob));
        setProgress(100);
      } else {
        setError("No compressed video was produced. Try a different input format.");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Video compression failed. Try another file.");
    } finally {
      cancelAnimationFrame(animationFrame);
      video.pause();
      if (recorderRef.current?.state !== "inactive") recorderRef.current?.stop();
      video.removeAttribute("src");
      video.load();
      URL.revokeObjectURL(sourceObjectUrl);
      canvasStream?.getTracks().forEach((track) => track.stop());
      sourceStream?.getTracks().forEach((track) => track.stop());
      recorderRef.current = null;
      activeVideoRef.current = null;
      if (audioContext && audioContext.state !== "closed") await audioContext.close();
      setIsProcessing(false);
    }
  };

  const cancelCompression = () => {
    cancelledRef.current = true;
    activeVideoRef.current?.pause();
    if (recorderRef.current?.state !== "inactive") recorderRef.current?.stop();
  };

  const downloadVideo = () => {
    if (!outputUrl || !file || !outputBlob) return;
    const anchor = document.createElement("a");
    anchor.href = outputUrl;
    anchor.download = `${file.name.replace(/\.[^.]+$/, "")}-compressed.webm`;
    anchor.click();
  };

  const targetMegabytes = Math.round(1000 ** (targetSizePosition / 1000));
  const targetBytes = targetMegabytes * 1024 * 1024;
  const outputFits = outputBlob ? outputBlob.size <= targetBytes : false;

  return (
    <main className="tool-page video-compressor-page">
      <header className="tool-page-heading">
        <h1>Video Compressor</h1>
        <p>Reduce video file size to fit under Discord's upload limit.</p>
      </header>

      <section className="tool-panel video-compressor-panel" aria-label="Video compression settings">
        <div className="video-target-section">
          <div className="video-section-heading">
            <label htmlFor="video-target-size">Target Size</label>
            <strong>{formatTargetSize(targetMegabytes)}</strong>
          </div>
          <input
            id="video-target-size"
            className="video-target-range"
            type="range"
            min="0"
            max="1000"
            step="1"
            value={targetSizePosition}
            onChange={(event) => {
              setTargetSizePosition(Number(event.target.value));
              invalidateOutput();
            }}
            aria-valuetext={formatTargetSize(targetMegabytes)}
          />
          <div className="video-target-scale"><span>1 MB</span><span>1 GB</span></div>
        </div>

        <div className="compressor-upload">
          <input
            ref={inputRef}
            className="compressor-file-input"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            aria-label="Choose a video"
          />
          <label
            className={`compressor-file-label${isDragging ? " is-dragging" : ""}`}
            onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {file ? <FileVideo2 className="compressor-upload-icon" aria-hidden="true" /> : <Upload className="compressor-upload-icon" aria-hidden="true" />}
            <span className="compressor-upload-name">{file ? file.name : "Choose a video or drop it here"}</span>
            <span className="compressor-upload-hint">
              {file ? `${formatSize(file.size)}${duration ? ` · ${formatDuration(duration)}` : ""}${dimensions ? ` · ${dimensions}` : ""}` : "MP4, MOV, WebM and other browser-supported video formats"}
            </span>
          </label>
        </div>

        {file && (
          <>
            <div className="video-compression-settings">
              <div className="video-advanced-options">
                <label className="tool-field" htmlFor="video-resolution">
                  Resolution
                  <select
                    id="video-resolution"
                    className="tool-select"
                    value={resolution}
                    onChange={(event) => { setResolution(event.target.value as Resolution); invalidateOutput(); }}
                  >
                    <option value="original">Keep original</option>
                    <option value="1080">Up to 1080p</option>
                    <option value="720">Up to 720p</option>
                    <option value="480">Up to 480p</option>
                  </select>
                </label>
                <label className="tool-field" htmlFor="video-frame-rate">
                  Frame rate
                  <select
                    id="video-frame-rate"
                    className="tool-select"
                    value={frameRate}
                    onChange={(event) => { setFrameRate(Number(event.target.value)); invalidateOutput(); }}
                  >
                    <option value="24">24 fps</option>
                    <option value="30">30 fps</option>
                    <option value="60">60 fps</option>
                  </select>
                </label>
              </div>
              <label className="video-audio-toggle">
                <input
                  type="checkbox"
                  checked={keepAudio}
                  onChange={(event) => { setKeepAudio(event.target.checked); invalidateOutput(); }}
                />
                Keep original audio
              </label>

              <div className="video-compressor-actions">
                <button type="button" className="tool-button tool-button-primary compressor-action" onClick={compressVideo} disabled={isProcessing}>
                  {isProcessing ? <LoaderCircle size={16} className="video-spinner" aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}
                  {isProcessing ? "Compressing video..." : "Compress video"}
                </button>
                {isProcessing && (
                  <button type="button" className="video-cancel-button" onClick={cancelCompression} title="Cancel compression" aria-label="Cancel compression">
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
              {isProcessing && (
                <div className="video-progress" role="status" aria-live="polite">
                  <progress className="video-progress-track" max={100} value={hasKnownDuration ? progress : undefined} />
                  <span>{encodingPassCount > 1 ? `Pass ${encodingPass} of ${encodingPassCount} · ` : ""}{!hasKnownDuration ? "Encoding · duration unknown" : progress === 0 ? "Starting video..." : `${progress}% · runs at playback speed`}</span>
                </div>
              )}
            </div>

            {(sourceUrl || outputUrl) && (
              <div className="compressor-results">
                {sourceUrl && (
                  <div className="compressor-result">
                    <div className="compressor-result-title">Original</div>
                    <div className="video-preview"><video src={sourceUrl} controls playsInline onLoadedMetadata={(event) => {
                      const preview = event.currentTarget;
                      setDuration(preview.duration);
                      setDimensions(`${preview.videoWidth} × ${preview.videoHeight}`);
                    }} /></div>
                    <div className="compressor-output-size"><span>File size</span><span>{formatSize(file.size)}</span></div>
                  </div>
                )}
                {outputUrl && outputBlob && (
                  <div className="compressor-result">
                    <div className="compressor-result-title">Compressed · WebM</div>
                    <div className="video-preview"><video src={outputUrl} controls playsInline /></div>
                    <div className="compressor-output-size">
                      <span>Output size</span>
                      <span className={outputFits ? "is-within-limit" : "is-over-limit"}>{formatSize(outputBlob.size)} / {formatTargetSize(targetMegabytes)}</span>
                    </div>
                    <p className={`video-fit-message${outputFits ? " is-fit" : " is-over"}`}>
                      {outputFits ? "Within your target size" : "Over target. Try a smaller target or lower resolution."}
                    </p>
                    <button type="button" className="tool-button tool-button-secondary compressor-action" onClick={downloadVideo}>
                      <Download size={15} aria-hidden="true" /> Download video
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {error && <p className="compressor-error" role="alert">{error}</p>}
        {!file && <p className="video-privacy-note">Encoding runs in your browser, not on our servers. The compression speed will vary based on your device's performance.</p>}
      </section>
    </main>
  );
}