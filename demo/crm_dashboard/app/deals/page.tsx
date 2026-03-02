"use client";

import { useState, useMemo } from "react";
import Header, { SortOption } from "@/components/Header";
import { deals as allDeals, customers } from "@/lib/data";
import { Deal } from "@/types";
import { Bell, TrendingUp } from "lucide-react";

const STAGES = [
  "prospecting",
  "qualification",
  "proposal",
  "negotiation",
  "won",
  "lost",
] as const;
const STAGE_LABELS: Record<string, string> = {
  prospecting: "발굴",
  qualification: "검증",
  proposal: "제안",
  negotiation: "협상",
  won: "수주",
  lost: "실패",
};
const STAGE_COLORS: Record<string, string> = {
  prospecting: "#6366f1",
  qualification: "#8b5cf6",
  proposal: "#a78bfa",
  negotiation: "#f59e0b",
  won: "#10b981",
  lost: "#ef4444",
};

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function DealsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption | undefined>(undefined);
  const notifCount = allDeals.filter((d) => d.hasNotification).length;

  const filtered = useMemo(() => {
    let data = [...allDeals];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.customer.toLowerCase().includes(q) ||
          d.assignee.toLowerCase().includes(q),
      );
    }
    if (sort === "name-asc")
      data.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    else if (sort === "name-desc")
      data.sort((a, b) => b.title.localeCompare(a.title, "ko"));
    else if (sort === "notification")
      data.sort(
        (a, b) => (b.hasNotification ? 1 : 0) - (a.hasNotification ? 1 : 0),
      );
    return data;
  }, [search, sort]);

  const dealsByStage = useMemo(
    () =>
      STAGES.reduce(
        (acc, stage) => {
          acc[stage] = filtered.filter((d) => d.stage === stage);
          return acc;
        },
        {} as Record<string, Deal[]>,
      ),
    [filtered],
  );

  return (
    <>
      <Header
        title="거래 파이프라인"
        notificationCount={notifCount}
        searchValue={search}
        onSearchChange={setSearch}
        sortOption={sort}
        onSortChange={setSort}
      />

      <div className="p-6 animate-fade-in">
        {/* Summary Bar */}
        <div className="grid grid-cols-6 gap-3 mb-6">
          {STAGES.map((stage) => {
            const stageDeals = allDeals.filter((d) => d.stage === stage);
            const total = stageDeals.reduce((s, d) => s + d.amount, 0);
            return (
              <div
                key={stage}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${STAGE_COLORS[stage]}30`,
                }}
              >
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ color: STAGE_COLORS[stage] }}
                >
                  {STAGE_LABELS[stage]}
                </div>
                <div className="text-lg font-bold text-white">
                  {stageDeals.length}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
                  {formatCurrency(total)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => (
            <div key={stage} className="flex-shrink-0" style={{ width: 260 }}>
              {/* Column Header */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-t-xl mb-2"
                style={{
                  background: `${STAGE_COLORS[stage]}15`,
                  border: `1px solid ${STAGE_COLORS[stage]}30`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: STAGE_COLORS[stage] }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: STAGE_COLORS[stage] }}
                  >
                    {STAGE_LABELS[stage]}
                  </span>
                </div>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: `${STAGE_COLORS[stage]}25`,
                    color: STAGE_COLORS[stage],
                  }}
                >
                  {dealsByStage[stage]?.length ?? 0}
                </span>
              </div>

              {/* Cards */}
              <div
                className="space-y-2"
                style={{ maxHeight: "calc(100vh - 280px)", overflowY: "auto" }}
              >
                {(dealsByStage[stage] ?? []).slice(0, 15).map((deal) => (
                  <div
                    key={deal.id}
                    className="rounded-xl p-3 cursor-pointer transition-transform hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xs font-semibold text-white leading-tight flex-1 pr-1">
                        {deal.title}
                      </h3>
                      {deal.hasNotification && (
                        <Bell
                          size={11}
                          style={{ color: "#f59e0b", flexShrink: 0 }}
                        />
                      )}
                    </div>
                    <div
                      className="text-sm font-bold mb-2"
                      style={{ color: STAGE_COLORS[stage] }}
                    >
                      {formatCurrency(deal.amount)}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs" style={{ color: "#64748b" }}>
                        👤 {deal.customer}
                      </div>
                      <div className="text-xs" style={{ color: "#64748b" }}>
                        📋 {deal.assignee}
                      </div>
                      <div className="text-xs" style={{ color: "#64748b" }}>
                        📅{" "}
                        {new Date(deal.closeDate).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                    {/* Probability bar */}
                    <div className="mt-2">
                      <div
                        className="flex justify-between text-xs mb-1"
                        style={{ color: "#475569" }}
                      >
                        <span>성사 확률</span>
                        <span>{deal.probability}%</span>
                      </div>
                      <div
                        className="w-full rounded-full"
                        style={{
                          height: 3,
                          background: "rgba(255,255,255,0.1)",
                        }}
                      >
                        <div
                          className="rounded-full h-full transition-all"
                          style={{
                            width: `${deal.probability}%`,
                            background: STAGE_COLORS[stage],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {(dealsByStage[stage]?.length ?? 0) > 15 && (
                  <div
                    className="text-center text-xs py-2"
                    style={{ color: "#475569" }}
                  >
                    +{(dealsByStage[stage]?.length ?? 0) - 15}개 더
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
