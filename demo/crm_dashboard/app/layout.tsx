import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "CRM Pro - 관리자 대시보드",
  description: "CRM 고객 관계 관리 시스템 관리자 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Sidebar />
        <main
          style={{
            marginLeft: "240px",
            minHeight: "100vh",
            paddingTop: "64px",
            background: "#0f1117",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
