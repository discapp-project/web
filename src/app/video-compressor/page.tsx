import { createPageMetadata } from "../page-metadata";
import VideoCompressor from "./video-compressor";

export const metadata = createPageMetadata({
  title: "Discord Video Compressor | Discapp",
  description: "Compress videos for Discord upload limits in your browser. Adjust quality, resolution, and audio, then download your smaller video.",
  path: "/video-compressor",
});

export default function VideoCompressorPage() {
  return <VideoCompressor />;
}