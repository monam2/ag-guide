"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Mail,
  CalendarCheck,
  FileText,
  ListTodo,
} from "lucide-react";
import Header, { SortOption } from "@/components/Header";
import {
  customers,
  deals,
  revenue,
  activities,
  getDashboardStats,
  getDealsByStage,
} from "@/lib/data";

const STAGE_COLORS: Record<string, string> = {
  prospecting: "#6366f1",
  qualification: "#8b5cf6",
  proposal: "#a78bfa",
  negotiation: "#f59e0b",
  won: "#10b981",
  lost: "#ef4444",
};
const STAGE_LABELS: Record<string, string> = {
  prospecting: "발굴",
  qualification: "검증",
  proposal: "제안",
  negotiation: "협상",
  won: "수주",
  lost: "실패",
};
const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  call: <Phone size={14} />,
  email: <Mail size={14} />,
  meeting: <CalendarCheck size={14} />,
  note: <FileText size={14} />,
  task: <ListTodo size={14} />,
};
const ACTIVITY_COLORS: Record<string, string> = {
  call: "#6366f1",
  email: "#10b981",
  meeting: "#f59e0b",
  note: "#8b5cf6",
  task: "#0ea5e9",
};

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}
function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const stats = getDashboardStats();
  const dealsByStage = getDealsByStage();
  const recentRevenue = revenue.slice(-12);
  const recentActivities = activities.slice(0, 8);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption | undefined>(undefined);
  const notifCount = customers.filter((c) => c.hasNotification).length;

  const kpiCards = [
    {
      label: "전체 고객",
      value: stats.totalCustomers.toLocaleString(),
      sub: `활성 ${stats.activeCustomers}명`,
      icon: Users,
      color: "#6366f1",
      trend: "+12%",
      positive: true,
    },
    {
      label: "총 연간 매출",
      value: formatCurrency(stats.totalRevenue),
      sub: `평균 거래 ${formatCurrency(stats.avgDealSize)}`,
      icon: DollarSign,
      color: "#10b981",
      trend: "+8.3%",
      positive: true,
    },
    {
      label: "활성 거래",
      value: stats.activeDeals.toLocaleString(),
      sub: `수주 ${stats.wonDeals}건 완료`,
      icon: Briefcase,
      color: "#f59e0b",
      trend: "-2.1%",
      positive: false,
    },
    {
      label: "전환율",
      value: `${stats.conversionRate}%`,
      sub: "지난달 대비",
      icon: TrendingUp,
      color: "#8b5cf6",
      trend: "+1.5%",
      positive: true,
    },
  ];

  const piData = dealsByStage
    .filter((d) => d.count > 0)
    .map((d) => ({
      name: STAGE_LABELS[d.stage],
      value: d.count,
      stage: d.stage,
    }));

  return (
    <>
      <Header
        title="대시보드"
        notificationCount={notifCount}
        searchValue={search}
        onSearchChange={setSearch}
        sortOption={sort}
        onSortChange={setSort}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpiCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="rounded-xl p-2.5 flex items-center justify-center"
                    style={{ background: `${card.color}20`, color: card.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{
                      background: card.positive
                        ? "rgba(16,185,129,0.12)"
                        : "rgba(239,68,68,0.12)",
                      color: card.positive ? "#10b981" : "#ef4444",
                    }}
                  >
                    {card.positive ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {card.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {card.value}
                </div>
                <div className="text-sm" style={{ color: "#64748b" }}>
                  {card.label}
                </div>
                <div className="text-xs mt-1" style={{ color: "#475569" }}>
                  {card.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Revenue Line Chart - 2col */}
          <div
            className="col-span-2 rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-white">월별 매출 추이</h2>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                  최근 12개월
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={recentRevenue}
                margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#475569", fontSize: 11 }}
                  tickFormatter={(v) => v.slice(5)}
                />
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
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="매출"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1" }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="목표"
                  stroke="#475569"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Deal Stage Pie - 1col */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold text-white mb-1">거래 파이프라인</h2>
            <p className="text-xs mb-4" style={{ color: "#475569" }}>
              단계별 분포
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={piData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {piData.map((entry, i) => (
                    <Cell key={i} fill={STAGE_COLORS[entry.stage]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1a1d27",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "#e2e8f0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {piData.map((d) => (
                <div
                  key={d.stage}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: STAGE_COLORS[d.stage] }}
                    />
                    <span style={{ color: "#94a3b8" }}>{d.name}</span>
                  </div>
                  <span className="font-medium text-white">{d.value}건</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Bar Chart */}
          <div
            className="col-span-2 rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold text-white mb-1">
              신규 거래 vs 성사 거래
            </h2>
            <p className="text-xs mb-4" style={{ color: "#475569" }}>
              최근 12개월
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={recentRevenue}
                margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#475569", fontSize: 11 }}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1d27",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "#e2e8f0",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="newDeals"
                  name="신규 거래"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="closedDeals"
                  name="성사 거래"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-semibold text-white mb-4">최근 활동</h2>
            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                    style={{
                      background: `${ACTIVITY_COLORS[act.type]}20`,
                      color: ACTIVITY_COLORS[act.type],
                    }}
                  >
                    {ACTIVITY_ICONS[act.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">
                      {act.description}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "#475569" }}
                    >
                      {act.customerName} · {formatDate(act.timestamp)}
                    </p>
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
