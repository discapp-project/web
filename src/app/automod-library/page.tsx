import { createPageMetadata } from "../page-metadata";
import AutomodLibrary from "./automod-library";

export const metadata = createPageMetadata({ title: "Discord AutoMod Rules Library | Discapp", description: "Browse and copy Discord AutoMod rules, keyword filters, and regular expressions for server moderation.", path: "/automod-library" });

export default function AutomodLibraryPage() {
  return <AutomodLibrary />;
}
