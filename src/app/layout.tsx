import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import BugReportButton from "./components/BugReportButton";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  themeColor: "#acf6a5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://discapp.org"),
  manifest: '/manifest.json',
  openGraph: {
    images: [
      {
        url: '/discapp-mini-nobg.png',
        width: 1200,
        height: 630,
        alt: 'Discapp Thumbnail',
      },
    ],
  },
  twitter: {
    card: 'summary',
    images: ['/discapp-mini-nobg.png'],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.variable}>
        <div className="app-shell">
          <nav className="topbar" aria-label="Main navigation">
            <Link className="brand" href="/">DISCAPP</Link>
            <div className="topbar-actions">
              <Link className="topbar-link" href="https://discord.gg/ymc3Ba4qk9">Join the Community!</Link>
              <BugReportButton />
              <Link 
                href="https://github.com/discapp-project" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Discapp on GitHub"
                className="topbar-link"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
            </div>
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