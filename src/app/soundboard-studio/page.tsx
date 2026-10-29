import { createPageMetadata } from "../page-metadata";
import SoundboardStudio from "./soundboard-studio";

export const metadata = createPageMetadata({ title: "Discord Soundboard Studio | Discapp", description: "Prepare sounds for a Discord soundboard with audio trimming and export controls in a browser-based studio.", path: "/soundboard-studio" });

export default function SoundboardStudioPage() {
  return <SoundboardStudio />;
}
