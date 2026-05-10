"use client";

import { motion } from "framer-motion";
import { Building2, Globe, Calendar, Users, DollarSign, ExternalLink } from "lucide-react";
import type { StartupProfile, AIInsights } from "@backend/types";
import { getScoreColor, getScoreLabel } from "@backend/utils";

interface StartupOverviewProps {
  startup: StartupProfile;
  insights: AIInsights;
}

export function StartupOverview({ startup, insights }: StartupOverviewProps) {
  const scoreColor = getScoreColor(insights.opportunityScore);
  const scoreLabel = getScoreLabel(insights.opportunityScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card neon-border-cyan p-6"
    >
      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Logo / Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-border flex items-center justify-center flex-shrink-0">
          <Building2 className="w-8 h-8 text-cyan-400" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-2xl font-black text-foreground">{startup.name}</h2>
            {startup.category && (
              <span className="tag-cyan text-[10px]">{startup.category}</span>
            )}
          </div>
          <p className="text-muted-foreground text-sm italic mb-3">&ldquo;{startup.tagline}&rdquo;</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{startup.description}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {startup.url && (
              <a
                href={startup.url.startsWith("http") ? startup.url : `https://${startup.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                {startup.url.replace(/https?:\/\/(www\.)?/, "")}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {startup.foundedYear && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Founded {startup.foundedYear}
              </span>
            )}
            {startup.teamSize && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {startup.teamSize} employees
              </span>
            )}
            {startup.funding && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                {startup.funding}
              </span>
            )}
          </div>
        </div>

        {/* Opportunity Score */}
        <div className="flex-shrink-0 text-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="40" fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - insights.opportunityScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black ${scoreColor}`}>
                {insights.opportunityScore}
              </span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider">score</span>
            </div>
          </div>
          <p className={`text-xs font-semibold mt-1 ${scoreColor}`}>{scoreLabel}</p>
          <p className="text-[10px] text-muted-foreground">Opportunity</p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mt-5 pt-5 border-t border-border">
        <p className="text-muted-foreground text-sm leading-relaxed">{insights.summary}</p>
      </div>
    </motion.div>
  );
}
