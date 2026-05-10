import { anakinClient } from "./client";
import { crawlWebsiteDirect } from "./live";
import { sleep } from "@backend/utils";
import type { AnakinCrawlRequest, AnakinCrawlResponse, AnakinCrawlPage } from "@backend/types";

/**
 * Initiate a crawl job via Anakin API.
 * Automatically polls for completion.
 */
export async function crawlWebsite(
  url: string,
  options?: Partial<AnakinCrawlRequest>
): Promise<AnakinCrawlPage[]> {
  if (!anakinClient.isConfigured) {
    console.warn("[Anakin] API key missing, using direct website crawl.");
    return crawlWebsiteDirect(url, options?.maxPages || 8);
  }

  try {
    // Step 1: Start the crawl
    const crawlJob = await anakinClient.post<AnakinCrawlRequest, AnakinCrawlResponse>(
      "/crawl",
      {
        url,
        maxPages: options?.maxPages || 10,
        generateMarkdown: true,
        includePaths: options?.includePaths || [],
        excludePaths: options?.excludePaths || ["/blog/tag", "/cdn-cgi"],
        ...options,
      }
    );

    if (!crawlJob.jobId) {
      throw new Error("No jobId returned from crawl");
    }

    // Step 2: Poll for completion
    return await pollCrawlJob(crawlJob.jobId);
  } catch (error) {
    console.error("[Anakin] Crawl failed:", error);
    console.warn("[Anakin] Falling back to direct website crawl.");
    return crawlWebsiteDirect(url, options?.maxPages || 8);
  }
}

async function pollCrawlJob(
  jobId: string,
  maxAttempts = 30,
  pollInterval = 2000
): Promise<AnakinCrawlPage[]> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await anakinClient.get<AnakinCrawlResponse>(`/crawl/${jobId}`);

    if (status.status === "completed" && status.pages) {
      return status.pages;
    }
    if (status.status === "failed") {
      throw new Error(`Crawl job ${jobId} failed: ${status.error}`);
    }

    await sleep(pollInterval);
  }

  throw new Error(`Crawl job ${jobId} timed out`);
}
