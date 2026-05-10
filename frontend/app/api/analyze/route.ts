import { NextRequest, NextResponse } from "next/server";
import { crawlWebsite } from "@backend/anakin/crawl";
import { analyzeStartup } from "@backend/ai/gemini";
import { formatUrl, generateId } from "@backend/utils";
import { createServerSupabaseClient } from "@backend/database/client";
import type { AnalyzeRequest, ApiResponse, AnalysisResult } from "@backend/types";
import { z } from "zod";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  options: z
    .object({
      maxPages: z.number().optional(),
      includeCompetitors: z.boolean().optional(),
      includePricing: z.boolean().optional(),
      includeMarketGaps: z.boolean().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = requestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: validated.error.errors[0].message },
        { status: 400 }
      );
    }

    const { url, options } = validated.data as AnalyzeRequest;
    const formattedUrl = formatUrl(url);

    // ── Step 1: Crawl via Anakin API ────────────────────────────────────────
    const crawledPages = await crawlWebsite(formattedUrl, {
      maxPages: options?.maxPages || 8,
    });

    // ── Step 2: Analyze via Gemini AI ────────────────────────────────────────
    const analysis = await analyzeStartup(crawledPages, formattedUrl);

    // ── Step 3: Assemble result ───────────────────────────────────────────────
    const result: AnalysisResult = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      startup: analysis.startup,
      crawledPages,
      pricing: analysis.pricing,
      competitors: analysis.competitors,
      marketGaps: analysis.marketGaps,
      features: analysis.features,
      insights: analysis.insights,
      trends: generateTrendData(),
      rawMarkdown: crawledPages.map((p) => p.markdown).join("\n\n---\n\n"),
    };

    // ── Step 4: Save to Supabase (optional) ──────────────────────────────────
    const supabase = createServerSupabaseClient();
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from("analyses").insert({
          id: result.id,
          url: formattedUrl,
          data: result,
          created_at: result.createdAt,
        });
        if (dbError) console.error("[/api/analyze] Supabase Insert Error:", dbError);
      } catch (e) {
        console.error("[/api/analyze] DB Error:", e);
      }
    }

    return NextResponse.json<ApiResponse<AnalysisResult>>({
      success: true,
      data: result,
      message: `Successfully analyzed ${result.crawledPages.length} pages`,
    });
  } catch (error) {
    console.error("[/api/analyze] Error:", error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 }
    );
  }
}

function generateTrendData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const topics = ["AI Automation", "No-Code Tools", "Workflow AI", "Enterprise SaaS"];

  return months.flatMap((month, i) =>
    topics.map((topic) => ({
      date: `2025-${String(i + 1).padStart(2, "0")}`,
      mentions: Math.floor(Math.random() * 500) + 100 * (i + 1),
      sentiment: Math.random() * 40 + 60,
      topic,
    }))
  );
}
