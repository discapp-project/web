'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';

const mentionTypes = [
  { value: 'user', label: 'User' },
  { value: 'role', label: 'Role' },
  { value: 'channel', label: 'Channel' },
  { value: 'emoji', label: 'Custom emoji' },
  { value: 'command', label: 'Slash command' },
  { value: 'everyone', label: '@everyone' },
  { value: 'here', label: '@here' },
] as const;

type MentionType = typeof mentionTypes[number]['value'];

export default function MentionGenerator() {
  const [mentionType, setMentionType] = useState<MentionType>('user');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [isNicknameStyle, setIsNicknameStyle] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const needsId = ['user', 'role', 'channel', 'emoji', 'command'].includes(mentionType);
  const isIdValid = /^\d{1,20}$/.test(id.trim());
  const needsName = mentionType === 'emoji' || mentionType === 'command';
  const isNameValid = !needsName || /^[\w-]+(?:[ /][\w-]+)*$/.test(name.trim());
  const canGenerate = (!needsId || isIdValid) && isNameValid;

  const generatedMention = !canGenerate
    ? ''
    : mentionType === 'user'
      ? `<@${isNicknameStyle ? '!' : ''}${id.trim()}>`
      : mentionType === 'role'
        ? `<@&${id.trim()}>`
        : mentionType === 'channel'
          ? `<#${id.trim()}>`
          : mentionType === 'emoji'
            ? `<${isAnimated ? 'a' : ''}:${name.trim()}:${id.trim()}>`
            : mentionType === 'command'
              ? `</${name.trim()}:${id.trim()}>`
              : mentionType === 'everyone'
                ? '@everyone'
                : '@here';

  const copyMention = async () => {
    try {
      await navigator.clipboard.writeText(generatedMention);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
  };

  const updateType = (value: string) => {
    setMentionType(value as MentionType);
    setId('');
    setName('');
    setCopyStatus('idle');
  };

  return (
    <main className="tool-page">
      <header className="tool-page-heading">
        <p className="page-kicker">Text and formatting</p>
        <h1>Discord Mention Generator</h1>
        <p>Build mention syntax for Discord users, roles, channels, emojis, and commands.</p>
      </header>

      <section className="tool-panel mention-panel" aria-label="Mention settings">
        <div className={`mention-fields${needsId ? '' : ' mention-fields-single'}`}>
          <div className="tool-field">
            <label htmlFor="mention-type">Mention type</label>
            <select className="tool-select" id="mention-type" value={mentionType} onChange={(event) => updateType(event.target.value)}>
              {mentionTypes.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          {needsId && (
            <div className="tool-field">
              <label htmlFor="mention-id">{mentionType === 'emoji' ? 'Emoji ID' : mentionType === 'command' ? 'Command ID' : `${mentionType[0].toUpperCase()}${mentionType.slice(1)} ID`}</label>
              <input
                className="tool-input"
                id="mention-id"
                inputMode="numeric"
                value={id}
                placeholder="123456789012345678"
                onChange={(event) => {
                  setId(event.target.value);
                  setCopyStatus('idle');
                }}
                aria-invalid={Boolean(id) && !isIdValid}
              />
              {Boolean(id) && !isIdValid && <span className="mention-field-error">Enter an ID containing up to 20 digits.</span>}
            </div>
          )}

          {needsName && (
            <div className="tool-field mention-wide-field">
              <label htmlFor="mention-name">{mentionType === 'emoji' ? 'Emoji name' : 'Command name or path'}</label>
              <input
                className="tool-input"
                id="mention-name"
                value={name}
                placeholder={mentionType === 'emoji' ? 'party_blob' : 'help or admin ban'}
                onChange={(event) => {
                  setName(event.target.value);
                  setCopyStatus('idle');
                }}
                aria-invalid={Boolean(name) && !isNameValid}
              />
              {Boolean(name) && !isNameValid && <span className="mention-field-error">Use letters, numbers, underscores, hyphens, and command path spaces.</span>}
            </div>
          )}
        </div>

        {mentionType === 'user' && (
          <label className="mention-checkbox">
            <input type="checkbox" checked={isNicknameStyle} onChange={(event) => { setIsNicknameStyle(event.target.checked); setCopyStatus('idle'); }} />
            Use nickname-style syntax (&lt;@!ID&gt;)
          </label>
        )}

        {mentionType === 'emoji' && (
          <label className="mention-checkbox">
            <input type="checkbox" checked={isAnimated} onChange={(event) => { setIsAnimated(event.target.checked); setCopyStatus('idle'); }} />
            Animated emoji
          </label>
        )}

        <div className="mention-output-row">
          <code className="tool-code-output" aria-label="Generated mention">{generatedMention || 'Enter the required details to generate a mention.'}</code>
          <button className="tool-button tool-button-primary" type="button" onClick={copyMention} disabled={!canGenerate}>
            <Copy size={15} aria-hidden="true" /> {copyStatus === 'success' ? 'Copied' : 'Copy mention'}
          </button>
        </div>
        <p className="tool-status" role="status" aria-live="polite">
          {copyStatus === 'success'
            ? 'Mention syntax copied to clipboard.'
            : copyStatus === 'error'
              ? 'Clipboard access failed. Select and copy the mention manually.'
              : mentionType === 'everyone' || mentionType === 'here'
                ? 'These broadcast mentions can notify many members when sent in Discord.'
                : 'Paste the generated syntax into a Discord message.'}
        </p>
      </section>
    </main>
  );
}