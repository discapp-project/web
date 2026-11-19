import { createPageMetadata } from "../page-metadata";
import InviteQrCode from "./invite-qr-code";

export const metadata = createPageMetadata({
  title: "Discord Invite QR Code Generator | Discapp",
  description: "Create a custom QR code for any Discord server invite. Choose colors, gradients, patterns, and center symbols, then download it.",
  path: "/invite-qr-code",
});

export default function InviteQrCodePage() {
  return <InviteQrCode />;
}
