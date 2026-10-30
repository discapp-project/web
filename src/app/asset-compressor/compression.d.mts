export function compressToLimit(
  encode: (quality: number, scale: number) => Promise<Blob | null>,
  maxSizeBytes: number,
  startingQuality: number,
): Promise<{ blob: Blob | null; quality: number; scale: number }>;