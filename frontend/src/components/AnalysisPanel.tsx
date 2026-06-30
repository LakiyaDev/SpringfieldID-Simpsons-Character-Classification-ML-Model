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
    <div className="flex h-full flex-col gap-3 sm:gap-4">
      <div className="analysis-shell flex min-h-[9.5rem] flex-1 flex-col rounded-xl sm:min-h-[12rem] sm:rounded-2xl">
        {loading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-3 py-6 text-center sm:gap-4 sm:px-4 sm:py-8">
            <motion.div
              className="h-10 w-10 rounded-full border-[3px] border-springfield-blue/20 border-t-springfield-blue sm:h-12 sm:w-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                Analyzing resident...
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-muted)] sm:mt-1 sm:text-sm">
                Azure Custom Vision AI at work
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-6 text-center sm:gap-3 sm:px-4 sm:py-8">
            <div className="error-panel-icon flex h-11 w-11 items-center justify-center rounded-full sm:h-14 sm:w-14">
              <AlertIcon />
            </div>
            <p className="error-panel-title text-sm font-semibold sm:text-base">Analysis failed</p>
            <p className="error-panel-text max-w-xs text-xs sm:text-sm">{error}</p>
          </div>
        ) : result && previewUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-4"
          >
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={result.character}
                className="h-16 w-16 shrink-0 rounded-lg object-cover shadow-md sm:h-20 sm:w-20 sm:rounded-xl"
              />
              <div className="min-w-0">
                <p className="text-[0.625rem] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                  Identified
                </p>
                <h3 className="font-serif text-lg font-bold break-words text-[var(--text-primary)] sm:text-2xl">
                  {result.character}
                </h3>
                <p
                  className="mt-0.5 font-mono text-sm font-semibold sm:mt-1 sm:text-lg"
                  style={{ color: accent }}
                >
                  {result.confidence}% confidence
                </p>
              </div>
            </div>

            {result.metadata && (
              <div className="space-y-1.5 rounded-lg border border-black/5 bg-white/20 p-3 text-xs text-[var(--text-muted)] sm:space-y-2 sm:rounded-xl sm:p-4 sm:text-sm dark:border-white/10 dark:bg-white/5">
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

            <div className="mt-auto border-t border-black/5 pt-3 sm:pt-4 dark:border-white/10">
              <ConfidenceChart predictions={result.predictions} />
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-6 text-center sm:gap-3 sm:py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-springfield-blue/10 text-springfield-blue sm:h-14 sm:w-14">
              <SearchPersonIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                {hasFile ? "Ready to analyze" : "Results appear here"}
              </p>
              <p className="mt-0.5 max-w-[13rem] text-xs leading-relaxed text-[var(--text-muted)] sm:mt-1 sm:max-w-xs sm:text-sm">
                {hasFile
                  ? "Your photo is loaded. Analysis starts automatically."
                  : "Upload a character photo to see the match and confidence score."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="stat-card flex items-center gap-2 rounded-lg px-2.5 py-2 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-springfield-blue/10 text-springfield-blue sm:h-9 sm:w-9 sm:rounded-lg">
            <UsersIcon />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--text-primary)] sm:text-lg">20+</p>
            <p className="text-[0.5625rem] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-[10px]">
              Characters
            </p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-2 rounded-lg px-2.5 py-2 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 sm:h-9 sm:w-9 sm:rounded-lg">
            <BoltIcon />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--text-primary)] sm:text-lg">97.1%</p>
            <p className="text-[0.5625rem] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-[10px]">
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="8" r="4" />
      <path d="M6 20c0-3.5 2-5.5 4-5.5s4 2 4 5.5" />
      <circle cx="17" cy="17" r="3" />
      <path d="M19.5 19.5L21 21" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M2 20c0-3.5 3-5.5 7-5.5M14 20c0-2.5 2-4 5-4" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}
