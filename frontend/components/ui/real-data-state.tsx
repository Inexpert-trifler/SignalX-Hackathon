"use client";

import Link from "next/link";
import { Database, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RealDataStateProps {
  title: string;
  description: string;
  showSupabaseNote?: boolean;
}

export function RealDataState({
  title,
  description,
  showSupabaseNote = false,
}: RealDataStateProps) {
  return (
    <div className="rounded-[2rem] border bg-card/70 p-8 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
          <Database className="h-6 w-6" />
        </div>
        <h1 className="mb-2 text-2xl font-black tracking-tight">{title}</h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {showSupabaseNote && (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
            Saved history requires real persistence. Configure `NEXT_PUBLIC_SUPABASE_URL`,
            `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to store and
            retrieve completed analyses.
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="ai">
            <Link href="/">Run New Analysis</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/analyze">Open Analyzer</Link>
          </Button>
        </div>
        {showSupabaseNote && (
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Settings2 className="h-3.5 w-3.5" />
            This page now hides demo data instead of inventing results.
          </div>
        )}
      </div>
    </div>
  );
}
