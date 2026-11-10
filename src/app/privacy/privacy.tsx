"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111214",
        color: "#f2f3f5",
        fontFamily: "inherit",
        padding: "80px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#80848e", fontSize: "14px", margin: 0 }}>
            Last updated: 2026-11-10
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              1. Accounts and Browser Storage
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Discord sign-in is optional and handled by Supabase Auth. The requested Discord scope is <code>identify</code>; it does not request access to email or servers. Discapp&apos;s profile table stores the Supabase user ID, Discord user ID, and display name. It does not store email, avatar, or Discord OAuth tokens. Supabase manages authentication records and session cookies under its <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a>; Discord&apos;s handling is described in its <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a>. Signing out ends the active session. The Role Icon Maker stores settings and uploaded images in browser localStorage; clearing this site&apos;s browser storage removes them. Other image and design tools generally process files in the browser unless a feature states otherwise. hCaptcha may use cookies and process device, browser, network, and interaction data for security; see its <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a>.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              2. Bug Reports
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Bug reports include the submitted title and details, page path, browser and device information, language, time zone, screen and viewport dimensions, and pixel ratio. Reports are sent to a Discord support channel and are not stored in Discapp&apos;s application database. Discord channel access determines who can view reports; Discord&apos;s policies and channel management determine their retention. The report service temporarily uses the connection IP for an in-memory rate limit of up to ten minutes. The IP is not included in the report.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              3. Abuse Prevention
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              hCaptcha protects bug reports and user lookups from automated abuse. Verification tokens are sent to hCaptcha for validation. hCaptcha&apos;s <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a> and <a href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Terms</a> apply to its processing.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              4. Hosting and Analytics
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: "0 0 8px 0" }}>
              <strong style={{ color: "#dbdee1" }}>Analytics:</strong> Discapp does not currently load Vercel Analytics or another analytics script.
            </p>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              <strong style={{ color: "#dbdee1" }}>Hosting and security:</strong> Hosting and security providers may process IP address, request time, route, and browser information to operate and protect the site. Logging and retention depend on provider settings. See Vercel&apos;s <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a>.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              5. Discord Lookups
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              User Lookup sends the entered Discord user ID through a Discapp API route to Discord. Server Lookup and Vanity URL Checker send invite or vanity codes from the browser to Discord. Lookup inputs and results are not stored in Discapp&apos;s application database. Discord&apos;s <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a> applies to its processing.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: 0 }}>
              6. Webhook Builder
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              The Webhook Builder sends the provided webhook URL, message content, files, and message or thread identifiers through Discapp&apos;s API to Discord. A webhook URL can control the associated webhook; use only authorized URLs and keep them private. These request contents are not stored in Discapp&apos;s application database. Discord&apos;s policies govern messages sent through its service.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              7. Use and Disclosure
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Discapp does not sell personal information or use it for advertising or marketing. Information is shared with service providers only as needed to deliver requested features, prevent abuse, or operate the site. Each provider&apos;s privacy terms apply to its processing.
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid #232428",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              Contact Information
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Questions about this policy or Discapp&apos;s handling of information may be sent to{" "}
              <a
                href="mailto:legal@discapp.org"
                style={{
                  color: "#acf6c8",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                legal@discapp.org
              </a>
              .
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}