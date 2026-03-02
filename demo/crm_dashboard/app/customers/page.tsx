"use client";

import { useState, useMemo } from "react";
import Header, { SortOption } from "@/components/Header";
import { customers as allCustomers } from "@/lib/data";
import { Customer } from "@/types";
import { MapPin, Tag, Bell } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  active: "활성",
  inactive: "비활성",
  prospect: "잠재",
  churned: "이탈",
};
const STATUS_COLOR: Record<string, { bg: string; color: string }> = {
  active: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  inactive: { bg: "rgba(100,116,139,0.15)", color: "#64748b" },
  prospect: { bg: "rgba(99,102,241,0.15)", color: "#a5b4fc" },
  churned: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
};
const COUNTRY_FLAG: Record<string, string> = {
  KR: "🇰🇷",
  US: "🇺🇸",
  JP: "🇯🇵",
  GB: "🇬🇧",
  DE: "🇩🇪",
  CN: "🇨🇳",
  AU: "🇦🇺",
};

const PAGE_SIZE = 20;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const notifCount = allCustomers.filter((c) => c.hasNotification).length;

  const filtered = useMemo(() => {
    let data = [...allCustomers];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q),
      );
    }

    if (filterStatus !== "all") {
      data = data.filter((c) => c.status === filterStatus);
    }

    if (sort === "name-asc")
      data.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    else if (sort === "name-desc")
      data.sort((a, b) => b.name.localeCompare(a.name, "ko"));
    else if (sort === "notification")
      data.sort(
        (a, b) => (b.hasNotification ? 1 : 0) - (a.hasNotification ? 1 : 0),
      );

    return data;
  }, [search, sort, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Header
        title="고객 관리"
        notificationCount={notifCount}
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        sortOption={sort}
        onSortChange={(s) => {
          setSort(s);
          setPage(1);
        }}
      />

      <div className="p-6 animate-fade-in">
        {/* Stats + Filter */}
        <div className="flex items-center gap-3 mb-5">
          {["all", "active", "prospect", "inactive", "churned"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilterStatus(s);
                setPage(1);
              }}
              className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background:
                  filterStatus === s
                    ? s === "all"
                      ? "rgba(99,102,241,0.2)"
                      : (STATUS_COLOR[s]?.bg ?? "rgba(99,102,241,0.2)")
                    : "rgba(255,255,255,0.04)",
                color:
                  filterStatus === s
                    ? s === "all"
                      ? "#a5b4fc"
                      : (STATUS_COLOR[s]?.color ?? "#a5b4fc")
                    : "#64748b",
                border:
                  filterStatus === s
                    ? "1px solid rgba(99,102,241,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {s === "all"
                ? `전체 (${allCustomers.length})`
                : `${STATUS_LABEL[s]} (${allCustomers.filter((c) => c.status === s).length})`}
            </button>
          ))}
          <div className="ml-auto text-sm" style={{ color: "#475569" }}>
            {filtered.length}명 / {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)}
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  "이름",
                  "회사",
                  "상태",
                  "매출",
                  "국가",
                  "가입일",
                  "알림",
                  "태그",
                ].map((th) => (
                  <th
                    key={th}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "#475569" }}
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((c: Customer, i) => (
                <tr
                  key={c.id}
                  className="transition-colors"
                  style={{
                    borderBottom:
                      i < paged.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    animationDelay: `${i * 20}ms`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "white",
                        }}
                      >
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {c.name}
                        </div>
                        <div className="text-xs" style={{ color: "#475569" }}>
                          {c.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#94a3b8" }}
                  >
                    {c.company}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-lg text-xs font-medium"
                      style={{
                        background: STATUS_COLOR[c.status].bg,
                        color: STATUS_COLOR[c.status].color,
                      }}
                    >
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-sm font-medium"
                    style={{ color: "#10b981" }}
                  >
                    ${c.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "#94a3b8" }}
                    >
                      <MapPin size={11} />
                      {COUNTRY_FLAG[c.country]} {c.country}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#64748b" }}
                  >
                    {new Date(c.joinDate).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-4 py-3">
                    {c.hasNotification && (
                      <Bell size={14} style={{ color: "#f59e0b" }} />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-xs"
                          style={{
                            background: "rgba(99,102,241,0.12)",
                            color: "#a5b4fc",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: page === 1 ? "#374151" : "#94a3b8",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              이전
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = page <= 3 ? i + 1 : page - 2 + i;
              if (p < 1 || p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-lg text-sm transition-all"
                  style={{
                    background:
                      p === page
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(255,255,255,0.04)",
                    color: p === page ? "#a5b4fc" : "#64748b",
                    border:
                      p === page
                        ? "1px solid rgba(99,102,241,0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: page === totalPages ? "#374151" : "#94a3b8",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </>
  );
}
