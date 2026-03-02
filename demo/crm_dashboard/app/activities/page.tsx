"use client";

import { useState, useMemo } from "react";
import Header, { SortOption } from "@/components/Header";
import { activities as allActivities } from "@/lib/data";
import {
  Phone,
  Mail,
  CalendarCheck,
  FileText,
  ListTodo,
  Bell,
} from "lucide-react";

const TYPE_LABEL: Record<string, string> = {
  call: "전화",
  email: "이메일",
  meeting: "미팅",
  note: "메모",
  task: "할 일",
};
const TYPE_COLORS: Record<string, string> = {
  call: "#6366f1",
  email: "#10b981",
  meeting: "#f59e0b",
  note: "#8b5cf6",
  task: "#0ea5e9",
};
const TYPE_ICONS: Record<string, React.ReactNode> = {
  call: <Phone size={15} />,
  email: <Mail size={15} />,
  meeting: <CalendarCheck size={15} />,
  note: <FileText size={15} />,
  task: <ListTodo size={15} />,
};
const TYPES = ["all", "call", "email", "meeting", "note", "task"] as const;

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return (
    d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const notifCount = allActivities.filter((a) => a.hasNotification).length;

  const filtered = useMemo(() => {
    let data = [...allActivities];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) =>
          a.description.toLowerCase().includes(q) ||
          a.customerName.toLowerCase().includes(q) ||
          a.user.toLowerCase().includes(q),
      );
    }
    if (typeFilter !== "all") data = data.filter((a) => a.type === typeFilter);
    if (sort === "name-asc")
      data.sort((a, b) => a.customerName.localeCompare(b.customerName, "ko"));
    else if (sort === "name-desc")
      data.sort((a, b) => b.customerName.localeCompare(a.customerName, "ko"));
    else if (sort === "notification")
      data.sort(
        (a, b) => (b.hasNotification ? 1 : 0) - (a.hasNotification ? 1 : 0),
      );
    return data;
  }, [search, sort, typeFilter]);

  return (
    <>
      <Header
        title="활동 피드"
        notificationCount={notifCount}
        searchValue={search}
        onSearchChange={setSearch}
        sortOption={sort}
        onSortChange={setSort}
      />

      <div className="p-6 animate-fade-in">
        {/* Type Filter */}
        <div className="flex items-center gap-2 mb-6">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background:
                  typeFilter === type
                    ? type === "all"
                      ? "rgba(99,102,241,0.2)"
                      : `${TYPE_COLORS[type]}20`
                    : "rgba(255,255,255,0.04)",
                color:
                  typeFilter === type
                    ? type === "all"
                      ? "#a5b4fc"
                      : TYPE_COLORS[type]
                    : "#64748b",
                border:
                  typeFilter === type
                    ? `1px solid ${type === "all" ? "rgba(99,102,241,0.3)" : `${TYPE_COLORS[type]}40`}`
                    : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {type !== "all" && (
                <span style={{ color: TYPE_COLORS[type] }}>
                  {TYPE_ICONS[type]}
                </span>
              )}
              {type === "all"
                ? `전체 (${allActivities.length})`
                : `${TYPE_LABEL[type]} (${allActivities.filter((a) => a.type === type).length})`}
            </button>
          ))}
          <div className="ml-auto text-sm" style={{ color: "#475569" }}>
            {filtered.length}건
          </div>
        </div>

        {/* Timeline */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {filtered.map((act, i) => (
            <div
              key={act.id}
              className="flex items-start gap-4 px-5 py-4 transition-colors"
              style={{
                borderBottom:
                  i < filtered.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
                style={{
                  background: `${TYPE_COLORS[act.type]}15`,
                  color: TYPE_COLORS[act.type],
                }}
              >
                {TYPE_ICONS[act.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium text-white">
                    {act.description}
                  </p>
                  {act.hasNotification && (
                    <Bell
                      size={13}
                      style={{ color: "#f59e0b", flexShrink: 0, marginLeft: 8 }}
                    />
                  )}
                </div>
                <div
                  className="flex items-center gap-3 text-xs"
                  style={{ color: "#475569" }}
                >
                  <span
                    className="px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: `${TYPE_COLORS[act.type]}15`,
                      color: TYPE_COLORS[act.type],
                    }}
                  >
                    {TYPE_LABEL[act.type]}
                  </span>
                  <span>👤 {act.customerName}</span>
                  <span>🔧 {act.user}</span>
                  <span className="ml-auto">
                    {formatTimestamp(act.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              className="flex items-center justify-center py-16 text-sm"
              style={{ color: "#475569" }}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
