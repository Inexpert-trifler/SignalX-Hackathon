"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import type { TrendPoint } from "@backend/types";

interface TrendChartProps {
  trends: TrendPoint[];
}

const COLORS = ["#00f5ff", "#8b5cf6", "#ec4899", "#10b981"];
const TOPICS = ["AI Automation", "No-Code Tools", "Workflow AI", "Enterprise SaaS"];

export function TrendChart({ trends }: TrendChartProps) {
  // Group trends by date
  const grouped: Record<string, Record<string, number>> = {};
  trends.forEach((t) => {
    if (!grouped[t.date]) grouped[t.date] = {};
    grouped[t.date][t.topic] = t.mentions;
  });

  const chartData = Object.entries(grouped).map(([date, topics]) => ({
    date: date.replace("2025-", ""),
    ...topics,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold text-sm">Trend Timeline</h3>
        <div className="flex flex-wrap gap-3">
          {TOPICS.map((topic, i) => (
            <div key={topic} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
              <span className="text-[10px] text-muted-foreground">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleY: 0.8 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-5 h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              {TOPICS.map((topic, i) => (
                <linearGradient key={topic} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS[i]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
            <XAxis dataKey="date" tick={{ fill: "rgba(100,116,139,0.9)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(100,116,139,0.9)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(148,163,184,0.3)",
                borderRadius: "12px",
                color: "rgba(15,23,42,0.85)",
                fontSize: "12px",
              }}
              cursor={{ stroke: "rgba(148,163,184,0.35)" }}
            />
            {TOPICS.map((topic, i) => (
              <Area
                key={topic}
                type="monotone"
                dataKey={topic}
                stroke={COLORS[i]}
                strokeWidth={2}
                fill={`url(#grad${i})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
