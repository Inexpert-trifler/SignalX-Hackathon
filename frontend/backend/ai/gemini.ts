import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
  AnakinCrawlPage,
  AIInsights,
  PricingAnalysis,
  Competitor,
  MarketGap,
  FeatureComparison,
  StartupProfile,
} from "@backend/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const geminiModelName = process.env.GEMINI_MODEL || "gemini-flash-latest";

const model = genAI.getGenerativeModel({
  model: geminiModelName,
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.7,
  },
});

function combineMarkdown(pages: AnakinCrawlPage[]): string {
  return pages
    .map((p) => `## Page: ${p.url}\n\n${p.markdown || ""}`)
    .join("\n\n---\n\n");
}

export async function analyzeStartup(
  pages: AnakinCrawlPage[],
  startupUrl: string
): Promise<{
  startup: StartupProfile;
  insights: AIInsights;
  pricing: PricingAnalysis;
  competitors: Competitor[];
  marketGaps: MarketGap[];
  features: FeatureComparison[];
}> {
  const content = combineMarkdown(pages);
  const domain = startupUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0];

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Real AI analysis is required.");
  }

  try {
    const prompt = `
You are an expert startup analyst and market intelligence AI.
Analyze the following crawled website content for "${domain}" and return a comprehensive JSON analysis.

CRAWLED CONTENT:
${content.slice(0, 30000)}

Return ONLY valid JSON matching this exact schema:
{
  "startup": {
    "name": "Company Name",
    "url": "${startupUrl}",
    "tagline": "One-line tagline",
    "description": "2-3 sentence description",
    "category": "SaaS / FinTech / etc",
    "foundedYear": 2020,
    "teamSize": "1-10 / 11-50 / 51-200 / 200+",
    "funding": "Bootstrapped / Seed / Series A / etc"
  },
  "insights": {
    "summary": "3-4 sentence executive summary",
    "icp": ["ICP description 1", "ICP description 2", "ICP description 3"],
    "valueProposition": "Core value prop in 1-2 sentences",
    "competitiveAdvantage": ["advantage1", "advantage2", "advantage3"],
    "weaknesses": ["weakness1", "weakness2", "weakness3"],
    "opportunities": ["opportunity1", "opportunity2", "opportunity3"],
    "threats": ["threat1", "threat2", "threat3"],
    "marketTrends": ["trend1", "trend2", "trend3"],
    "actionableInsights": ["insight1", "insight2", "insight3", "insight4", "insight5"],
    "opportunityScore": 75,
    "confidenceScore": 80
  },
  "pricing": {
    "model": "freemium",
    "tiers": [
      {
        "name": "Starter",
        "price": "Free",
        "period": "monthly",
        "features": ["feature1", "feature2"],
        "isPopular": false,
        "cta": "Get Started"
      }
    ],
    "insights": ["pricing insight 1", "pricing insight 2"],
    "averagePrice": "$49/mo"
  },
  "competitors": [
    {
      "name": "Competitor Name",
      "url": "https://competitor.com",
      "description": "What they do",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1"],
      "targetMarket": "SMBs",
      "similarityScore": 80,
      "fundingStage": "Series B"
    }
  ],
  "marketGaps": [
    {
      "id": "gap1",
      "title": "Gap Title",
      "description": "What's missing in the market",
      "opportunity": "How to capitalize on this",
      "difficulty": "medium",
      "impact": "high",
      "timeToCapture": "6-12 months"
    }
  ],
  "features": [
    {
      "feature": "Feature Name",
      "hasIt": true,
      "notes": "How well implemented"
    }
  ]
}

Rules:
- opportunityScore and confidenceScore must be 0-100 integers
- difficulty and impact must be exactly "low", "medium", or "high"
- pricing model must be exactly one of: "freemium", "subscription", "usage-based", "enterprise", "open-source", "unknown"
- Return minimum 3 competitors, 4 market gaps, 8 features
- Be specific and data-driven based on actual content
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("[Gemini] Analysis failed:", error);
    throw new Error(
      error instanceof Error
        ? `Gemini analysis failed: ${error.message}`
        : "Gemini analysis failed."
    );
  }
}
