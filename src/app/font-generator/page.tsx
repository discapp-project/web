import { createPageMetadata } from "../page-metadata";
import FontGenerator from "./font-generator";

export const metadata = createPageMetadata({ title: "Discord Font Generator | Discapp", description: "Convert text into decorative Unicode styles for Discord display names, bios, messages, and server channels.", path: "/font-generator" });

export default function FontGeneratorPage() {
  return <FontGenerator />;
}
