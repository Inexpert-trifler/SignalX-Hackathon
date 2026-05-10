"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Competitor } from "@backend/types";

interface CompetitorCardsProps {
  competitors: Competitor[];
}

function SimilarityBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums w-8">{score}%</span>
    </div>
  );
}

export function CompetitorCards({ competitors }: CompetitorCardsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold text-sm">Competitor Landscape</h3>
        <span className="tag-cyan">{competitors.length} found</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {competitors.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="glass-card-hover p-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-foreground font-semibold text-sm">{c.name}</h4>
                  {c.fundingStage && (
                    <span className="tag-purple text-[9px] hidden sm:inline-flex">{c.fundingStage}</span>
                  )}
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1 mt-0.5"
                >
                  {c.url.replace(/https?:\/\/(www\.)?/, "")}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{c.description}</p>

            {/* Similarity */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Similarity</span>
              </div>
              <SimilarityBar score={c.similarityScore || 70} />
            </div>

            {/* Strengths / Weaknesses */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">Strengths</span>
                </div>
                <ul className="space-y-1">
                  {c.strengths.slice(0, 3).map((s, j) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-emerald-500 mt-0.5">+</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <span className="text-[10px] text-red-400 font-medium">Weaknesses</span>
                </div>
                <ul className="space-y-1">
                  {c.weaknesses.slice(0, 3).map((w, j) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-red-500 mt-0.5">-</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {c.targetMarket && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-1">
                <Minus className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">
                  Target: <span className="text-foreground/80">{c.targetMarket}</span>
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
