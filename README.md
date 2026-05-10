# ⚡ SignalX AI — Startup Intelligence Platform

> AI-powered startup analysis powered by **Anakin APIs** and **Gemini AI**.
> Crawl any company → Extract intelligence → Discover market gaps in seconds.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Gemini-AI-4285f4?logo=google)](https://ai.google.dev)

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🌐 **Deep Web Crawling** | Anakin APIs crawl homepage, pricing, docs, features & blogs |
| 🤖 **Gemini AI Analysis** | Google Gemini extracts ICP, competitors, market gaps |
| 🏆 **Competitor Intelligence** | Side-by-side feature comparison with similarity scores |
| 💰 **Pricing Intelligence** | Decode competitor pricing models and strategies |
| 🎯 **Market Gap Detection** | AI surfaces ranked market opportunities |
| 📊 **Trend Analysis** | Visual trend charts across topics |
| 📄 **Export Reports** | Export as JSON or Markdown |

---

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Framer Motion
- **AI**: Google Gemini 1.5 Flash
- **Crawling/Scraping**: Anakin APIs (critical execution path)
- **Database**: Supabase (optional)
- **Charts**: Recharts

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone <repo>
cd signalx-ai
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
ANAKIN_API_KEY=your_anakin_api_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url       # optional
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key  # optional
SUPABASE_SERVICE_ROLE_KEY=your_service_key       # optional, needed to insert records
```

> **Note:** If you want to use Supabase, run the SQL commands found in `supabase/schema.sql` in your Supabase SQL editor to create the necessary tables and policies.

### 3. Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
signalx-ai/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/page.tsx          # Dashboard
│   ├── analyze/page.tsx            # Analysis results
│   └── api/
│       ├── analyze/route.ts        # Main analysis endpoint
│       ├── crawl/route.ts          # Anakin crawl endpoint
│       └── scrape/route.ts         # Anakin scrape endpoint
├── components/
│   ├── dashboard/                  # Dashboard UI components
│   └── ui/                         # Reusable UI primitives
├── lib/
│   ├── anakin/                     # Anakin API integration
│   │   ├── client.ts               # HTTP client
│   │   ├── crawl.ts                # crawlWebsite()
│   │   └── scrape.ts               # scrapeUrl(), browserSessionScrape()
│   ├── ai/gemini.ts                # Gemini AI analysis
│   └── supabase/client.ts          # Supabase client
├── hooks/useAnalysis.ts            # Analysis state hook
├── services/export.ts              # Export to JSON/Markdown
└── types/index.ts                  # TypeScript types
```

---

## 🔌 Anakin API Integration

Anakin APIs are in the **critical execution path**:

```typescript
// lib/anakin/crawl.ts
export async function crawlWebsite(url: string): Promise<AnakinCrawlPage[]>

// lib/anakin/scrape.ts
export async function scrapeUrl(url: string): Promise<AnakinScrapeResponse>
export async function browserSessionScrape(url: string): Promise<AnakinScrapeResponse>
export async function extractStructuredData(url: string): Promise<AnakinScrapeResponse>
```

All requests use:
```
Authorization: Bearer process.env.ANAKIN_API_KEY
```

---

## 🤖 Analysis Pipeline

```
User enters URL
    ↓
Anakin Crawl API → crawls 5-10 pages
    ↓
Anakin Scrape API → extracts markdown content
    ↓
Gemini AI → analyzes all content
    ↓
Returns: startup profile, ICP, competitors,
         pricing analysis, market gaps,
         opportunity score, actionable insights
```

---

## 🎯 Mock Fallback

The app works **without API keys** using intelligent mock data. Perfect for demos.

---

## 🏆 Hackathon Info

**Project**: SignalX AI
**Category**: AI Infrastructure / Startup Intelligence
**Stack**: Anakin APIs · Gemini AI · Next.js 15
