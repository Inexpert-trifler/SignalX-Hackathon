"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card border border-red-500/20 p-8 max-w-md mx-auto text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6 text-red-400" />
      </div>
      <h3 className="text-foreground font-semibold mb-2">Analysis Failed</h3>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{error}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost">
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      )}
    </motion.div>
  );
}
