import { createPageMetadata } from "../page-metadata";
import MentionGenerator from "./mention-generator";

export const metadata = createPageMetadata({ title: "Discord Mention Generator | Discapp", description: "Generate Discord mention syntax for users, roles, channels, custom emojis, slash commands, and broadcast mentions.", path: "/mention-generator" });

export default function MentionGeneratorPage() {
  return <MentionGenerator />;
}