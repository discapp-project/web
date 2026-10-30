export function formatRelativeTime(date, now = new Date()) {
  const differenceInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  const absoluteSeconds = Math.abs(differenceInSeconds);

  if (absoluteSeconds < 45) {
    return differenceInSeconds >= 0 ? "in a few seconds" : "a few seconds ago";
  }

  const value = absoluteSeconds < 3600
    ? Math.floor(absoluteSeconds / 60)
    : absoluteSeconds < 86400
      ? Math.floor(absoluteSeconds / 3600)
      : Math.floor(absoluteSeconds / 86400);
  const unit = absoluteSeconds < 3600 ? "minute" : absoluteSeconds < 86400 ? "hour" : "day";
  const amount = `${value} ${unit}${value === 1 ? "" : "s"}`;

  return differenceInSeconds >= 0 ? `in ${amount}` : `${amount} ago`;
}