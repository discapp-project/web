import { createPageMetadata } from "../page-metadata";
import SnowflakeDecoder from "./snowflake-decoder";

export const metadata = createPageMetadata({ title: "Discord Snowflake Decoder | Discapp", description: "Decode a Discord snowflake ID to see its creation timestamp and related date information.", path: "/snowflake-decoder" });

export default function SnowflakeDecoderPage() {
  return <SnowflakeDecoder />;
}
