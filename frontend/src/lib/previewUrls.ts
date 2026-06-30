/**
 * Track blob URLs so we never revoke URLs still used by history entries.
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokePreviewUrlIfUnused(
  url: string | null,
  historyUrls: ReadonlySet<string>,
  currentPreview: string | null
): void {
  if (!url) return;
  if (historyUrls.has(url)) return;
  if (url === currentPreview) return;
  URL.revokeObjectURL(url);
}

export function collectHistoryUrls(history: { previewUrl: string }[]): Set<string> {
  return new Set(history.map((entry) => entry.previewUrl));
}

export function revokeDroppedHistoryUrls(
  previous: { previewUrl: string }[],
  next: { previewUrl: string }[],
  keepUrls: ReadonlySet<string>
): void {
  const nextUrls = new Set(next.map((e) => e.previewUrl));
  for (const entry of previous) {
    if (!nextUrls.has(entry.previewUrl) && !keepUrls.has(entry.previewUrl)) {
      URL.revokeObjectURL(entry.previewUrl);
    }
  }
}
