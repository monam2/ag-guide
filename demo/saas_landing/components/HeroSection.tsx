import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradients for dark mode aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-0 dark:opacity-100 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[100px] rounded-full opacity-100 dark:opacity-0 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          v2.0 업데이트 출시
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          AI와 함께 더 빠르게 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            더 잘 쓰세요.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          블로그 포스팅부터 이메일, 광고 카피까지. 아이디어를 몇 초 만에 완성된
          콘<br className="hidden md:block" />
          텐츠로 바꿔보세요. 창의성을 극대화하는 가장 쉬운 방법입니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-white shadow transition-colors hover:bg-primary-hover w-full sm:w-auto"
          >
            무료 체험 시작 <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <button className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-8 py-3 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-muted w-full sm:w-auto">
            <PlayCircle className="mr-2 h-5 w-5 text-muted-foreground" />
            데모 보기
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground font-medium">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted overflow-hidden"
              >
                <div className="w-full h-full bg-primary/20" />
              </div>
            ))}
          </div>
          <span>10,000+ 명의 작가들이 사용 중</span>
        </div>
      </div>
    </section>
  );
}
