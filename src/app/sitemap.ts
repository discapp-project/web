import type { MetadataRoute } from "next";
import { newsletterIndex } from "./data/newsletters";

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
  const articlePaths = newsletterIndex.map(({ slug }) => `/news/${slug}`);
  return [...paths, ...articlePaths].map((path) => ({
    url: `https://discapp.org${path}`,
    changeFrequency: path.startsWith("/news") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/privacy" || path === "/terms-of-use" ? 0.3 : path.startsWith("/news/") ? 0.7 : 0.8,
  }));
}