"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult, AnalysisStatus, CrawlProgress } from "@backend/types";

interface UseAnalysisReturn {
  result: AnalysisResult | null;
  status: AnalysisStatus;
  progress: CrawlProgress;
  error: string | null;
  analyze: (url: string) => Promise<void>;
  reset: () => void;
}

const STEPS = [
  { id: "crawl", label: "Crawling with Anakin APIs" },
  { id: "scrape", label: "Extracting content" },
  { id: "analyze", label: "Gemini AI analysis" },
  { id: "structure", label: "Structuring insights" },
];

const initialProgress: CrawlProgress = {
  status: "idle",
  pagesFound: 0,
  pagesProcessed: 0,
  currentStep: "",
  steps: STEPS.map((s) => ({ ...s, status: "pending" })),
};

export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [progress, setProgress] = useState<CrawlProgress>(initialProgress);
  const [error, setError] = useState<string | null>(null);

  const updateStep = useCallback(
    (stepId: string, stepStatus: "pending" | "running" | "complete" | "error") => {
      setProgress((prev) => ({
        ...prev,
        steps: prev.steps.map((s) =>
          s.id === stepId ? { ...s, status: stepStatus } : s
        ),
      }));
    },
    []
  );

  const analyze = useCallback(async (url: string) => {
    setError(null);
    setResult(null);
    setStatus("crawling");
    setProgress({
      ...initialProgress,
      status: "crawling",
      currentStep: "Crawling with Anakin APIs",
      steps: STEPS.map((s) => ({ ...s, status: s.id === "crawl" ? "running" : "pending" })),
    });

    try {
      // Simulate progress for UX
      await new Promise((r) => setTimeout(r, 600));
      updateStep("crawl", "complete");
      updateStep("scrape", "running");

      setStatus("scraping");
      setProgress((p) => ({ ...p, status: "scraping", currentStep: "Extracting content", pagesFound: 5 }));

      await new Promise((r) => setTimeout(r, 500));
      updateStep("scrape", "complete");
      updateStep("analyze", "running");

      setStatus("analyzing");
      setProgress((p) => ({ ...p, status: "analyzing", currentStep: "Gemini AI analysis", pagesProcessed: 5 }));

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      updateStep("analyze", "complete");
      updateStep("structure", "running");
      setProgress((p) => ({ ...p, currentStep: "Structuring insights" }));

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Analysis failed");

      await new Promise((r) => setTimeout(r, 300));
      updateStep("structure", "complete");

      setResult(data.data);
      setStatus("complete");
      setProgress((p) => ({ ...p, status: "complete", currentStep: "Done!" }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setStatus("error");
      setProgress((p) => ({
        ...p,
        status: "error",
        steps: p.steps.map((s) =>
          s.status === "running" ? { ...s, status: "error" } : s
        ),
      }));
    }
  }, [updateStep]);

  const reset = useCallback(() => {
    setResult(null);
    setStatus("idle");
    setProgress(initialProgress);
    setError(null);
  }, []);

  return { result, status, progress, error, analyze, reset };
}
