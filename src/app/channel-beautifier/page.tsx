import { createPageMetadata } from "../page-metadata";
import ChannelBeautifier from "./channel-beautifier";

export const metadata = createPageMetadata({
  title: "Discord Channel Beautifier | Discapp",
  description: "Create styled Discord channel names with Unicode fonts, separator bars, brackets, arrows, and channel-friendly decorations.",
  path: "/channel-beautifier",
});

export default function ChannelBeautifierPage() {
  return <ChannelBeautifier />;
}
