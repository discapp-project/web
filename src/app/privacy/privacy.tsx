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
            Last updated: 2026-10-30
          </p>
        </div>

        <p
          style={{
            color: "#dbdee1",
            fontSize: "15px",
            lineHeight: "1.7",
            margin: 0,
          }}
        >
          I&apos;m a solo developer building Discapp to offer useful, free tools for Discord communities. Here&apos;s a plain-language explanation of what happens to information when you use the site. Some tools work entirely in your browser; a few features need to contact Discapp&apos;s services or another provider.
        </p>

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
              1. Accounts, Cookies, and Browser Storage
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              You don&apos;t need an account or login. I don&apos;t use Discapp cookies for advertising or analytics. The Role Icon Maker saves your settings and uploaded images in your browser&apos;s localStorage, so your design is there if you come back on the same device. You can remove it by clearing this site&apos;s browser storage. Other image and design tools generally work in your browser and don&apos;t upload your files unless a feature says it will. hCaptcha is provided by another company and may use cookies or similar storage for security; see its <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a>.
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
              2. If You Send a Bug Report
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              If you send me a bug report, I receive the title and details you write, the page you were on, your browser and platform, language, timezone, screen and viewport sizes, and pixel ratio. I forward the report to a Discord channel I use for support, where people with channel access can read it. I don&apos;t keep a separate copy in a Discapp database. I don&apos;t set a fixed deletion schedule for Discord messages, so how long a report stays there depends on channel management and Discord&apos;s policies. To limit spam, the report service temporarily uses the IP address supplied by the hosting network for an in-memory rate limit of up to ten minutes; that IP isn&apos;t included in the report sent to Discord.
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
              3. Keeping the Site Safe
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              I use hCaptcha to help prevent automated abuse of bug reports and user lookups. The verification token goes to Discapp and is checked with hCaptcha. hCaptcha may also process device, browser, network, and interaction signals under its own policies. You can read hCaptcha&apos;s <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a> and <a href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Terms</a>.
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
              <strong style={{ color: "#dbdee1" }}>Analytics:</strong> I don&apos;t currently load Vercel Analytics or another analytics script in the app. If that changes, I&apos;ll update this policy to explain what is used.
            </p>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              <strong style={{ color: "#dbdee1" }}>Hosting and security:</strong> The companies that host and protect the site may process basic connection details, such as your IP address, request time, page or API route, and browser information, to make the site work and help prevent abuse. Their settings determine what gets logged and for how long; I don&apos;t set one retention period for all of those records. You can read Vercel&apos;s <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a> for its practices.
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
              When you use User Lookup, the Discord user ID you enter goes through a Discapp API route to Discord, and the result comes back to your browser. Server Lookup and Vanity URL Checker send the invite or vanity code directly from your browser to Discord. Discord handles those requests under its <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Privacy Policy</a>. I don&apos;t intentionally save lookup inputs or results in a Discapp database.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: 0 }}>
              6. Webhook Builder
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              When you use the Webhook Builder, the webhook URL, message content, optional files, and any message link or thread ID you provide pass through my API service to Discord so it can retrieve or send the message you asked for. A webhook URL can control the associated Discord webhook, so only use one you&apos;re allowed to use and keep it private. I don&apos;t intentionally save these request contents in a Discapp database. Discord may keep messages sent through its service under its own policies.
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
              7. How I Use and Share Information
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              I don&apos;t sell personal information or use it for advertising or marketing. When a feature needs another service, I send it only the information needed to provide that feature, help prevent abuse, or keep the site running. Discord, hCaptcha, and hosting providers handle information under their own terms and privacy practices.
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
              Have a question about this policy or the way Discapp handles information? Email me at{" "}
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