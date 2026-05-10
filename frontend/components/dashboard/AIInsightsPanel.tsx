"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";
import type { AIInsights } from "@backend/types";

interface AIInsightsPanelProps {
  insights: AIInsights;
}

const SECTION_CONFIG = [
  {
    key: "competitiveAdvantage" as keyof AIInsights,
    label: "Competitive Advantages",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    key: "weaknesses" as keyof AIInsights,
    label: "Weaknesses",
    icon: TrendingDown,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    key: "opportunities" as keyof AIInsights,
    label: "Opportunities",
    icon: TrendingUp,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    key: "threats" as keyof AIInsights,
    label: "Threats",
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  return (
    <div className="space-y-4">
      {/* ICP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-violet-400" />
          <h3 className="text-foreground font-semibold text-sm">Ideal Customer Profile (ICP)</h3>
        </div>
        <div className="space-y-2">
          {insights.icp.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTION_CONFIG.map(({ key, label, icon: Icon, color, bg, border }, i) => {
          const items = insights[key] as string[];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 border ${border}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
                <h3 className={`font-semibold text-xs ${color}`}>{label}</h3>
              </div>
              <ul className="space-y-1.5">
                {items.map((item, j) => (
                  <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className={`${color} mt-1`}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Actionable Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5 neon-border-purple"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <h3 className="text-foreground font-semibold text-sm">Actionable Insights</h3>
        </div>
        <div className="space-y-3">
          {insights.actionableInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10"
            >
              <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <h3 className="text-foreground font-semibold text-sm">Market Trends</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {insights.marketTrends.map((trend, i) => (
            <span key={i} className="tag-cyan text-xs">{trend}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
