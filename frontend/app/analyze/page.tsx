import { Suspense } from "react";
import AnalyzeClient from "./AnalyzeClient";

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      }
    >
      <AnalyzeClient />
    </Suspense>
  );
}
