import { createPageMetadata } from "../page-metadata";
import AssetResizer from "./asset-resizer";

export const metadata = createPageMetadata({ title: "Discord Asset Resizer | Discapp", description: "Resize and position images for Discord server icons, banners, profile assets, and other supported image formats.", path: "/asset-resizer" });

export default function AssetResizerPage() {
  return <AssetResizer />;
}
