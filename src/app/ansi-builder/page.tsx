import { createPageMetadata } from "../page-metadata";
import AnsiBuilder from "./ansi-builder";

export const metadata = createPageMetadata({ title: "Discord ANSI Text Builder | Discapp", description: "Format Discord ANSI code blocks with colored text, backgrounds, and text styles, then copy the generated message output.", path: "/ansi-builder" });

export default function AnsiBuilderPage() {
  return <AnsiBuilder />;
}
