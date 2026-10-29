import { createPageMetadata } from "../page-metadata";
import News from "./news";

export const metadata = createPageMetadata({ title: "Discapp News and Updates", description: "Read the latest Discapp product announcements, new Discord tools, feature releases, and community updates.", path: "/news" });

export default function NewsPage() {
  return <News />;
}
