import { createPageMetadata } from "../page-metadata";
import ModalDesigner from "./modal-designer";

export const metadata = createPageMetadata({
  title: "Discord Modal Designer | Discapp",
  description: "Design and preview Discord modal forms, validate text inputs, and export interaction response JSON.",
  path: "/modal-designer",
});

export default function ModalDesignerPage() {
  return <ModalDesigner />;
}