import { createPageMetadata } from "../page-metadata";
import MarkdownCheatsheet from "./markdown-cheatsheet";

export const metadata = createPageMetadata({ title: "Discord Markdown Cheatsheet | Discapp", description: "Reference Discord Markdown syntax for bold, italics, spoilers, code blocks, quotes, and message formatting.", path: "/markdown-cheatsheet" });

export default function MarkdownCheatsheetPage() {
  return <MarkdownCheatsheet />;
}
