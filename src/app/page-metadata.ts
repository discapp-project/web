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
      images: [{ url: "/discapp-banner.png", width: 736, height: 411, alt: "Discapp" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/discapp-banner.png"],
    },
  };
}