import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Spectral } from "next/font/google";
import Link from "next/link";
import TopbarMenu from "./components/TopbarMenu";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const spectral = Spectral({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-spectral",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#acf6a5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://discapp.org"),
  title: "Discapp | Discord Server Tools and Utilities",
  description: "Free Discord tools for server owners and communities: build webhooks, create role icons, calculate permissions, format timestamps, and more.",
  applicationName: "Discapp",
  category: "technology",
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Discapp | Discord Server Tools and Utilities",
    description: "Practical tools for Discord servers, roles, webhooks, moderation, and community management.",
    url: "/",
    siteName: "Discapp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/discapp-banner.png",
        width: 736,
        height: 411,
        alt: 'Discapp Thumbnail',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Discapp | Discord Server Tools and Utilities",
    description: "Practical tools for Discord servers, roles, webhooks, moderation, and community management.",
    images: ["/discapp-banner.png"],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${spectral.variable}`}>
        <div className="app-shell">
          <nav className="topbar" aria-label="Main navigation">
            <Link className="brand" href="/">DISCAPP</Link>
            <TopbarMenu />
          </nav>
          {children}
          <footer className="global-footer">
            <nav className="global-footer-links" aria-label="Footer">
              <a>© {new Date().getFullYear()} Discapp. All rights reserved.</a>
              <a href="mailto:support@discapp.org">support@discapp.org</a>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms-of-use">Terms of Use</Link>
            </nav>
            <p className="global-footer-disclaimer">
              Discapp is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Discord Inc.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}