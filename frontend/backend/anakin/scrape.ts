import { anakinClient } from "./client";
import { scrapeUrlDirect } from "./live";
import type { AnakinScrapeRequest, AnakinScrapeResponse } from "@backend/types";

/**
 * Scrape a single URL using Anakin's scrape API.
 */
export async function scrapeUrl(
  url: string,
  options?: Partial<AnakinScrapeRequest>
): Promise<AnakinScrapeResponse> {
  if (!anakinClient.isConfigured) {
    console.warn("[Anakin] API key missing, using direct website scrape.");
    return scrapeUrlDirect(url);
  }

  try {
    const response = await anakinClient.post<AnakinScrapeRequest, AnakinScrapeResponse>(
      "/scrape",
      {
        url,
        formats: ["markdown", "html"],
        ...options,
      }
    );
    return response;
  } catch (error) {
    console.error("[Anakin] Scrape failed:", error);
    console.warn("[Anakin] Falling back to direct website scrape.");
    return scrapeUrlDirect(url);
  }
}

/**
 * Extract structured data from a URL using Anakin's browser session.
 */
export async function extractStructuredData(
  url: string,
  schema?: Record<string, unknown>
): Promise<AnakinScrapeResponse> {
  if (!anakinClient.isConfigured) {
    return scrapeUrlDirect(url);
  }

  try {
    return await anakinClient.post<Record<string, unknown>, AnakinScrapeResponse>(
      "/scrape",
      {
        url,
        formats: ["markdown"],
        schema: schema || {},
      }
    );
  } catch (error) {
    console.error("[Anakin] Structured extract failed:", error);
    return scrapeUrlDirect(url);
  }
}

/**
 * Use Anakin's browser session for dynamic JS-rendered pages.
 */
export async function browserSessionScrape(url: string): Promise<AnakinScrapeResponse> {
  if (!anakinClient.isConfigured) {
    return scrapeUrlDirect(url);
  }

  try {
    return await anakinClient.post<AnakinScrapeRequest, AnakinScrapeResponse>(
      "/scrape",
      {
        url,
        formats: ["markdown"],
        waitFor: 2000,
      }
    );
  } catch (error) {
    console.error("[Anakin] Browser session scrape failed:", error);
    return scrapeUrlDirect(url);
  }
}
