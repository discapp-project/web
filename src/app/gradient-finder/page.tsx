import { createPageMetadata } from "../page-metadata";
import GradientFinder from "./gradient-finder";

export const metadata = createPageMetadata({ title: "Discord Role Gradient Finder | Discapp", description: "Explore color combinations and gradients for Discord roles, preview swatches, and copy the colors you want to use.", path: "/gradient-finder" });

export default function GradientFinderPage() {
  return <GradientFinder />;
}
