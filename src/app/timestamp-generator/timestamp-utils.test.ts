import { describe, expect, it } from 'vitest';
import { formatRelativeTime } from './timestamp-utils.mjs';

const now = new Date('2026-10-30T12:00:00Z');

describe('formatRelativeTime', () => {
  it('formats 45 to 59 minute durations as minutes', () => {
    expect(formatRelativeTime(new Date(now.getTime() - 50 * 60_000), now)).toBe('50 minutes ago');
    expect(formatRelativeTime(new Date(now.getTime() + 59 * 60_000), now)).toBe('in 59 minutes');
  });

  it('uses singular units for one minute, hour, and day', () => {
    expect(formatRelativeTime(new Date(now.getTime() - 60_000), now)).toBe('1 minute ago');
    expect(formatRelativeTime(new Date(now.getTime() + 3_600_000), now)).toBe('in 1 hour');
    expect(formatRelativeTime(new Date(now.getTime() - 86_400_000), now)).toBe('1 day ago');
  });
});