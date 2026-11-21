"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AlertTriangle, Upload, Image as ImageIcon, Quote,
} from "lucide-react";

type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  roleColor: string;
  roleGradient: string;
  gradientEnabled: boolean;
  bot: boolean;
  verified: boolean;
  tags: string[];
};

type Message = {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  edited: boolean;
  attachment: string;
};

const initialUsers: UserProfile[] = [
  { id: "u1", name: "User", avatar: "", roleColor: "#5865F2", roleGradient: "#5865F2", gradientEnabled: false, bot: false, verified: false, tags: [] },
];

const initialMessages: Message[] = [
  { id: "m1", authorId: "u1", content: "This is a message preview!", timestamp: "Today at 12:00 PM", edited: false, attachment: "" },
];

export default function MessageSpoofer() {
  const [users, setUsers] = useState(initialUsers);
  const [messages, setMessages] = useState(initialMessages);
  const selectedUserId = "u1";
  const selectedMessageId = "m1";
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [exportWidth, setExportWidth] = useState(960);
  const uploadRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? users[0];
  const selectedMessage = messages.find((message) => message.id === selectedMessageId) ?? messages[0];

  const updateUser = (patch: Partial<UserProfile>) => {
    setUsers((current) => current.map((user) => user.id === selectedUserId ? { ...user, ...patch } : user));
  };

  const updateMessage = (patch: Partial<Message>) => {
    setMessages((current) => current.map((message) => message.id === selectedMessageId ? { ...message, ...patch } : message));
  };

  const handleAvatarUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateUser({ avatar: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const markdownWrap = (before: string, after = before, block = false) => {
    if (!selectedMessage) return;
    const input = messageInputRef.current;
    const content = selectedMessage.content;
    let start = input?.selectionStart ?? 0;
    let end = input?.selectionEnd ?? content.length;

    if (start === end && block) {
      start = content.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = content.indexOf("\n", start);
      end = lineEnd < 0 ? content.length : lineEnd;
    } else if (start === end && content.length > 0) {
      const words = /\S+/g;
      let word: RegExpExecArray | null;
      while ((word = words.exec(content)) !== null) {
        const wordEnd = word.index + word[0].length;
        if (start >= word.index && start <= wordEnd) {
          start = word.index;
          end = wordEnd;
          break;
        }
      }
    }

    const selection = content.slice(start, end);
    let nextContent: string;
    let selectionStart: number;
    let selectionEnd: number;
    const markerCharacter = before[0];
    const countMarker = (value: string, fromEnd = false) => {
      let count = 0;
      if (fromEnd) {
        for (let index = value.length - 1; index >= 0 && value[index] === markerCharacter; index--) count++;
      } else {
        for (let index = 0; index < value.length && value[index] === markerCharacter; index++) count++;
      }
      return count;
    };
    const canUnwrap = (leftCount: number, rightCount: number) => {
      if (before === "*") return leftCount % 2 === 1 && rightCount % 2 === 1;
      return leftCount >= before.length && rightCount >= after.length;
    };

    if (block) {
      const lines = selection.split("\n");
      const isQuoted = selection.length > 0 && lines.every((line) => line.startsWith("> "));
      const formatted = isQuoted
        ? lines.map((line) => line.slice(2)).join("\n")
        : lines.map((line) => `> ${line}`).join("\n");
      nextContent = content.slice(0, start) + formatted + content.slice(end);
      selectionStart = start;
      selectionEnd = start + formatted.length;
    } else if (
      selection.length >= before.length + after.length &&
      selection.startsWith(before) &&
      selection.endsWith(after) &&
      canUnwrap(countMarker(selection), countMarker(selection, true))
    ) {
      const unwrapped = selection.slice(before.length, selection.length - after.length);
      nextContent = content.slice(0, start) + unwrapped + content.slice(end);
      selectionStart = start;
      selectionEnd = start + unwrapped.length;
    } else if (
      canUnwrap(countMarker(content.slice(0, start), true), countMarker(content.slice(end))) &&
      start >= before.length &&
      content.slice(start - before.length, start) === before &&
      content.slice(end, end + after.length) === after
    ) {
      nextContent = content.slice(0, start - before.length) + selection + content.slice(end + after.length);
      selectionStart = start - before.length;
      selectionEnd = selectionStart + selection.length;
    } else {
      nextContent = content.slice(0, start) + before + selection + after + content.slice(end);
      selectionStart = start + before.length;
      selectionEnd = selectionStart + selection.length;
    }

    updateMessage({ content: nextContent });
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const exportImage = async () => {
    const canvas = document.createElement("canvas");
    const width = exportWidth;
    const dark = theme === "dark";
    const avatarImages = new Map<string, HTMLImageElement>();

    await Promise.all(users.map(async (user) => {
      if (!user.avatar.startsWith("data:")) return;
      const image = await new Promise<HTMLImageElement | null>((resolve) => {
        const loaded = new Image();
        loaded.onload = () => resolve(loaded);
        loaded.onerror = () => resolve(null);
        loaded.src = user.avatar;
      });
      if (image) avatarImages.set(user.id, image);
    }));

    const contentWidth = width - 104;
    let estimatedHeight = 76;
    for (const message of messages) {
      const clean = message.content.replace(/[*_~`>#-]/g, "");
      const lines = Math.max(1, Math.ceil(clean.length / Math.max(20, Math.floor(contentWidth / 8))));
      estimatedHeight += 44 + (lines - 1) * 22 + (message.attachment ? 150 : 0);
    }

    canvas.width = width;
    canvas.height = Math.max(100, estimatedHeight);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = dark ? "#313338" : "#FFFFFF";
    ctx.fillRect(0, 0, width, canvas.height);
    let y = 52;

    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      const author = users.find((user) => user.id === message.authorId);
      if (!author) continue;
      const previous = index > 0 ? users.find((user) => user.id === messages[index - 1].authorId) : null;
      const grouped = previous?.id === author.id;

      if (!grouped) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(42, y - 6, 20, 0, Math.PI * 2);
        ctx.clip();
        const avatar = avatarImages.get(author.id);
        if (avatar) ctx.drawImage(avatar, 22, y - 26, 40, 40);
        else {
          ctx.fillStyle = author.roleColor;
          ctx.fillRect(22, y - 26, 40, 40);
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "700 11px Arial";
          ctx.textAlign = "center";
          ctx.fillText(getInitials(author.name), 42, y - 2);
          ctx.textAlign = "left";
        }
        ctx.restore();

        ctx.fillStyle = author.gradientEnabled ? author.roleColor : author.roleColor;
        ctx.font = "700 14px Arial";
        ctx.fillText(author.name, 78, y - 8);
        let nameWidth = ctx.measureText(author.name).width;

        for (const tag of author.tags.slice(0, 3)) {
          ctx.fillStyle = dark ? "#2B2D31" : "#EBEDEF";
          ctx.fillRect(76 + nameWidth, y - 19, ctx.measureText(tag).width + 10, 15);
          ctx.strokeStyle = dark ? "#4E5058" : "#C4C9CE";
          ctx.strokeRect(76 + nameWidth, y - 19, ctx.measureText(tag).width + 10, 15);
          ctx.fillStyle = dark ? "#B5BAC1" : "#4E5058";
          ctx.font = "800 8px Arial";
          ctx.fillText(tag, 81 + nameWidth, y - 9);
          nameWidth += ctx.measureText(tag).width + 15;
        }

        ctx.fillStyle = dark ? "#949BA4" : "#61666D";
        ctx.font = "11px Arial";
        ctx.fillText(message.timestamp, 78 + nameWidth + 16, y - 8);
      }

      ctx.fillStyle = dark ? "#DBDEE1" : "#313338";
      ctx.font = "15px Arial";
      const clean = message.content.replace(/[*_~`>#-]/g, "");
      const words = clean.split(/\s+/);
      let line = "";
      let lineY = y + 15;
      for (const word of words) {
        const test = `${line}${word} `;
        if (ctx.measureText(test).width > contentWidth && line) {
          ctx.fillText(line, 78, lineY);
          line = `${word} `;
          lineY += 22;
        } else line = test;
      }
      ctx.fillText(line, 78, lineY);

      y += 24 + (lineY - (y + 15));
      y += 20;
    }

    const link = document.createElement("a");
    link.download = "fictional-conversation.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const getInitials = (name: string) => name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <main className="tool-page message-spoofer-page">
      <header className="tool-page-heading">
        <h1>Message Spoofer</h1>
        <p>Create a spoofed message for mockups, stories, and design previews.</p>
      </header>

      <section className="message-spoofer-layout">
        <section className="message-spoofer-preview-column">
          <div className="message-spoofer-preview-stage">
            <div className={`message-spoofer-preview conversation-theme-${theme}`} style={{ width: `${exportWidth}px` }}>
              {selectedMessage && (
                <article className="message-spoofer-message">
                  <span className="conversation-avatar" style={{ background: users[0].avatar ? `url(${users[0].avatar}) center/cover` : users[0].roleColor }}>{!users[0].avatar && getInitials(users[0].name)}</span>
                  <div className="conversation-message-body">
                    <div className="conversation-message-author">
                      <strong style={users[0].gradientEnabled ? { backgroundImage: `linear-gradient(90deg, ${users[0].roleColor}, ${users[0].roleGradient})`, WebkitBackgroundClip: "text", color: "transparent" } : { color: users[0].roleColor }}>{users[0].name}</strong>
                      {users[0].bot && <span className="conversation-bot-tag">APP</span>}
                      {users[0].verified && <span className="conversation-verified">✓</span>}
                      <time>{selectedMessage.timestamp}</time>{selectedMessage.edited && <small>(edited)</small>}
                    </div>
                    {selectedMessage.content && <div className="conversation-markdown"><ReactMarkdown>{selectedMessage.content}</ReactMarkdown></div>}
                    {selectedMessage.attachment && <div className="conversation-attachment" role="img" aria-label="Message attachment" style={{ backgroundImage: `url(${selectedMessage.attachment})` }} />}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <aside className="message-spoofer-controls">
          <div className="message-control-section">
            <h2>User</h2>
            {selectedUser && (
              <>
                <label className="conversation-field"><span>Display name</span><input value={selectedUser.name} onChange={(event) => updateUser({ name: event.target.value })} /></label>
                <label className="conversation-field"><span>Avatar URL</span><input value={selectedUser.avatar.startsWith("data:") ? "" : selectedUser.avatar} placeholder="https://example.com/avatar.png" onChange={(event) => updateUser({ avatar: event.target.value })} /></label>
                <input ref={uploadRef} type="file" accept="image/*" hidden onChange={(event) => handleAvatarUpload(event.target.files?.[0])} />
                <button className="conversation-secondary-button" type="button" onClick={() => uploadRef.current?.click()}><Upload size={14} /> Upload avatar</button>
                <div className={`message-control-grid message-role-colors${selectedUser.gradientEnabled ? " is-gradient-enabled" : ""}`}>
                  <label className="conversation-field"><span>Role color</span><input type="color" value={selectedUser.roleColor} onChange={(event) => updateUser({ roleColor: event.target.value })} /></label>
                  {selectedUser.gradientEnabled && <label className="conversation-field"><span>Role gradient</span><input type="color" value={selectedUser.roleGradient} onChange={(event) => updateUser({ roleGradient: event.target.value })} /></label>}
                </div>
                <div className="conversation-check-grid message-spoofer-options">
                  <label className="conversation-check"><input type="checkbox" checked={selectedUser.bot} onChange={(event) => updateUser({ bot: event.target.checked })} /><span>BOT badge</span></label>
                  <label className="conversation-check"><input type="checkbox" checked={selectedUser.verified} onChange={(event) => updateUser({ verified: event.target.checked })} /><span>Verified Icon</span></label>
                  <label className="conversation-check"><input type="checkbox" checked={selectedUser.gradientEnabled} onChange={(event) => updateUser({ gradientEnabled: event.target.checked })} /><span>Enable Gradient</span></label>
                  {selectedMessage && <label className="conversation-check"><input type="checkbox" checked={selectedMessage.edited} onChange={(event) => updateMessage({ edited: event.target.checked })} /><span>Show edited</span></label>}
                </div>
              </>
            )}
          </div>

          {selectedMessage && (
            <div className="message-control-section">
              <h2>Message</h2>
              <div className="message-control-grid">
                <label className="conversation-field"><span>Time</span><input value={selectedMessage.timestamp} onChange={(event) => updateMessage({ timestamp: event.target.value })} /></label>
                <label className="conversation-field"><span>Theme</span><select value={theme} onChange={(event) => setTheme(event.target.value as "dark" | "light")}><option value="dark">Dark</option><option value="light">Light</option></select></label>
              </div>
              <label className="conversation-field"><span>PNG width</span><select value={exportWidth} onChange={(event) => setExportWidth(Number(event.target.value))}><option value={720}>720 px</option><option value={960}>960 px</option><option value={1200}>1200 px</option></select></label>
              <div className="conversation-markdown-toolbar" aria-label="Markdown toolbar" onMouseDown={(event) => event.preventDefault()}>
                <button type="button" onClick={() => markdownWrap("**")} title="Bold" aria-label="Bold"><b>B</b></button>
                <button type="button" onClick={() => markdownWrap("*")} title="Italic" aria-label="Italic"><i>I</i></button>
                <button type="button" onClick={() => markdownWrap("~~", "~~")} title="Strikethrough" aria-label="Strikethrough"><s>S</s></button>
                <button type="button" onClick={() => markdownWrap("`", "`")} title="Code" aria-label="Code"><b>&lt;/&gt;</b></button>
                <button type="button" onClick={() => markdownWrap("> ", "", true)} title="Quote" aria-label="Quote"><Quote size={14} /></button>
              </div>
              <label className="conversation-field"><textarea ref={messageInputRef} value={selectedMessage.content} onChange={(event) => updateMessage({ content: event.target.value })} placeholder="Write the message..." /></label>
              <label className="conversation-field"><span>Attachment URL</span><input value={selectedMessage.attachment} placeholder="https://..." onChange={(event) => updateMessage({ attachment: event.target.value })} /></label>
            </div>
          )}

          <div className="conversation-warning" role="alert">
            <AlertTriangle size={18} aria-hidden="true" />
              <p><strong>Warning:</strong> Using this tool to deceive, impersonate, harass, defraud, or spread malicious misinformation is strictly prohibited.</p>
          </div>

          <div className="message-control-section message-export-section">
            <h2>Export</h2>
            <button className="conversation-primary-button" type="button" onClick={exportImage}><ImageIcon size={15} /> Download PNG</button>
          </div>
        </aside>
      </section>
    </main>
  );
}
