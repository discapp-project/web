"use client";

import React from "react";

const textStyle = { color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 };
const headingStyle = { fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: 0 };

const sections = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "Account data (optional sign-in). Signing in is optional and uses Discord login, processed through Supabase Authentication. Supabase's authentication system automatically stores the email address associated with your Discord account. We do not use this email for any purpose. In our own database we store an automatically generated user ID (UUID), your Discord user ID, your Discord username, and any vanity link details you create (slug, invite code, title, and description). Once we can sort out how to remove the requirement of email that Supabases puts on us, we will remove it and delete all emails immediately.",
      "Vanity Links. Vanity link details are not listed publicly on Discapp. The title and description you configure may appear as link preview metadata (for example, in Discord embeds) wherever your link is shared, and the redirect destination is visible to anyone who opens your link. We do not log or track visits to vanity links, other than the standard hosting logs described below.",
      "Bug reports. If you submit a bug report, we receive the title and message you write, the page you were on, your browser's user agent, and basic device details (platform, language, time zone, screen size, viewport size, and pixel ratio). Bug reports are not linked to your account. If you include personal or account details in your message, they will be stored with it, so please don't. Reports are sent to a private Discord channel that only our site developers can access. IP addresses are processed in memory for up to 10 minutes solely for rate limiting and are not stored with the report.",
      "Discord lookups and webhooks. Search queries (such as user IDs and invite codes) and webhook payloads (content and target URLs) are sent through our API to Discord to return results or deliver messages. We do not store these inputs or results.",
      "Files and tool inputs. Our file tools (such as the compressors, resizers, Role Icon Maker, and Soundboard Studio) run entirely in your browser. We do not upload, receive, or store your files on our servers.",
      "Browser storage. Tool preferences and media you load into the tools are kept in your browser's localStorage, and unsubmitted forms are kept temporarily in sessionStorage. You can remove these by clearing your browser data.",
      "Hosting and security logs. Our hosting provider keeps standard server logs (such as IP address, request, and timestamp), and our bot-protection provider processes technical data to detect abuse (see Section 3).",
    ],
  },
  {
    title: "2. Cookies and Similar Technologies",
    paragraphs: ["Discapp does not use advertising or analytics cookies or trackers. We use only what is needed to operate the site:"],
    bullets: [
      "Authentication: Supabase stores session tokens (in cookies or browser storage) to keep you signed in.",
      "Bot protection: hCaptcha may set cookies and process technical data such as IP address, browser, and interaction data to tell humans from bots.",
      "Preferences: Tool settings are kept in localStorage, as described above.",
      "We use Google Search Console, verified through DNS, to see how our site appears in Google Search. It does not place tracking code in your browser.",
    ],
  },
  {
    title: "3. Third-Party Services",
    paragraphs: ["We use these providers to operate, secure, and prevent abuse on the site. Their handling of data is governed by their own policies:"],
    bullets: ["Supabase (authentication and database)", "Discord (login, API services, and images such as avatars and emojis loaded from Discord's content delivery network)", "hCaptcha (bot protection and security)", "Vercel (hosting and server logs)", "Google (Search Console)"],
  },
  {
    title: "4. How We Use Information",
    paragraphs: ["We use information only to:"],
    bullets: ["Provide the features you use, including sign-in and vanity links.", "Fix bugs and improve the site.", "Secure the site, prevent abuse, and enforce our Terms of Use.", "Respond to your requests and comply with legal obligations."],
  },
  {
    title: "5. Legal Bases for Processing (EEA/UK)",
    paragraphs: ["If you are in the European Economic Area or the United Kingdom, we process your information on these bases:"],
    bullets: ["Contract: account and vanity link data, to provide the features you request.", "Legitimate interests: bug reports (fixing issues), and rate limiting, server logs, and hCaptcha (security and abuse prevention).", "Strictly necessary or requested functionality: browser storage for your sessions and preferences."],
  },
  {
    title: "6. Sharing and Disclosure",
    paragraphs: ["We do not sell, rent, or share your personal information. We disclose information only to the service providers listed above so they can operate the site for us, and where required by law or valid legal process, or where needed to protect the rights, safety, or security of Discapp, our users, or others."],
  },
  {
    title: "7. Retention and Deletion",
    paragraphs: [
      "Accounts. Account data is kept until you delete your account. You can delete your account at any time from your profile by typing \"confirm.\" This permanently removes your account data and vanity links, including your authentication record. We keep no backups of user data, so deletion takes effect right away. If you think an error prevented deletion, contact us and we will check it for you.",
      "Bug reports. Bug reports are kept until the channel they are stored in or the individual report is deleted. Because they are not linked to your account, they are not removed when you delete your account. To request removal of a specific report, email us with the time you submitted it or the text of your message so we can find it, and we will delete it.",
      "Logs and third parties. Hosting and security logs are kept by our providers under their own retention policies.",
    ],
  },
  {
    title: "8. Your Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of your personal information at any time. To do so, delete your account from your profile or email legal@discapp.org. We will respond within 30 days.",
      "EEA/UK residents: you may also request a copy of your data, restrict or object to processing, and lodge a complaint with your local data protection authority.",
      "California and other US state residents: you may have rights to know, access, correct, and delete your personal information. We do not sell or share personal information as those laws define the terms, and we will not discriminate against you for exercising your rights.",
    ],
  },
  { title: "9. International Data Transfers", paragraphs: ["Discapp is operated from the United States, and our providers process data in the U.S. and other countries. By using the site, you understand that your information will be processed there."] },
  { title: "10. Security", paragraphs: ["We rely on HTTPS and the security measures of our infrastructure providers, and we limit access to stored data to our site developers. No method of transmission or storage is completely secure, so we cannot guarantee absolute security."] },
  { title: "11. Children's Privacy", paragraphs: ["Discapp is not directed to children under 13 (or under 16 in the EEA). We do not knowingly collect or store personal information from children under these ages. If you believe a child has provided us with personal information, please contact us so we can promptly delete it."] },
  { title: "12. Changes to This Policy", paragraphs: ["We may update this Privacy Policy from time to time. The \"Last updated\" date will change, and we will post a notice on the site or on the News page for material changes."] },
  { title: "13. Contact Us", paragraphs: ["For questions about this policy or to exercise your privacy rights, contact legal@discapp.org. For support, contact support@discapp.org."] },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111214", color: "#f2f3f5", fontFamily: "inherit", padding: "80px 20px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.5px", margin: 0 }}>Privacy Policy</h1>
          <p style={{ color: "#80848e", fontSize: "14px", margin: 0 }}>Last updated: 2026-11-21</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {sections.map((section) => (
            <section key={section.title} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 style={headingStyle}>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} style={textStyle}>{paragraph}</p>)}
              {section.bullets && (
                <ul style={{ ...textStyle, margin: "8px 0 0 20px", padding: 0 }}>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
