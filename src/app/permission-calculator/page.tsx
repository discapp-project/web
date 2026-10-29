import { createPageMetadata } from "../page-metadata";
import PermissionCalculator from "./permission-calculator";

export const metadata = createPageMetadata({ title: "Discord Permission Calculator | Discapp", description: "Calculate Discord role and bot permissions with a visual permission calculator. Select permissions and copy the resulting bitfield.", path: "/permission-calculator" });

export default function PermissionCalculatorPage() {
  return <PermissionCalculator />;
}
