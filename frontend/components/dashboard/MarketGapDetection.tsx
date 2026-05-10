"use client";

import { motion } from "framer-motion";
import { Target, Zap, Clock } from "lucide-react";
import type { MarketGap } from "@backend/types";
import { getDifficultyColor } from "@backend/utils";

interface MarketGapDetectionProps {
  gaps: MarketGap[];
}

const IMPACT_COLORS = {
  low: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  medium: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  high: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const DIFFICULTY_BG = {
  low: "bg-emerald-500/10",
  medium: "bg-yellow-500/10",
  high: "bg-red-500/10",
};

export function MarketGapDetection({ gaps }: MarketGapDetectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold text-sm">Market Gap Detection</h3>
        <span className="tag-pink">{gaps.length} gaps found</span>
      </div>

      <div className="space-y-3">
        {gaps.map((gap, i) => (
          <motion.div
            key={gap.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="glass-card-hover p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg ${DIFFICULTY_BG[gap.difficulty]} flex items-center justify-center`}>
                  <Target className={`w-3.5 h-3.5 ${getDifficultyColor(gap.difficulty)}`} />
                </div>
                <h4 className="text-foreground font-semibold text-sm">{gap.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className={`tag border ${IMPACT_COLORS[gap.impact]} text-[10px]`}>
                  {gap.impact} impact
                </span>
                <span className={`tag-${gap.difficulty === "low" ? "green" : gap.difficulty === "medium" ? "orange" : "pink"} text-[10px]`}>
                  {gap.difficulty} difficulty
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{gap.description}</p>

            <div className="mt-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <div className="flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-700 dark:text-cyan-300/80 leading-relaxed">{gap.opportunity}</p>
              </div>
            </div>

            {gap.timeToCapture && (
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                Time to capture: {gap.timeToCapture}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
