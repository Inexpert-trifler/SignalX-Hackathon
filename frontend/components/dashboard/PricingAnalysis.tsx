"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import type { PricingAnalysis } from "@backend/types";
import { cn } from "@backend/utils";

interface PricingAnalysisPanelProps {
  pricing: PricingAnalysis;
}

export function PricingAnalysisPanel({ pricing }: PricingAnalysisPanelProps) {
  return (
    <div className="space-y-4">
      {/* Model Badge */}
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground text-sm">Pricing Model:</span>
        <span className="tag-cyan capitalize font-semibold">{pricing.model}</span>
        {pricing.averagePrice && (
          <span className="text-muted-foreground text-sm">· Avg {pricing.averagePrice}</span>
        )}
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricing.tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "glass-card p-5 relative",
              tier.isPopular ? "neon-border-purple glow-purple" : ""
            )}
          >
            {tier.isPopular && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="tag-purple text-[10px] font-bold uppercase tracking-wider">
                  Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-foreground font-bold text-sm mb-1">{tier.name}</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-foreground">{tier.price}</span>
                {tier.period && tier.period !== "custom" && (
                  <span className="text-muted-foreground text-xs">/{tier.period}</span>
                )}
              </div>
            </div>

            <ul className="space-y-2 mb-5">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            {tier.cta && (
              <button
                className={cn(
                  "w-full text-xs py-2 rounded-lg font-semibold transition-all",
                  tier.isPopular
                    ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500"
                    : "border border-border text-muted-foreground hover:border-cyan-500/30 hover:text-foreground"
                )}
              >
                {tier.cta}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pricing Insights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <h4 className="text-foreground font-semibold text-sm mb-3">Pricing Intelligence</h4>
        <ul className="space-y-2">
          {pricing.insights.map((insight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Minus className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-1" />
              {insight}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
