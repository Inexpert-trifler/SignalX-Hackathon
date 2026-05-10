"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ArrowLeft, Download, RefreshCw, Globe,
  BarChart3, Target, DollarSign, GitCompare, TrendingUp, ChevronRight,
  Loader2, Sparkles, Database, Layout
} from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { useAnalysis } from "@/hooks/useAnalysis";
import { CrawlProgressUI } from "@/components/dashboard/CrawlProgress";
import { StartupOverview } from "@/components/dashboard/StartupOverview";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { CompetitorCards } from "@/components/dashboard/CompetitorCards";
import { PricingAnalysisPanel } from "@/components/dashboard/PricingAnalysis";
import { MarketGapDetection } from "@/components/dashboard/MarketGapDetection";
import { FeatureComparisonTable } from "@/components/dashboard/FeatureComparison";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { ErrorDisplay } from "@/components/dashboard/ErrorDisplay";
import { SkeletonDashboard } from "@/components/ui/skeleton";
import { exportToJson, exportToMarkdown } from "@backend/services/export";
import { formatUrl } from "@backend/utils";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "insights", label: "AI Insights", icon: Sparkles },
  { id: "competitors", label: "Competitors", icon: Target },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "gaps", label: "Market Gaps", icon: Zap },
  { id: "features", label: "Features", icon: Layout },
  { id: "trends", label: "Trends", icon: TrendingUp },
];

export default function AnalyzeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawUrl = searchParams.get("url") || "";
  const { result, status, progress, error, analyze, reset } = useAnalysis();
  const [activeTab, setActiveTab] = useState("insights");
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    if (rawUrl) {
      analyze(formatUrl(rawUrl));
    }
  }, [analyze, rawUrl]);

  const isLoading = ["crawling", "scraping", "analyzing"].includes(status);

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        {/* Top Header / Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 rounded-xl bg-secondary/50 border border hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold tracking-tight">Project Analysis</h1>
                {isLoading && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-bold uppercase tracking-wider animate-pulse border border-cyan-500/20">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Live Processing
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <Globe className="w-3 h-3" />
                {rawUrl || "Waiting for target..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {result && (
              <>
                <button
                  onClick={() => { reset(); analyze(formatUrl(rawUrl)); }}
                  className="p-2.5 rounded-xl bg-secondary/50 border border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  title="Re-run Intelligence Pipeline"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-foreground/90 transition-all shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  {showExportMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 p-2 rounded-2xl bg-card border border shadow-2xl z-50 overflow-hidden">
                      <button
                        onClick={() => { exportToJson(result); setShowExportMenu(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Database className="w-3.5 h-3.5" /> Export as JSON
                      </button>
                      <button
                        onClick={() => { exportToMarkdown(result); setShowExportMenu(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg hover:bg-secondary transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" /> Export as Markdown
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 gap-12"
              >
                <CrawlProgressUI progress={progress} url={formatUrl(rawUrl)} />
                <div className="w-full max-w-4xl opacity-20 pointer-events-none">
                  <SkeletonDashboard />
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20"
              >
                <ErrorDisplay
                  error={error || "Analysis pipeline failed to initialize."}
                  onRetry={() => analyze(formatUrl(rawUrl))}
                />
              </motion.div>
            )}

            {result && status === "complete" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Overview Card */}
                <StartupOverview startup={result.startup} insights={result.insights} />

                {/* Navigation Tabs */}
                <div className="sticky top-0 z-30 flex items-center gap-1 p-1 rounded-2xl bg-secondary/50 border border backdrop-blur-md overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                        activeTab === tab.id
                          ? "bg-background text-foreground shadow-sm border border"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      )}
                    >
                      <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-cyan-500" : "text-muted-foreground")} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Feature View */}
                <div className="min-h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "insights" && <AIInsightsPanel insights={result.insights} />}
                      {activeTab === "competitors" && <CompetitorCards competitors={result.competitors} />}
                      {activeTab === "pricing" && <PricingAnalysisPanel pricing={result.pricing} />}
                      {activeTab === "gaps" && <MarketGapDetection gaps={result.marketGaps} />}
                      {activeTab === "features" && <FeatureComparisonTable features={result.features} />}
                      {activeTab === "trends" && <TrendChart trends={result.trends} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
