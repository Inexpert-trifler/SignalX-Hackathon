"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { FeatureComparison } from "@backend/types";

interface FeatureComparisonTableProps {
  features: FeatureComparison[];
}

export function FeatureComparisonTable({ features }: FeatureComparisonTableProps) {
  const hasFeature = features.filter((f) => f.hasIt).length;
  const total = features.length;
  const pct = Math.round((hasFeature / total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold text-sm">Feature Coverage</h3>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">{hasFeature}/{total} features</span>
          <span className={`tag text-[10px] border ${pct >= 70 ? "tag-green" : pct >= 50 ? "tag-orange" : "tag-pink"}`}>
            {pct}% coverage
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="divide-y divide-border">
          {features.map((feature, i) => (
            <motion.div
              key={feature.feature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-5 py-3 hover:bg-accent/40 transition-colors"
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                feature.hasIt ? "bg-emerald-500/15" : "bg-red-500/10"
              }`}>
                {feature.hasIt ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <X className="w-3.5 h-3.5 text-red-400" />
                )}
              </div>
              <span className={`text-sm flex-1 ${feature.hasIt ? "text-foreground/85" : "text-muted-foreground"}`}>
                {feature.feature}
              </span>
              {feature.notes && (
                <span className="text-[10px] text-muted-foreground max-w-[180px] text-right hidden sm:block">
                  {feature.notes}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
