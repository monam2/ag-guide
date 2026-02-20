import Link from "next/link";
import { PenTool } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-foreground"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
              <PenTool className="h-5 w-5" />
            </div>
            <span>WriteFlow</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            기능
          </Link>
          <Link
            href="#pricing"
            className="hover:text-foreground transition-colors"
          >
            가격
          </Link>
          <Link
            href="#customers"
            className="hover:text-foreground transition-colors"
          >
            고객 사례
          </Link>
          <Link
            href="#blog"
            className="hover:text-foreground transition-colors"
          >
            블로그
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              무료 체험 시작
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
