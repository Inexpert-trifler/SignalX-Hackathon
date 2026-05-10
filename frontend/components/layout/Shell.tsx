"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  LayoutDashboard,
  Search,
  Target,
  TrendingUp,
  FileText,
  Settings,
  Users,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Search, label: "Analyzer", href: "/analyze" },
  { icon: Target, label: "Market Gaps", href: "/market-gaps" },
  { icon: TrendingUp, label: "Competitors", href: "/competitors" },
  { icon: FileText, label: "Trends", href: "/trends" },
];

const SECONDARY_NAV: Array<{ icon: typeof Settings; label: string; href: string }> = [];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r border bg-card/30 backdrop-blur-xl transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              SignalX
            </motion.span>
          )}
        </Link>
        {!isCollapsed && <ThemeToggle />}
      </div>

      <div className="px-4 mb-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-cyan-500 transition-colors">
            <Command className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={isCollapsed ? "" : "Search intelligence..."}
            className={cn(
              "w-full bg-secondary/50 border border rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all",
              isCollapsed && "pl-0 pr-0 opacity-0"
            )}
          />
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border mt-auto">
        {SECONDARY_NAV.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}

        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 blur-2xl rounded-full" />
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-bold text-foreground">Pro Access</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
                Real insights now come only from your live Anakin and Gemini analysis flow.
              </p>
              <button className="w-full py-1.5 rounded-lg bg-foreground text-background text-[10px] font-bold hover:bg-foreground/90 transition-colors">
                Analyze Live Data
              </button>
            </>
          ) : (
            <div className="flex justify-center">
              <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive,
  isCollapsed,
}: {
  icon: any;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
      )}
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-cyan-500 transition-colors")} />
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="truncate"
        >
          {label}
        </motion.span>
      )}
      {isActive && !isCollapsed && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-500"
        />
      )}
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="p-8 max-w-7xl mx-auto min-h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
