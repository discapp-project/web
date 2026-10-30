export async function compressToLimit(encode, maxSizeBytes, startingQuality) {
  let quality = Math.min(1, Math.max(0.1, startingQuality));
  let scale = 1;

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const blob = await encode(quality, scale);
    if (blob && blob.size <= maxSizeBytes) return { blob, quality, scale };

    if (quality > 0.1) {
      quality = Math.max(0.1, Math.round((quality - 0.1) * 100) / 100);
    } else {
      scale = Math.round(scale * 0.85 * 10_000) / 10_000;
      if (scale < 0.1) break;
    }
  }

  return { blob: null, quality, scale };
}