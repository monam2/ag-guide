"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Header from "@/components/Header";
import { customers, deals, revenue, activities } from "@/lib/data";

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function AnalyticsPage() {
  const notifCount = customers.filter((c) => c.hasNotification).length;

  // Country distribution
  const countryData = ["KR", "US", "JP", "GB", "DE", "CN", "AU"]
    .map((c) => ({
      country: c,
      count: customers.filter((cu) => cu.country === c).length,
    }))
    .sort((a, b) => b.count - a.count);

  // Tag distribution
  const tagData = ["VIP", "Enterprise", "SMB", "Startup", "Partner"].map(
    (tag) => ({
      tag,
      count: customers.filter((c) => c.tags.includes(tag)).length,
    }),
  );

  // Revenue area chart (all 24months)
  const revenueArea = revenue.map((r) => ({
    ...r,
    month: r.month.slice(5),
  }));

  // Activity type distribution for radar
  const actTypes = ["call", "email", "meeting", "note", "task"];
  const radarData = actTypes.map((type) => ({
    type: {
      call: "전화",
      email: "이메일",
      meeting: "미팅",
      note: "메모",
      task: "태스크",
    }[type],
    count: activities.filter((a) => a.type === type).length,
  }));

  // Top 10 customers by revenue
  const topCustomers = [...customers]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  return (
    <>
      <Header title="분석" notificationCount={notifCount} />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Revenue Area Chart */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2 className="font-semibold text-white mb-1">
            매출 vs 목표 추이 (24개월)
          </h2>
          <p className="text-xs mb-4" style={{ color: "#475569" }}>
            2024–2025
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueArea}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} />
              <YAxis
                tick={{ fill: "#475569", fontSize: 11 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1d27",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#e2e8f0",
                }}
                formatter={(v: number) => [formatCurrency(v), ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="실제 매출"
                stroke="#6366f1"
                fill="url(#revGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="target"
                name="목표"
                stroke="#475569"
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Country Distribution */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold text-white mb-4">국가별 고객 분포</h2>
            <div className="space-y-3">
              {countryData.map(({ country, count }, i) => {
                const pct = Math.round((count / customers.length) * 100);
                return (
                  <div key={country}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#94a3b8" }}>
                        {["🇰🇷", "🇺🇸", "🇯🇵", "🇬🇧", "🇩🇪", "🇨🇳", "🇦🇺"][
                          "KRUSE JPGBDECNAU".indexOf(country) / 2
                        ] ?? ""}{" "}
                        {country}
                      </span>
                      <span style={{ color: "#64748b" }}>
                        {count}명 ({pct}%)
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full"
                      style={{
                        height: 5,
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: `hsl(${240 + i * 30}, 70%, 65%)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Radar */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold text-white mb-4">활동 유형 현황</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="type"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar
                  name="활동"
                  dataKey="count"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1d27",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "#e2e8f0",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Customers */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold text-white mb-4">매출 상위 10 고객</h2>
            <div className="space-y-2.5">
              {topCustomers.map((c, i) => (
                <div key={c.id} className="flex items-center gap-2.5">
                  <span
                    className="text-xs font-bold w-5 text-center flex-shrink-0"
                    style={{ color: i < 3 ? "#f59e0b" : "#475569" }}
                  >
                    {i + 1}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "white",
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white truncate">
                      {c.name}
                    </div>
                    <div
                      className="text-xs truncate"
                      style={{ color: "#475569" }}
                    >
                      {c.company}
                    </div>
                  </div>
                  <div
                    className="text-xs font-semibold flex-shrink-0"
                    style={{ color: "#10b981" }}
                  >
                    {formatCurrency(c.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
