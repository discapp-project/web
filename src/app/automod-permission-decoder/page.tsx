import { createPageMetadata } from "../page-metadata";
import AutomodPermissionDecoder from "./automod-permission-decoder";

export const metadata = createPageMetadata({ title: "Discord AutoMod Permission Decoder | Discapp", description: "Decode Discord AutoMod permission values into readable flags to inspect moderation access and configuration.", path: "/automod-permission-decoder" });

export default function AutomodPermissionDecoderPage() {
  return <AutomodPermissionDecoder />;
}
