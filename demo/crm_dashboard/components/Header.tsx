"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  SortAsc,
  ArrowDownAZ,
  BellRing,
} from "lucide-react";

export type SortOption = "name-asc" | "name-desc" | "notification";

interface HeaderProps {
  title: string;
  sortOption?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  notificationCount?: number;
}

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "name-asc",
    label: "이름 순 (A→Z)",
    icon: <ArrowDownAZ size={14} />,
  },
  {
    value: "name-desc",
    label: "이름 순 (Z→A)",
    icon: <ArrowDownAZ size={14} className="rotate-180" />,
  },
  {
    value: "notification",
    label: "알림 여부 순",
    icon: <BellRing size={14} />,
  },
];

export default function Header({
  title,
  sortOption,
  onSortChange,
  searchValue = "",
  onSearchChange,
  notificationCount = 0,
}: HeaderProps) {
  const [showSort, setShowSort] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? "정렬";

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center gap-4 px-6"
      style={{
        left: "240px",
        height: "64px",
        background: "rgba(15, 17, 23, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Title */}
      <h1 className="text-lg font-semibold text-white flex-shrink-0">
        {title}
      </h1>

      {/* Search + Sort */}
      {onSearchChange && (
        <div className="flex items-center gap-2 flex-1 max-w-lg">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#475569" }}
            />
            <input
              type="text"
              placeholder="검색..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
              }}
            />
          </div>

          {/* Sort Dropdown */}
          {onSortChange && (
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowSort((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all"
                style={{
                  background: sortOption
                    ? "rgba(99,102,241,0.15)"
                    : "rgba(255,255,255,0.06)",
                  border: sortOption
                    ? "1px solid rgba(99,102,241,0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: sortOption ? "#a5b4fc" : "#94a3b8",
                  whiteSpace: "nowrap",
                }}
              >
                <SortAsc size={14} />
                <span>{sortOption ? activeSortLabel : "정렬"}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform ${showSort ? "rotate-180" : ""}`}
                />
              </button>

              {showSort && (
                <div
                  className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
                  style={{
                    top: "100%",
                    minWidth: 180,
                    background: "#1a1d27",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onSortChange(opt.value);
                        setShowSort(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors"
                      style={{
                        background:
                          sortOption === opt.value
                            ? "rgba(99,102,241,0.15)"
                            : "transparent",
                        color: sortOption === opt.value ? "#a5b4fc" : "#94a3b8",
                      }}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotif((v) => !v)}
          className="relative p-2 rounded-xl transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Bell size={18} style={{ color: "#94a3b8" }} />
          {notificationCount > 0 && (
            <span
              className="absolute -top-1 -right-1 text-white text-xs font-bold flex items-center justify-center"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                fontSize: 10,
              }}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {showNotif && (
          <div
            className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
            style={{
              top: "100%",
              width: 280,
              background: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-sm font-semibold text-white">알림</span>
            </div>
            <div className="py-2">
              <div className="px-4 py-3 text-sm" style={{ color: "#64748b" }}>
                {notificationCount}개의 새 알림이 있습니다.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div
        className="rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
        style={{
          width: 36,
          height: 36,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 12px rgba(99,102,241,0.3)",
        }}
      >
        관
      </div>
    </header>
  );
}
