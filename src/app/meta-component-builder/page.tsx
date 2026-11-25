import { createPageMetadata } from "../page-metadata";
import MetaComponentBuilder from "./meta-component-builder";

export const metadata = createPageMetadata({
  title: "Meta Component Builder | Discapp",
  description: "Create website embeds for Discord with full component support.",
  path: "/meta-component-builder",
});

export default function MetaComponentBuilderPage() {
  return <MetaComponentBuilder />;
}
