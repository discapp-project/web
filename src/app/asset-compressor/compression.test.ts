import { describe, expect, it } from 'vitest';
import { compressToLimit } from './compression.mjs';

describe('compressToLimit', () => {
  it('reduces quality until output meets the limit', async () => {
    const attempts: number[] = [];
    const result = await compressToLimit(async (quality) => {
      attempts.push(quality);
      return new Blob([new Uint8Array(Math.ceil(400_000 * quality))]);
    }, 256_000, 0.8);

    expect(result.blob?.size).toBeLessThanOrEqual(256_000);
    expect(attempts.length).toBeGreaterThan(1);
  });

  it('reduces dimensions when quality alone is insufficient and reports impossible limits', async () => {
    const result = await compressToLimit(async (_quality, scale) => (
      new Blob([new Uint8Array(Math.ceil(1_000_000 * scale * scale))])
    ), 100_000, 0.1);

    expect(result.blob?.size).toBeLessThanOrEqual(100_000);

    const impossible = await compressToLimit(async () => new Blob([new Uint8Array(200_000)]), 100_000, 0.1);
    expect(impossible.blob).toBeNull();
  });
});