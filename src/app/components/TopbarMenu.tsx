"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthControl from "./AuthControl";
import BugReportButton from "./BugReportButton";

export default function TopbarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`topbar-menu${isOpen ? " is-open" : ""}`}>
      <button
        className="topbar-menu-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="topbar-actions"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <div className="topbar-actions" id="topbar-actions">
        <Link className="topbar-link topbar-community" href="https://discord.gg/zRrTVfuAMN">Join the Community!</Link>
        <BugReportButton />
        <AuthControl />
        <Link
          href="https://github.com/discapp-project/web"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Discapp on GitHub"
          className="topbar-link topbar-github-link"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <span className="topbar-github-label">GitHub</span>
        </Link>
      </div>
    </div>
  );
}