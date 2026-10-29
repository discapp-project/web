import { createPageMetadata } from "../page-metadata";
import VanityChecker from "./vanity-checker";

export const metadata = createPageMetadata({ title: "Discord Vanity URL Checker | Discapp", description: "Check whether a custom Discord server invite vanity URL is available before choosing it for your community.", path: "/vanity-checker" });

export default function VanityCheckerPage() {
  return <VanityChecker />;
}
