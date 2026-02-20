import Link from "next/link";
import { CreditCard } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 border-t border-border bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
          글쓰기를 혁신할 준비가 되셨나요?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          이미 10,000명 이상의 작가와 마케터가 WriteFlow와 함께하고 있습니다.
          <br className="hidden sm:block" />
          지금 바로 시작하고 생산성의 차이를 경험해보세요.
        </p>

        <div className="flex flex-col items-center justify-center space-y-4">
          <Link
            href="/signup"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-10 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            무료 체험 시작
          </Link>
          <div className="flex items-center text-sm text-muted-foreground font-medium">
            <CreditCard className="mr-2 h-4 w-4" />
            신용카드 필요 없음
          </div>
        </div>
      </div>
    </section>
  );
}
