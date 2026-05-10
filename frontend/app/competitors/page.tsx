"use client";

import { Shell } from "@/components/layout/Shell";
import { RealDataState } from "@/components/ui/real-data-state";

export default function CompetitorsPage() {
  return (
    <Shell>
      <RealDataState
        title="Competitor Intelligence Needs Real Crawl Results"
        description="This view used to ship with fake competitor cards and invented pricing. It now waits for real competitor data produced by your live Anakin crawl and Gemini analysis pipeline."
      />
    </Shell>
  );
}
