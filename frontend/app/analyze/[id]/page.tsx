"use client";

import { useParams } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { RealDataState } from "@/components/ui/real-data-state";

export default function StartupAnalysisPage() {
  const params = useParams<{ id: string }>();

  return (
    <Shell>
      <RealDataState
        title={`Saved Analysis ${params.id ?? ""}`.trim()}
        description="This route was previously rendering a full fake startup report. It now stays empty until saved analyses are loaded from your real database records."
        showSupabaseNote
      />
    </Shell>
  );
}
