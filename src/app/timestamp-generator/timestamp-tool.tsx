'use client';

import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { formatRelativeTime } from './timestamp-utils.mjs';

const formats = [
  { code: 'R', name: 'Relative time', example: (date: Date) => formatRelativeTime(date) },
  { code: 'f', name: 'Short date and time', example: (date: Date) => `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}` },
  { code: 'F', name: 'Long date and time', example: (date: Date) => `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}` },
  { code: 'd', name: 'Short date', example: (date: Date) => date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) },
  { code: 'D', name: 'Long date', example: (date: Date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  { code: 't', name: 'Short time', example: (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) },
  { code: 'T', name: 'Long time', example: (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' }) },
];

function parseDateTimeInput(value: string) {
  const [datePart, timePart] = value.split('T');
  if (!datePart || !timePart) return null;
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatToDateTimeInput(date: Date) {
  const pad = (value: number) => value.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function TimestampGenerator() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [dateInputValue, setDateInputValue] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('R');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDateInputValue(formatToDateTimeInput(new Date()));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const unixTimestamp = Math.floor(selectedDate.getTime() / 1000);
  const generatedCode = `<t:${unixTimestamp}:${selectedFormat}>`;
  const activeFormat = formats.find(({ code }) => code === selectedFormat) ?? formats[0];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
  };

  const setNow = () => {
    const now = new Date();
    setSelectedDate(now);
    setDateInputValue(formatToDateTimeInput(now));
    setCopyStatus('idle');
  };

  return (
    <main className="tool-page">
      <header className="tool-page-heading">
        <p className="page-kicker">Time and scheduling</p>
        <h1>Discord Timestamp Generator</h1>
        <p>Create a timestamp that displays in each reader&apos;s local timezone.</p>
      </header>

      <section className="tool-panel timestamp-panel" aria-label="Timestamp settings">
        <div className="tool-field">
          <label htmlFor="timestamp-date">Target date and time</label>
          <div className="tool-control-row">
            <input
              className="tool-input"
              id="timestamp-date"
              type="datetime-local"
              value={dateInputValue}
              onChange={(event) => {
                setDateInputValue(event.target.value);
                const nextDate = parseDateTimeInput(event.target.value);
                if (nextDate) setSelectedDate(nextDate);
                setCopyStatus('idle');
              }}
            />
            <button className="tool-button tool-button-secondary" type="button" onClick={setNow}>Set to now</button>
          </div>
        </div>

        <div className="tool-field">
          <label htmlFor="timestamp-format">Timestamp display format</label>
          <select
            className="tool-select"
            id="timestamp-format"
            value={selectedFormat}
            onChange={(event) => {
              setSelectedFormat(event.target.value);
              setCopyStatus('idle');
            }}
          >
            {formats.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>

        <div className="timestamp-output-row">
          <code className="tool-code-output">{generatedCode}</code>
          <button className="tool-button tool-button-primary" type="button" onClick={copyCode}>
            <Copy size={15} aria-hidden="true" /> {copyStatus === 'success' ? 'Copied' : 'Copy code'}
          </button>
        </div>
        <p className="tool-status" role="status" aria-live="polite">
          {copyStatus === 'success' ? 'Timestamp copied to clipboard.' : copyStatus === 'error' ? 'Clipboard access failed. Select and copy the timestamp manually.' : `Preview: ${activeFormat.example(selectedDate)}`}
        </p>
      </section>
    </main>
  );
}