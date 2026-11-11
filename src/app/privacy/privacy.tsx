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
            Last updated: 2026-11-11
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
              1. Information Collection and Storage
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Discapp collects limited information necessary to operate our services:
            </p>
            <ul style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: "8px 0 0 20px", padding: 0 }}>
              <li>
                <strong style={{ color: "#dbdee1" }}>Account Data:</strong> Optional sign-in is processed via Supabase Auth using Discord&apos;s <code>identify</code> scope. We store your Supabase user ID, Discord user ID, and display name. Public profile and vanity link details (slug, invite code, title, and description) are publicly visible.
              </li>
              <li>
                <strong style={{ color: "#dbdee1" }}>Local &amp; Session Storage:</strong> Unsubmitted forms are kept temporarily in <code>sessionStorage</code>. Tool preferences and user-uploaded media are stored in your browser&apos;s <code>localStorage</code> and can be deleted by clearing your browser data.
              </li>
            </ul>
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
              2. Feature Data Processing
            </h2>
            <ul style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0, paddingLeft: "20px" }}>
              <li>
                <strong style={{ color: "#dbdee1" }}>Bug Reports:</strong> Reports containing your text input, browser, device, and viewport details are forwarded to a Discord support channel. IP addresses are processed in-memory for up to 10 minutes strictly for rate limiting and are not stored.
              </li>
              <li>
                <strong style={{ color: "#dbdee1" }}>Discord Lookups &amp; Webhooks:</strong> Search queries (user IDs, invite codes) and webhook payloads (content, target URLs) are transmitted through our API to Discord. We do not persist these inputs or results in our database.
              </li>
            </ul>
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
              3. Third-Party Services
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              We share data with infrastructure providers solely to operate, secure, and prevent abuse on our platform. Third-party handling is governed by their respective privacy terms:
            </p>
            <ul style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: "8px 0 0 20px", padding: 0 }}>
              <li>
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Supabase Privacy Policy</a> (Authentication &amp; Database)
              </li>
              <li>
                <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Discord Privacy Policy</a> (OAuth &amp; API Services)
              </li>
              <li>
                <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>hCaptcha Privacy Policy</a> (Bot Protection &amp; Security)
              </li>
              <li>
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#acf6c8" }}>Vercel Privacy Policy</a> (Hosting &amp; Server Logs)
              </li>
            </ul>
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
              4. Data Use &amp; Disclosure
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Discapp does not sell, rent, or monetize your personal information, nor do we use it for advertising or marketing purposes.
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
              5. Children&apos;s Privacy
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              Discapp is not directed to children under 13 (or under 16 in the EEA). We do not knowingly collect or store personal information from children under these ages. If you believe a child has provided us with personal information, please contact us so we can promptly delete it.
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
              6. Your Rights &amp; Data Retention
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              You may request access to, correction of, or deletion of your personal data at any time. Account data is retained until you delete your account or request data removal. Local browser storage can be cleared manually via your browser settings.
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
              7. Changes to This Policy
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised &quot;Last updated&quot; date.
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
              8. Contact Us
            </h2>
            <p style={{ color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              For questions regarding this policy or to exercise your privacy rights, contact{" "}
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