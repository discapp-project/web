import { createPageMetadata } from "../page-metadata";
import AssetCompressor from "./asset-compressor";

export const metadata = createPageMetadata({ title: "Discord Emoji and Sticker Compressor | Discapp", description: "Compress image assets for Discord emojis and stickers, compare the result, and download a smaller file from your browser.", path: "/asset-compressor" });

export default function AssetCompressorPage() {
  return <AssetCompressor />;
}
