"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Activity,
  TrendingUp,
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/customers", label: "고객 관리", icon: Users },
  { href: "/deals", label: "거래 파이프라인", icon: Briefcase },
  { href: "/activities", label: "활동 피드", icon: Activity },
  { href: "/analytics", label: "분석", icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{ width: "var(--sidebar-width)", height: "100vh" }}
      className="fixed left-0 top-0 z-40 flex flex-col"
      style={{
        width: "240px",
        height: "100vh",
        background: "linear-gradient(180deg, #13161f 0%, #0f1117 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-6 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 20px rgba(99,102,241,0.4)",
          }}
        >
          <TrendingUp size={18} color="white" />
        </div>
        <div>
          <div className="font-bold text-white text-sm tracking-wide">
            CRM Pro
          </div>
          <div className="text-xs" style={{ color: "#64748b" }}>
            Enterprise Suite
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div
          className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#475569" }}
        >
          메인 메뉴
        </div>
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))"
                      : "transparent",
                    color: isActive ? "#a5b4fc" : "#94a3b8",
                    border: isActive
                      ? "1px solid rgba(99,102,241,0.2)"
                      : "1px solid transparent",
                  }}
                >
                  <Icon size={17} />
                  <span className="text-sm font-medium">{label}</span>
                  {isActive && (
                    <ChevronRight
                      size={14}
                      className="ml-auto"
                      style={{ color: "#6366f1" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#475569" }}
        >
          시스템
        </div>
        <ul>
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{ color: "#64748b" }}
            >
              <Settings size={17} />
              <span className="text-sm font-medium">설정</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      <div
        className="px-4 py-4 mx-3 mb-4 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            관
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">
              관리자
            </div>
            <div className="text-xs truncate" style={{ color: "#475569" }}>
              admin@crmPro.io
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
