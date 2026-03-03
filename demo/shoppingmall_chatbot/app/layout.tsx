import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "리뷰 AI 챗봇",
  description: "쇼핑 리뷰 분석 챗봇입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} font-sans antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
