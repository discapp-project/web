import { createPageMetadata } from "../page-metadata";
import TermsOfUse from "./terms-of-use";

export const metadata = createPageMetadata({ title: "Terms of Use | Discapp", description: "Review the terms and guidelines that apply when using the Discapp website and its free Discord community tools.", path: "/terms-of-use" });

export default function TermsOfUsePage() {
  return <TermsOfUse />;
}