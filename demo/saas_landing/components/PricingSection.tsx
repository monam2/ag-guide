"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            합리적인 요금제
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            개인 작가부터 대규모 팀까지, 모두를 위한 플랜이 준비되어 있습니다.
          </p>

          <div className="inline-flex items-center p-1 bg-card border border-border rounded-full relative">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                !isYearly
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              월간 결제
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                isYearly
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              연간 결제
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                2개월 무료 🎉
              </span>
            </button>
            {/* Animated Background Pill */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-primary rounded-full transition-transform duration-300 ease-in-out ${
                isYearly
                  ? "translate-x-[calc(100%-8px)] w-[140px]"
                  : "translate-x-0 w-[100px]"
              }`}
              style={{
                width: isYearly ? "140px" : "100px",
                transform: isYearly ? "translateX(105px)" : "translateX(0)",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-3xl border border-border bg-card p-8 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-2">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              AI 글쓰기를 처음 시작하는 분들을 위한 기본 플랜
            </p>
            <button className="w-full py-2.5 px-4 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors mb-8">
              무료로 시작하기
            </button>
            <ul className="flex flex-col gap-4 text-sm mt-auto">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> 기본 AI 글쓰기
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> 월 5,000 단어
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> 1개 프로젝트
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <X className="h-4 w-4" /> 템플릿 제한적 사용
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-primary mb-2">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  ${isYearly ? "15" : "19"}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              전문적인 글쓰기 작업을 위한 강력한 기능
            </p>
            <button className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors mb-8">
              Pro 시작하기
            </button>
            <ul className="flex flex-col gap-4 text-sm mt-auto">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-primary" /> 무제한 AI 글쓰기
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-primary" /> 고급 문법 교정
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-primary" /> 우선 지원 (Priority
                Support)
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-primary" /> 브랜드 보이스 설정
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-primary" /> 모든 템플릿 액세스
              </li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-3xl border border-border bg-card p-8 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Enterprise
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  ${isYearly ? "39" : "49"}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              팀 협업과 보안이 필요한 기업을 위한 솔루션
            </p>
            <button className="w-full py-2.5 px-4 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors mb-8">
              문의하기
            </button>
            <ul className="flex flex-col gap-4 text-sm mt-auto">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> 모든 Pro 기능 포함
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> SSO 로그인
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> 전담 매니저 배정
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> API 액세스
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="h-4 w-4 text-green-500" /> 고급 보안 감사 로그
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
