import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SignalX AI — Startup Intelligence Platform",
  description:
    "AI-powered startup analysis. Crawl any company, extract intelligence, discover market gaps and opportunities in seconds.",
  keywords: ["startup analysis", "AI intelligence", "competitor analysis", "market research"],
  authors: [{ name: "SignalX AI" }],
  openGraph: {
    title: "SignalX AI — Startup Intelligence Platform",
    description: "AI-powered startup analysis powered by Anakin APIs and Gemini AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
