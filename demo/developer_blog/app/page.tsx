import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostList } from "@/components/PostList";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white mb-4">
              미래를 설계하다
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              프론트엔드 아키텍처, 백엔드 확장성, 데브옵스의 최신 동향을 심층
              분석합니다. 개발자를 위해 완성된 공간입니다.
            </p>
          </div>

          <PostList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
