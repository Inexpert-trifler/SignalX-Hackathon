import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, browserSessionScrape, extractStructuredData } from "@backend/anakin/scrape";
import { formatUrl } from "@backend/utils";
import type { ApiResponse, AnakinScrapeResponse } from "@backend/types";
import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
  mode: z.enum(["simple", "browser", "structured"]).optional(),
  schema: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = schema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: validated.error.errors[0].message },
        { status: 400 }
      );
    }

    const { url, mode = "simple", schema: extractSchema } = validated.data;
    const formattedUrl = formatUrl(url);

    let result: AnakinScrapeResponse;

    switch (mode) {
      case "browser":
        result = await browserSessionScrape(formattedUrl);
        break;
      case "structured":
        result = await extractStructuredData(formattedUrl, extractSchema);
        break;
      default:
        result = await scrapeUrl(formattedUrl);
    }

    return NextResponse.json<ApiResponse<AnakinScrapeResponse>>({
      success: true,
      data: result,
      message: "Scrape completed",
    });
  } catch (error) {
    console.error("[/api/scrape] Error:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: error instanceof Error ? error.message : "Scrape failed" },
      { status: 500 }
    );
  }
}
