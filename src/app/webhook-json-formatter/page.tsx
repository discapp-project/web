import { createPageMetadata } from "../page-metadata";
import WebhookJsonFormatter from "./webhook-json-formatter";

export const metadata = createPageMetadata({ title: "Discord Webhook JSON Formatter | Discapp", description: "Format and validate Discord webhook JSON payloads with readable indentation and clear parsing errors.", path: "/webhook-json-formatter" });

export default function WebhookJsonFormatterPage() {
  return <WebhookJsonFormatter />;
}
