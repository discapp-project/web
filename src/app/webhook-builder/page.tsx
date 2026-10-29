import { createPageMetadata } from "../page-metadata";
import WebhookBuilder from "./webhook-builder";

export const metadata = createPageMetadata({ title: "Discord Webhook Builder | Discapp", description: "Compose and preview Discord webhook messages with embeds, formatting, and attachments, then send them to a webhook URL.", path: "/webhook-builder" });

export default function WebhookBuilderPage() {
  return <WebhookBuilder />;
}
