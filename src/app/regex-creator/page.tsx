import { createPageMetadata } from "../page-metadata";
import RegexCreator from "./regex-creator";

export const metadata = createPageMetadata({ title: "Discord AutoMod Regex Creator | Discapp", description: "Create and test regular expressions for Discord AutoMod rules with a focused regex builder for server moderators.", path: "/regex-creator" });

export default function RegexCreatorPage() {
  return <RegexCreator />;
}
