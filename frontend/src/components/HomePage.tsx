"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { UploadZone } from "@/components/UploadZone";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { HistoryView } from "@/components/HistoryView";
import { checkApiHealth, predictCharacter } from "@/lib/api";
import {
  collectHistoryUrls,
  createPreviewUrl,
  revokeDroppedHistoryUrls,
  revokePreviewUrlIfUnused,
} from "@/lib/previewUrls";
import type { HistoryEntry, PredictionResult } from "@/lib/types";

type Tab = "classifier" | "history";

export function HomePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("classifier");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [azureReady, setAzureReady] = useState<boolean | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    checkApiHealth().then(({ azureConfigured }) => setAzureReady(azureConfigured));
  }, []);

  useEffect(() => {
    setActiveTab(searchParams.get("tab") === "history" ? "history" : "classifier");
  }, [searchParams]);

  // Revoke all blob URLs when leaving the page
  useEffect(() => {
    return () => {
      history.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup on unmount only
  }, []);

  const runPrediction = useCallback(async (file: File, previewForSession: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await predictCharacter(file);
      setResult(prediction);

      // Dedicated blob URL per history entry so new uploads don't break older thumbnails
      const historyPreviewUrl = createPreviewUrl(file);

      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        result: prediction,
        previewUrl: historyPreviewUrl,
      };

      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 24);
        const keep = new Set([historyPreviewUrl, previewForSession]);
        revokeDroppedHistoryUrls(prev, next, keep);
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      setSelectedFile(file);
      setResult(null);
      setError(null);

      const url = createPreviewUrl(file);
      setPreviewUrl((prev) => {
        revokePreviewUrlIfUnused(prev, collectHistoryUrls(history), null);
        return url;
      });

      void runPrediction(file, url);
    },
    [runPrediction, history]
  );

  const handleHistorySelect = (entry: HistoryEntry) => {
    setResult(entry.result);
    setPreviewUrl(entry.previewUrl);
    setSelectedFile(null);
    setError(null);
    setActiveTab("classifier");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedBackground />
      <Header homeTab={activeTab} onHomeTabChange={setActiveTab} />

      <main className="page-main mx-auto w-full max-w-6xl flex-1 lg:px-8">
        {activeTab === "history" ? (
          <HistoryView
            history={history}
            onSelect={handleHistorySelect}
            onBack={() => setActiveTab("classifier")}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-card glass-panel"
          >
            <div className="mb-5 text-center sm:mb-8 md:text-left">
              <span className="inline-flex rounded-full bg-springfield-blue/12 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-springfield-blue sm:text-xs">
                Springfield AI
              </span>
              <h2 className="mt-2 font-serif text-xl font-bold leading-tight text-[var(--text-primary)] sm:mt-3 sm:text-3xl md:text-4xl">
                Who is this Springfield Resident?
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)] sm:mt-2 sm:text-sm">
                Upload a photo to identify characters instantly using our Springfield AI.
              </p>

              {azureReady === false && (
                <p className="mt-3 alert-banner rounded-lg px-3 py-2 text-xs sm:mt-4 sm:rounded-xl sm:px-4 sm:text-sm">
                  Azure is not configured. Add your Custom Vision keys to{" "}
                  <code className="rounded bg-black/10 px-1 dark:bg-black/30">backend/.env</code> and
                  restart the API.
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
              <UploadZone
                onFileSelect={handleFileSelect}
                previewUrl={previewUrl}
                disabled={loading}
              />

              <AnalysisPanel
                loading={loading}
                result={result}
                previewUrl={previewUrl}
                error={error}
                hasFile={Boolean(selectedFile)}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-black/5 pt-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6 dark:border-white/10">
              <div className="hidden items-center gap-2 sm:flex sm:gap-3">
                <div className="flex -space-x-2">
                  {["#FFD90F", "#4ECDC4", "#FF6B35", "#A8E6CF"].map((color) => (
                    <div
                      key={color}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-[var(--text-primary)] shadow-sm sm:h-8 sm:w-8 sm:text-xs"
                      style={{ backgroundColor: color }}
                    >
                      {color === "#FFD90F"
                        ? "H"
                        : color === "#4ECDC4"
                          ? "M"
                          : color === "#FF6B35"
                            ? "B"
                            : "L"}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-[var(--text-muted)] sm:text-sm">
                  Trusted by fans worldwide
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-springfield-blue/20 bg-springfield-blue/8 px-3 py-2.5 text-xs font-semibold text-springfield-blue transition hover:bg-springfield-blue/14 sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm sm:font-medium"
              >
                <ClockIcon />
                View Recognition History
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
