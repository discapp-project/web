import { createPageMetadata } from "../page-metadata";
import AssetStealer from "./asset-stealer";

export const metadata = createPageMetadata({ title: "Discord Server Asset Downloader | Discapp", description: "Find and download accessible images and assets from a Discord server using its invite or server details.", path: "/asset-stealer" });

export default function AssetStealerPage() {
  return <AssetStealer />;
}
