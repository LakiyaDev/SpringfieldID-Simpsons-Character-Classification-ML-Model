"use client";

import { motion } from "framer-motion";
import type { PredictionItem } from "@/lib/types";

interface ConfidenceChartProps {
  predictions: PredictionItem[];
}

export function ConfidenceChart({ predictions }: ConfidenceChartProps) {
  if (predictions.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        Top predictions
      </h4>
      {predictions.map((p, i) => (
        <motion.div
          key={p.tagName}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="space-y-1"
        >
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-primary)]">{p.tagName}</span>
            <span className="font-mono font-medium text-springfield-blue">{p.confidence}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/5">
            <motion.div
              className="h-full rounded-full bg-springfield-blue"
              initial={{ width: 0 }}
              animate={{ width: `${p.confidence}%` }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
