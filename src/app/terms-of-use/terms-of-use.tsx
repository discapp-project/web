"use client";

import React from "react";

const textStyle = { color: "#949ba4", fontSize: "14px", lineHeight: "1.6", margin: 0 };
const headingStyle = { fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: 0 };

const sections = [
  { title: "1. Service Description & Eligibility", paragraphs: ["discapp.org provides free utilities for Discord users. You must be at least 13 years of age (or the legal minimum age in your jurisdiction) to use this site. Services and tools are provided \"as is\" and may be modified or discontinued at any time without notice."] },
  { title: "2. No Official Affiliation", paragraphs: ["discapp.org is an independent project and is NOT affiliated with, authorized, maintained, sponsored, or endorsed by Discord Inc. Discord trademarks belong solely to Discord Inc."] },
  { title: "3. Accounts & Vanity Links", paragraphs: ["Signing in is optional and is done through Discord. You are responsible for activity under your account.", "Custom vanity links redirect visitors to a Discord invite you provide. You may configure a title and description that can appear as link preview metadata (for example, in Discord embeds) wherever your link is shared. Discapp does not list or display vanity links on the site itself.", "Once you register a vanity link, it remains yours as long as you comply with these Terms. Vanity links are provided as a service, not as property or a permanent right, and we may delete, restrict, or reassign a link where we find a violation of these Terms or other reasonable cause."] },
  { title: "4. Acceptable Use", paragraphs: ["Discapp keeps restrictions to a minimum, but you may not use the site to:"], bullets: ["Violate any applicable law, or submit or link to unlawful content, including content that sexually exploits minors or non-consensual intimate imagery.", "Impersonate any person, organization, or Discord staff, or use any tool (including the Message Spoofer) to create fake messages, screenshots, or other content intended to deceive, defraud, harass, or defame.", "Scam, phish, distribute malware, or direct people to sites or servers that do.", "Threaten, harass, or dox others.", "Abuse the site's infrastructure, attempt unauthorized access, bypass security controls (e.g., hCaptcha), scrape data via automated tools, or transmit malicious code."] },
  { title: "5. User Content", paragraphs: ["You retain ownership of the content you submit (such as vanity link names, titles, descriptions, and invite codes). You grant Discapp a non-exclusive, worldwide, royalty-free license to store and use that content to operate the redirect service and to generate link previews when your link is shared. You are solely responsible for ensuring you have the necessary rights to any content, webhooks, or files you process through our services. We do not pre-screen user content and do not endorse it. We may remove content or links at our discretion."] },
  { title: "6. Reporting Abuse", paragraphs: ["To report a vanity link or other content that violates these Terms, including content that you believe is unlawful or infringes your rights, email support@discapp.org with the link and a short explanation. We review reports and may remove content, terminate links, or restrict accounts."] },
  { title: "7. Third-Party Tools, Content & Integrations", paragraphs: ["Certain features rely on third-party services including Vercel, Supabase, hCaptcha, and Discord. Your use of these features is subject to the respective terms and privacy policies of those providers, and your use of Discord-related features remains subject to Discord's own terms. Lookup and asset tools return information that comes from Discord or from content you provide. We do not guarantee its accuracy, and files you process remain the property of their owners."] },
  { title: "8. Intellectual Property & Open Source", paragraphs: ["Discapp's original branding and site design are protected by intellectual property laws. Website source code hosted in our public repository is subject to its separate repository license. Third-party libraries, patterns, and assets remain the property of their respective owners and are used under license or permission."] },
  { title: "9. Termination & Account Deletion", paragraphs: ["You may delete your account at any time from your profile. Deleting your account permanently removes the account data we hold about you, including your vanity links. The exception is bug reports you have submitted, which we keep for logging purposes. They contain only your message and basic device information and are not personally identifiable. Information held by third-party providers is governed by their own policies.", "We reserve the right to block access, terminate vanity links, suspend accounts, or limit site features for any user who violates these Terms or engages in abuse. Sections that by their nature should survive termination (including Sections 10 through 13) will do so."] },
  { title: "10. Disclaimer of Warranties", paragraphs: ["The site and all related utilities are provided \"as is\" and \"as available\" without warranties of any kind, express or implied, including fitness for a particular purpose, uptime, accuracy, or non-infringement."] },
  { title: "11. Limitation of Liability", paragraphs: ["To the maximum extent permitted by law, discapp.org and its operators will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the site or its services. In any case, our total liability for all claims will not exceed US$100."] },
  { title: "12. Indemnification", paragraphs: ["You agree to indemnify and hold harmless Discapp and its operators from any claims, damages, or expenses arising from your content, your use of the site, or your violation of these Terms."] },
  { title: "13. Governing Law, Informal Resolution & Venue", paragraphs: ["These Terms are governed by the laws of the State of Georgia, United States, without regard to conflict of law principles.", "Before filing any claim, you agree to first contact us at legal@discapp.org with a written description of the dispute and what you are asking for, and to work with us in good faith to resolve it informally for at least 30 days. We are willing to make changes within reason. Any time limit for bringing a claim is paused while this informal process is underway. This does not prevent either party from seeking urgent court relief to stop ongoing abuse or protect intellectual property.", "If a dispute is not resolved informally, you agree that it will be brought exclusively in the state or federal courts located in the State of Georgia."] },
  { title: "14. Changes to Terms", paragraphs: ["We may update these Terms of Use from time to time. The \"Last updated\" date will change, and we will post a notice on the site or on the News page for material changes. Continued use of the site after updates take effect means you accept the revised Terms."] },
  { title: "15. General", paragraphs: ["If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and effect. These Terms are the entire agreement between you and Discapp regarding the site. Our failure to enforce a provision is not a waiver of it."] },
  { title: "16. Contact Us", paragraphs: ["For legal inquiries regarding these Terms of Use, contact legal@discapp.org. For support or to report abuse, contact support@discapp.org."] },
];

export default function TermsOfUse() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111214", color: "#f2f3f5", fontFamily: "inherit", padding: "80px 20px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.5px", margin: 0 }}>Terms of Use</h1>
          <p style={{ color: "#80848e", fontSize: "14px", margin: 0 }}>Last updated: 2026-11-21</p>
        </div>
        <p style={{ color: "#dbdee1", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>By accessing or using discapp.org, you agree to be bound by these Terms of Use. If you do not agree, do not use the site.</p>
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
