import { createPageMetadata } from "../page-metadata";
import RoleIconMaker from "./role-icon-maker";

export const metadata = createPageMetadata({ title: "Discord Role Icon Maker | Discapp", description: "Design Discord role icons with custom shapes, colors, gradients, borders, and image fills, then export your icon as a PNG.", path: "/role-icon-maker" });

export default function RoleIconMakerPage() {
  return <RoleIconMaker />;
}
