import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Discapp",
      locale: "en_US",
      type: "website",
      images: [{ url: "/discapp-mini-nobg.png", width: 1200, height: 630, alt: "Discapp" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/discapp-mini-nobg.png"],
    },
  };
}