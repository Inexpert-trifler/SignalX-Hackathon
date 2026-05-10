"use client";

import { Shell } from "@/components/layout/Shell";
import { RealDataState } from "@/components/ui/real-data-state";

export default function TrendsPage() {
  return (
    <Shell>
      <RealDataState
        title="Trend Reporting Requires Stored Real Signals"
        description="This section was powered by demo momentum charts and fabricated topic growth. It now waits for real trend snapshots generated from actual analyses instead of synthetic numbers."
      />
    </Shell>
  );
}
