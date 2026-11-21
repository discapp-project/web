import { createPageMetadata } from "../page-metadata";
import SymbolLibrary from "./symbol-library";

export const metadata = createPageMetadata({
  title: "Discord Symbol Library | Discapp",
  description: "Browse, search, and copy hundreds of uncommon Unicode symbols for Discord names, messages, and profiles.",
  path: "/symbol-library",
});

export default function SymbolLibraryPage() {
  return <SymbolLibrary />;
}
