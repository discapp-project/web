import { createPageMetadata } from "../page-metadata";
import SpaceGenerator from "./space-generator";

export const metadata = createPageMetadata({ title: "Discord Zero-Width Space Generator | Discapp", description: "Insert zero-width spaces into Discord text for channel formatting and precise text layouts, with a preview of invisible characters.", path: "/space-generator" });

export default function SpaceGeneratorPage() {
  return <SpaceGenerator />;
}