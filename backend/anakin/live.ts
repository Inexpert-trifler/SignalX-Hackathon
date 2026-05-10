import type { AnakinCrawlPage, AnakinScrapeResponse } from "@backend/types";
import { formatUrl } from "@backend/utils";

const DEFAULT_PATH_HINTS = [
  "/pricing",
  "/features",
  "/product",
  "/solutions",
  "/docs",
  "/documentation",
  "/developers",
  "/blog",
  "/about",
];

const USER_AGENT =
  "Mozilla/5.0 (compatible; SignalXAI/1.0; +https://signalx.local)";

export async function crawlWebsiteDirect(
  targetUrl: string,
  maxPages = 8
): Promise<AnakinCrawlPage[]> {
  const normalizedUrl = formatUrl(targetUrl);
  const rootUrl = new URL(normalizedUrl);
  const candidateUrls = new Set<string>([rootUrl.toString()]);
  const pages: AnakinCrawlPage[] = [];

  for (const hint of DEFAULT_PATH_HINTS) {
    candidateUrls.add(new URL(hint, rootUrl).toString());
  }

  const homepageHtml = await fetchHtml(rootUrl.toString());
  if (homepageHtml) {
    for (const link of extractCandidateLinks(homepageHtml, rootUrl)) {
      candidateUrls.add(link);
      if (candidateUrls.size >= maxPages * 3) break;
    }
  }

  for (const candidateUrl of candidateUrls) {
    if (pages.length >= maxPages) break;
    const html = candidateUrl === rootUrl.toString() ? homepageHtml : await fetchHtml(candidateUrl);
    if (!html) continue;

    const markdown = htmlToMarkdown(html);
    if (markdown.length < 120) continue;

    pages.push({
      url: candidateUrl,
      html,
      markdown,
      metadata: {
        title: extractTagContent(html, "title"),
        description: extractMetaContent(html, "description"),
        ogImage: extractMetaProperty(html, "og:image"),
      },
    });
  }

  if (pages.length === 0) {
    throw new Error(`Unable to fetch readable content from ${rootUrl.hostname}.`);
  }

  return pages;
}

export async function scrapeUrlDirect(targetUrl: string): Promise<AnakinScrapeResponse> {
  const normalizedUrl = formatUrl(targetUrl);
  const html = await fetchHtml(normalizedUrl);

  if (!html) {
    throw new Error(`Unable to fetch readable content from ${normalizedUrl}.`);
  }

  const markdown = htmlToMarkdown(html);
  return {
    url: normalizedUrl,
    html,
    markdown,
    success: markdown.length > 0,
    metadata: {
      title: extractTagContent(html, "title"),
      description: extractMetaContent(html, "description"),
      ogImage: extractMetaProperty(html, "og:image"),
    },
  };
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": USER_AGENT,
      },
      redirect: "follow",
    });

    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    return await res.text();
  } catch {
    return null;
  }
}

function extractCandidateLinks(html: string, rootUrl: URL): string[] {
  const matches = [...html.matchAll(/href=["']([^"'#]+)["']/gi)];
  const urls = new Set<string>();

  for (const match of matches) {
    const rawHref = match[1]?.trim();
    if (!rawHref) continue;
    if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) continue;

    try {
      const candidate = new URL(rawHref, rootUrl);
      if (candidate.origin !== rootUrl.origin) continue;
      if (!DEFAULT_PATH_HINTS.some((hint) => candidate.pathname === hint || candidate.pathname.startsWith(`${hint}/`))) {
        continue;
      }
      urls.add(candidate.toString());
    } catch {
      continue;
    }
  }

  return [...urls];
}

function extractTagContent(html: string, tagName: string): string | undefined {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  return cleanInlineText(regex.exec(html)?.[1]);
}

function extractMetaContent(html: string, name: string): string | undefined {
  const regex = new RegExp(
    `<meta[^>]+name=["']${escapeRegex(name)}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  return cleanInlineText(regex.exec(html)?.[1]);
}

function extractMetaProperty(html: string, property: string): string | undefined {
  const regex = new RegExp(
    `<meta[^>]+property=["']${escapeRegex(property)}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  return cleanInlineText(regex.exec(html)?.[1]);
}

function htmlToMarkdown(html: string): string {
  const withoutNoise = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ");

  const withStructure = withoutNoise
    .replace(/<(h1|h2|h3|h4|h5|h6)[^>]*>/gi, "\n## ")
    .replace(/<\/(h1|h2|h3|h4|h5|h6)>/gi, "\n")
    .replace(/<(p|div|section|article|main|header|footer|li|tr|td|br)[^>]*>/gi, "\n")
    .replace(/<\/(p|div|section|article|main|header|footer|li|tr|td)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");

  return decodeEntities(withStructure)
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 400)
    .join("\n");
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanInlineText(value?: string): string | undefined {
  const cleaned = value?.replace(/\s+/g, " ").trim();
  return cleaned || undefined;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
