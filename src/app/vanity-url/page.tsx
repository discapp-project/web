import { createPageMetadata } from "../page-metadata";
import VanityLinkManager from "./vanity-link-manager";

export const metadata = createPageMetadata({
  title: "Custom Vanity Link | Discapp",
  description: "Register and manage one custom Discapp link for a Discord invite.",
  path: "/vanity-url",
});

export default function VanityLinksPage() {
  return <VanityLinkManager />;
}