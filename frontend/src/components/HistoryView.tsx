"use client";

import { useState } from "react";
import type { HistoryEntry } from "@/lib/types";

interface HistoryViewProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onBack: () => void;
}

export function HistoryView({ history, onSelect, onBack }: HistoryViewProps) {
  return (
    <div className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
            Recognition History
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Your recent Springfield character identifications
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-black/10 bg-white/50 px-4 py-2 text-sm font-medium text-springfield-brown transition hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-springfield-brown dark:hover:bg-white/15"
        >
          Back to Classifier
        </button>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-springfield-blue/10 text-springfield-blue">
            <ClockIcon />
          </div>
          <p className="font-semibold text-[var(--text-primary)]">No identifications yet</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Upload a photo in the Classifier tab to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryCard({
  entry,
  onSelect,
}: {
  entry: HistoryEntry;
  onSelect: (entry: HistoryEntry) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const accent = entry.result.metadata?.color ?? "#5b9bd5";

  return (
    <button
      type="button"
      onClick={() => onSelect(entry)}
      className="history-card group flex flex-col overflow-hidden rounded-2xl text-left hover:shadow-md"
    >
      {imageError ? (
        <div
          className="flex h-40 w-full items-center justify-center text-4xl font-bold text-[var(--text-primary)]"
          style={{ backgroundColor: `${accent}33` }}
        >
          {entry.result.character.charAt(0)}
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={entry.previewUrl}
          alt={entry.result.character}
          className="h-40 w-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
      <div className="p-4">
        <p className="font-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-springfield-brown">
          {entry.result.character}
        </p>
        <p className="mt-1 font-mono text-sm text-springfield-blue">
          {entry.result.confidence}% confidence
        </p>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {new Date(entry.timestamp).toLocaleString()}
        </p>
      </div>
    </button>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
