import Link from "next/link";
import { PenTool, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-foreground mb-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <PenTool className="h-5 w-5" />
              </div>
              <span>WriteFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              AI 기반의 차세대 글쓰기 도구. 더 빠르고 스마트하게 당신의 이야기를
              세상에 전하세요.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">제품</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  기능
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  통합
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  가격
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  업데이트
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">리소스</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  가이드
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  도움말 센터
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">회사</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  채용
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  법적 고지
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  연락처
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 WriteFlow Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
