"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Loader2, XCircle, Zap, Globe, Brain, Box } from "lucide-react";
import type { CrawlProgress } from "@backend/types";

interface CrawlProgressUIProps {
  progress: CrawlProgress;
  url: string;
}

const STEP_ICONS = [Globe, Box, Brain, Zap];

const STEP_COLORS = {
  pending: "text-muted-foreground",
  running: "text-cyan-400",
  complete: "text-emerald-400",
  error: "text-red-400",
};

export function CrawlProgressUI({ progress, url }: CrawlProgressUIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card neon-border-cyan glow-cyan p-8 max-w-lg w-full mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-6 h-6 text-cyan-400" />
          </motion.div>
        </div>
        <h3 className="text-foreground font-bold text-lg">Analyzing Startup</h3>
        <p className="text-muted-foreground text-sm mt-1 font-mono truncate max-w-xs mx-auto">
          {url}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {progress.steps.map((step, i) => {
          const Icon = STEP_ICONS[i] || Circle;
          const colorClass = STEP_COLORS[step.status];

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                step.status === "running"
                  ? "bg-cyan-500/10 border border-cyan-500/20"
                  : step.status === "complete"
                  ? "bg-emerald-500/5 border border-emerald-500/10"
                  : "border border-transparent"
              }`}
            >
              <div className={`flex-shrink-0 ${colorClass}`}>
                {step.status === "running" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : step.status === "complete" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : step.status === "error" ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${
                  step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
              {step.status === "running" && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-cyan-400 font-mono"
                >
                  running...
                </motion.div>
              )}
              {step.status === "complete" && (
                <span className="text-xs text-emerald-400 font-mono">done</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress Pages */}
      {(progress.pagesFound > 0 || progress.pagesProcessed > 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-between text-xs text-muted-foreground font-mono border-t border-border pt-4"
        >
          <span>Pages found: <span className="text-cyan-400">{progress.pagesFound}</span></span>
          <span>Processed: <span className="text-emerald-400">{progress.pagesProcessed}</span></span>
        </motion.div>
      )}

      {/* Animated bar */}
      <div className="mt-5 h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${
              progress.steps.filter((s) => s.status === "complete").length /
              progress.steps.length *
              100
            }%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
