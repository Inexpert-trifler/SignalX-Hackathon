"use client";

import { Shell } from "@/components/layout/Shell";
import { RealDataState } from "@/components/ui/real-data-state";

export default function MarketGapsPage() {
  return (
    <Shell>
      <RealDataState
        title="Market Gaps Now Show Only Verified Output"
        description="The previous page used made-up opportunities, confidence scores, and market sizes. It has been replaced with a real-data-only state until those insights are sourced from completed analyses."
      />
    </Shell>
  );
}
