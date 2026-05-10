// ─── Anakin API Types ───────────────────────────────────────────────────────
export interface AnakinCrawlRequest {
  url: string;
  maxPages?: number;
  includePaths?: string[];
  excludePaths?: string[];
  generateMarkdown?: boolean;
}

export interface AnakinCrawlPage {
  url: string;
  markdown?: string;
  html?: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface AnakinCrawlResponse {
  jobId: string;
  status: "pending" | "running" | "completed" | "failed";
  pages?: AnakinCrawlPage[];
  totalPages?: number;
  error?: string;
}

export interface AnakinScrapeRequest {
  url: string;
  formats?: ("markdown" | "html" | "json")[];
  includeTags?: string[];
  excludeTags?: string[];
  waitFor?: number;
}

export interface AnakinScrapeResponse {
  url: string;
  markdown?: string;
  html?: string;
  metadata?: {
    title?: string;
    description?: string;
    author?: string;
    publishDate?: string;
    ogImage?: string;
    favicon?: string;
  };
  success: boolean;
  error?: string;
}

// ─── Startup Analysis Types ──────────────────────────────────────────────────
export interface StartupProfile {
  name: string;
  url: string;
  tagline?: string;
  description?: string;
  category?: string;
  foundedYear?: number;
  teamSize?: string;
  funding?: string;
  logoUrl?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: "monthly" | "yearly" | "one-time" | "custom";
  features: string[];
  isPopular?: boolean;
  cta?: string;
}

export interface PricingAnalysis {
  model: "freemium" | "subscription" | "usage-based" | "enterprise" | "open-source" | "unknown";
  tiers: PricingTier[];
  insights: string[];
  averagePrice?: string;
}

export interface Competitor {
  name: string;
  url: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  targetMarket?: string;
  similarityScore?: number;
  fundingStage?: string;
}

export interface MarketGap {
  id: string;
  title: string;
  description: string;
  opportunity: string;
  difficulty: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  timeToCapture?: string;
}

export interface FeatureComparison {
  feature: string;
  hasIt: boolean;
  competitors?: { name: string; hasIt: boolean }[];
  notes?: string;
}

export interface AIInsights {
  summary: string;
  icp: string[];               // Ideal Customer Profile
  valueProposition: string;
  competitiveAdvantage: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  marketTrends: string[];
  actionableInsights: string[];
  opportunityScore: number;    // 0-100
  confidenceScore: number;     // 0-100
}

export interface TrendPoint {
  date: string;
  mentions: number;
  sentiment: number;
  topic: string;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  startup: StartupProfile;
  crawledPages: AnakinCrawlPage[];
  pricing: PricingAnalysis;
  competitors: Competitor[];
  marketGaps: MarketGap[];
  features: FeatureComparison[];
  insights: AIInsights;
  trends: TrendPoint[];
  rawMarkdown?: string;
}

// ─── API Response Wrappers ───────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalyzeRequest {
  url: string;
  options?: {
    maxPages?: number;
    includeCompetitors?: boolean;
    includePricing?: boolean;
    includeMarketGaps?: boolean;
  };
}

// ─── Dashboard Types ─────────────────────────────────────────────────────────
export type AnalysisStatus = "idle" | "crawling" | "scraping" | "analyzing" | "complete" | "error";

export interface CrawlProgress {
  status: AnalysisStatus;
  currentPage?: string;
  pagesFound: number;
  pagesProcessed: number;
  currentStep: string;
  steps: {
    id: string;
    label: string;
    status: "pending" | "running" | "complete" | "error";
  }[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}
