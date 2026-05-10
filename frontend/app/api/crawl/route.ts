import { NextRequest, NextResponse } from "next/server";
import { crawlWebsite } from "@backend/anakin/crawl";
import { formatUrl } from "@backend/utils";
import type { ApiResponse, AnakinCrawlPage } from "@backend/types";
import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
  maxPages: z.number().min(1).max(50).optional(),
  includePaths: z.array(z.string()).optional(),
  excludePaths: z.array(z.string()).optional(),
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

    const { url, maxPages, includePaths, excludePaths } = validated.data;
    const formattedUrl = formatUrl(url);

    const pages = await crawlWebsite(formattedUrl, {
      maxPages: maxPages || 10,
      includePaths,
      excludePaths,
    });

    return NextResponse.json<ApiResponse<AnakinCrawlPage[]>>({
      success: true,
      data: pages,
      message: `Crawled ${pages.length} pages`,
    });
  } catch (error) {
    console.error("[/api/crawl] Error:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: error instanceof Error ? error.message : "Crawl failed" },
      { status: 500 }
    );
  }
}
