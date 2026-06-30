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
    <div className="page-card glass-panel">
      <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Recognition History
          </h2>
          <p className="mt-0.5 text-xs text-[var(--text-muted)] sm:mt-1 sm:text-sm">
            Your recent Springfield character identifications
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="w-full shrink-0 rounded-lg border border-black/10 bg-white/50 px-3 py-2 text-xs font-medium text-springfield-brown transition hover:bg-white/80 sm:w-auto sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
        >
          Back to Classifier
        </button>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center sm:py-20">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-springfield-blue/10 text-springfield-blue sm:mb-4 sm:h-16 sm:w-16">
            <ClockIcon />
          </div>
          <p className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
            No identifications yet
          </p>
          <p className="mt-1 max-w-[14rem] text-xs text-[var(--text-muted)] sm:max-w-none sm:text-sm">
            Upload a photo in the Classifier tab to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
      className="history-card group flex flex-col overflow-hidden rounded-xl text-left sm:rounded-2xl"
    >
      {imageError ? (
        <div
          className="flex h-28 w-full items-center justify-center text-2xl font-bold text-[var(--text-primary)] sm:h-40 sm:text-4xl"
          style={{ backgroundColor: `${accent}33` }}
        >
          {entry.result.character.charAt(0)}
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={entry.previewUrl}
          alt={entry.result.character}
          className="h-28 w-full object-cover sm:h-40"
          onError={() => setImageError(true)}
        />
      )}
      <div className="p-3 sm:p-4">
        <p className="font-serif text-sm font-bold text-[var(--text-primary)] group-hover:text-springfield-brown sm:text-lg">
          {entry.result.character}
        </p>
        <p className="mt-0.5 font-mono text-xs text-springfield-blue sm:mt-1 sm:text-sm">
          {entry.result.confidence}% confidence
        </p>
        <p className="mt-1 text-[0.625rem] text-[var(--text-muted)] sm:mt-2 sm:text-xs">
          {new Date(entry.timestamp).toLocaleString()}
        </p>
      </div>
    </button>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="sm:h-7 sm:w-7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
