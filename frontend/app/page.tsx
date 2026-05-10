"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Search,
  Target,
  TrendingUp,
  Globe,
  Sparkles,
  Shield,
  Database,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function LandingPage() {
  const [url, setUrl] = useState("");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-cyan-500/20">
      <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="fixed inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent pointer-events-none" />
      <div className="fixed -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 h-[22rem] w-[22rem] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" />

      <nav className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">
              SignalX <span className="align-top text-xs text-cyan-500">AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Platform
            </a>
            <a href="#workflow" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Workflow
            </a>
            <a href="#integrity" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Data Integrity
            </a>
            <ThemeToggle />
            <Link href="/analyze" className="rounded-xl bg-foreground px-5 py-2 text-sm font-bold text-background transition-all hover:bg-foreground/90">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <main className="px-6 pb-24 pt-36">
        <section className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Real startup intelligence only
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mb-8 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl"
            >
              Crawl the web.
              <br />
              Extract signal.
              <br />
              Skip the fake data.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              SignalX uses Anakin for real crawl data and Gemini for live analysis. Demo
              filler has been removed, so what you see now comes from actual pipeline output.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mx-auto mb-16 flex max-w-2xl flex-col gap-3 rounded-[2rem] border border-border bg-card/70 p-3 shadow-xl backdrop-blur-xl md:flex-row"
            >
              <div className="flex flex-1 items-center gap-3 rounded-[1.2rem] bg-background/70 px-4">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter startup website URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-14 w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Link
                href={`/analyze?url=${encodeURIComponent(url)}`}
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-cyan-500 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-cyan-400"
              >
                Start Analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <section id="features" className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Search}
              title="Live Crawl Input"
              description="Website content is fetched from your real Anakin crawl instead of fabricated startup profiles."
            />
            <FeatureCard
              icon={Target}
              title="Actual Competitor Reasoning"
              description="Competitive positioning is generated from crawled material and Gemini output, not static demo cards."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Honest UI States"
              description="Sections without real backing data now show explicit empty states instead of made-up metrics."
            />
          </section>

          <section id="workflow" className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="mb-5 text-4xl font-black tracking-tight sm:text-5xl">
                Built for real workflows,
                <br />
                not fake dashboards.
              </h2>
              <div className="space-y-6">
                <ValueItem
                  icon={Database}
                  title="Real crawl artifacts"
                  desc="The analyzer now errors clearly when API keys are missing instead of silently inventing content."
                />
                <ValueItem
                  icon={Sparkles}
                  title="Live AI output"
                  desc="Gemini analysis now returns only real model output, and failures surface as honest errors."
                />
                <ValueItem
                  icon={Shield}
                  title="Theme-aware interface"
                  desc="The UI now respects light and dark themes instead of locking the experience into dark-only styling."
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/75 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent" />
              <div className="relative space-y-3 font-mono text-xs text-muted-foreground">
                <p className="text-cyan-600 dark:text-cyan-300">{">"} STARTING LIVE ANALYSIS...</p>
                <p>{">"} CRAWL SOURCE: Anakin API</p>
                <p>{">"} ANALYSIS SOURCE: Gemini API</p>
                <p>{">"} DEMO FALLBACKS: removed</p>
                <p>{">"} THEME STATE: light / dark supported</p>
                <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-left">
                  <p className="mb-1 text-sm font-semibold text-foreground">Integrity check</p>
                  <p>
                    If the upstream services are unavailable, the app now tells you that directly
                    instead of generating fake reports.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="integrity" className="mt-24 rounded-[2.5rem] border border-border bg-card/70 p-8 shadow-xl backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                  Data Integrity
                </p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  No more fabricated reports.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <IntegrityCard
                  title="Removed"
                  body="Mock crawl pages, fake scrape output, made-up AI analysis, and demo-only intelligence pages."
                />
                <IntegrityCard
                  title="Kept"
                  body="The live analyzer, export flow, real API integration points, and honest error handling."
                />
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-border bg-card/70 p-8 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-500/20">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
        <Icon className="h-6 w-6 text-cyan-500" />
      </div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function ValueItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
        <Icon className="h-5 w-5 text-cyan-500" />
      </div>
      <div>
        <h4 className="mb-1 font-bold">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function IntegrityCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-background/70 p-5">
      <p className="mb-2 text-sm font-bold text-foreground">{title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
