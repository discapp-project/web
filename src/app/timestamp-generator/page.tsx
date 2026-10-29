import { createPageMetadata } from "../page-metadata";
import TimestampGenerator from "./timestamp-generator";

export const metadata = createPageMetadata({ title: "Discord Timestamp Generator | Discapp", description: "Create Discord timestamps from a date and time, choose a display format, and copy the timestamp for your message.", path: "/timestamp-generator" });

export default function TimestampGeneratorPage() {
  return <TimestampGenerator />;
}
