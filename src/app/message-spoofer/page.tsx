import { createPageMetadata } from "../page-metadata";
import MessageSpoofer from "./message-spoofer";

export const metadata = createPageMetadata({
  title: "Message Spoofer | Discapp",
  description: "Create a fictional Discord message, customize its identity and role, and export the mockup.",
  path: "/message-spoofer",
});

export default function MessageSpooferPage() {
  return <MessageSpoofer />;
}
