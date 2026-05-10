"use client";

import { Shell } from "@/components/layout/Shell";
import { RealDataState } from "@/components/ui/real-data-state";

export default function DashboardPage() {
  return (
    <Shell>
      <RealDataState
        title="Live Dashboard Coming From Real Analyses"
        description="The old dashboard was showing fabricated startup activity and scores. It now stays honest until you connect persistence and start saving completed analyses from the live analyzer."
        showSupabaseNote
      />
    </Shell>
  );
}
