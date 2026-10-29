import { createPageMetadata } from "../page-metadata";
import RpcBuilder from "./rpc-builder";

export const metadata = createPageMetadata({ title: "Discord Rich Presence Builder | Discapp", description: "Configure a custom Discord Rich Presence activity, preview its details, and generate the settings for your client.", path: "/rpc-builder" });

export default function RpcBuilderPage() {
  return <RpcBuilder />;
}
