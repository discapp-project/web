import { createPageMetadata } from "../page-metadata";
import AutomodTester from "./automod-tester";

export const metadata = createPageMetadata({ title: "Discord AutoMod Rule Tester | Discapp", description: "Test Discord AutoMod regular expressions and keywords against sample messages before using them on a server.", path: "/automod-tester" });

export default function AutomodTesterPage() {
  return <AutomodTester />;
}
