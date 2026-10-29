import { createPageMetadata } from "../page-metadata";
import ServerLookup from "./server-lookup";

export const metadata = createPageMetadata({ title: "Discord Server Lookup | Discapp", description: "Look up public Discord server details from an invite link, including available server information and community statistics.", path: "/server-lookup" });

export default function ServerLookupPage() {
  return <ServerLookup />;
}
