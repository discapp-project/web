import { createPageMetadata } from "../page-metadata";
import ModalBuilder from "./modal-builder";

export const metadata = createPageMetadata({
  title: "Discord Modal Builder | Discapp",
  description: "Design and preview Discord modal forms, validate text inputs, and export interaction response JSON.",
  path: "/modal-builder",
});

export default function ModalBuilderPage() {
  return <ModalBuilder />;
}