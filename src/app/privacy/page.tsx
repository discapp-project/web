import { createPageMetadata } from "../page-metadata";
import Privacy from "./privacy";

export const metadata = createPageMetadata({ title: "Privacy Policy | Discapp", description: "Read the Discapp privacy policy to learn what information our website collects, how it is used, and the choices available to you.", path: "/privacy" });

export default function PrivacyPage() {
  return <Privacy />;
}
