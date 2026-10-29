import { createPageMetadata } from "../page-metadata";
import UserLookup from "./user-lookup";

export const metadata = createPageMetadata({ title: "Discord User Lookup | Discapp", description: "Look up publicly available Discord user and profile information using a Discord user ID.", path: "/user-lookup" });

export default function UserLookupPage() {
  return <UserLookup />;
}
