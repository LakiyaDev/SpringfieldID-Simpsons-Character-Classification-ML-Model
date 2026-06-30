"use client";

import { motion } from "framer-motion";
import type { PredictionResult } from "@/lib/types";
import { ConfidenceChart } from "./ConfidenceChart";

interface AnalysisPanelProps {
  loading: boolean;
  result: PredictionResult | null;
  previewUrl: string | null;
  error: string | null;
  hasFile: boolean;
}

export function AnalysisPanel({
  loading,
  result,
  previewUrl,
  error,
  hasFile,
}: AnalysisPanelProps) {
  const accent = result?.metadata?.color ?? "#5b9bd5";

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="glass-panel flex flex-1 flex-col rounded-2xl p-6">
        {loading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <motion.div
              className="h-14 w-14 rounded-full border-[3px] border-springfield-blue/20 border-t-springfield-blue"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Analyzing resident...</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Azure Custom Vision AI at work</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <div className="error-panel-icon flex h-14 w-14 items-center justify-center rounded-full">
              <AlertIcon />
            </div>
            <p className="error-panel-title font-semibold">Analysis failed</p>
            <p className="error-panel-text text-sm">{error}</p>
          </div>
        ) : result && previewUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-1 flex-col gap-4"
          >
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={result.character}
                className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-md"
              />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Identified
                </p>
                <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                  {result.character}
                </h3>
                <p className="mt-1 font-mono text-lg font-semibold" style={{ color: accent }}>
                  {result.confidence}% confidence
                </p>
              </div>
            </div>

            {result.metadata && (
              <div className="space-y-2 text-sm text-[var(--text-muted)]">
                <p>
                  <span className="font-medium text-[var(--text-primary)]">Occupation:</span>{" "}
                  {result.metadata.occupation}
                </p>
                {result.metadata.quote && (
                  <p className="italic">&ldquo;{result.metadata.quote}&rdquo;</p>
                )}
                <p className="leading-relaxed">{result.metadata.description}</p>
              </div>
            )}

            <div className="mt-auto border-t border-black/5 pt-4">
              <ConfidenceChart predictions={result.predictions} />
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-springfield-blue/10 text-springfield-blue">
              <SearchPersonIcon />
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {hasFile ? "Ready to analyze" : "Awaiting Analysis"}
              </p>
              <p className="mt-1 max-w-xs text-sm text-[var(--text-muted)]">
                {hasFile
                  ? "Your photo is loaded. Analysis will begin automatically."
                  : "The resident's identity and confidence score will appear here."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="stat-card flex items-center gap-3 rounded-xl px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-springfield-blue/10 text-springfield-blue">
            <UsersIcon />
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)]">21+</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Characters
            </p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-3 rounded-xl px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
            <BoltIcon />
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)]">97.1%</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Model AP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPersonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="8" r="4" />
      <path d="M6 20c0-3.5 2-5.5 4-5.5s4 2 4 5.5" />
      <circle cx="17" cy="17" r="3" />
      <path d="M19.5 19.5L21 21" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M2 20c0-3.5 3-5.5 7-5.5M14 20c0-2.5 2-4 5-4" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}
