import { createPageMetadata } from "./page-metadata";
import Home from "./home";

export const metadata = createPageMetadata({
  title: "Discapp | Discord Server Tools and Utilities",
  description: "Free Discord tools for server owners and communities: build webhooks, create role icons, calculate permissions, format timestamps, and more.",
  path: "/",
});

export default function HomePage() {
  return <Home />;
}
