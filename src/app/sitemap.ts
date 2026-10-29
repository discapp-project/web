import type { MetadataRoute } from "next";

const paths = [
  "/",
  "/ansi-builder",
  "/asset-compressor",
  "/asset-resizer",
  "/asset-stealer",
  "/automod-library",
  "/automod-permission-decoder",
  "/automod-tester",
  "/font-generator",
  "/gradient-finder",
  "/markdown-cheatsheet",
  "/news",
  "/permission-calculator",
  "/privacy",
  "/regex-creator",
  "/role-icon-maker",
  "/rpc-builder",
  "/server-lookup",
  "/snowflake-decoder",
  "/soundboard-studio",
  "/space-generator",
  "/terms-of-use",
  "/timestamp-generator",
  "/user-lookup",
  "/vanity-checker",
  "/webhook-builder",
  "/webhook-json-formatter",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://discapp.org${path}`,
    changeFrequency: path === "/news" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/privacy" || path === "/terms-of-use" ? 0.3 : 0.8,
  }));
}