import { createClient } from "@/utils/supabase/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Post } from "@/components/PostCard";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("posts")
    .select(
      `
      *,
      category:categories(name, slug)
    `,
    )
    .eq("id", id)
    .single();

  const post = data as unknown as Post;

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
        <Header />
        <main className="flex-1 flex justify-center items-center flex-col gap-4">
          <p className="text-xl text-slate-500">포스트를 찾을 수 없습니다.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const dateStr = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.created_at));

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Left Sidebar (Floating Actions) - Shared Design Elements */}
          <aside className="hidden lg:flex lg:col-span-1 flex-col items-center gap-6 sticky top-32 h-fit">
            <button className="group flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1e2732] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:border-red-100 transition-all shadow-sm">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  favorite
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                142
              </span>
            </button>
            <button className="group flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1e2732] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary group-hover:bg-blue-50 dark:group-hover:bg-primary/20 group-hover:border-blue-100 transition-all shadow-sm">
                <span className="material-symbols-outlined text-[24px]">
                  mode_comment
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                24
              </span>
            </button>
            <button className="group flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1e2732] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary group-hover:bg-blue-50 dark:group-hover:bg-primary/20 group-hover:border-blue-100 transition-all shadow-sm">
                <span className="material-symbols-outlined text-[24px]">
                  bookmark
                </span>
              </div>
            </button>
            <div className="w-px h-16 bg-slate-200 dark:bg-slate-800 my-2"></div>
            <button className="group">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1e2732] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  share
                </span>
              </div>
            </button>
          </aside>

          {/* Center Column (Article Content) */}
          <article className="col-span-1 lg:col-span-8 lg:col-start-3 max-w-3xl w-full mx-auto">
            {/* Hero / Meta */}
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.category?.name || "기타"}
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Post
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={post.author_name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                      src={post.author_avatar_url}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      {post.author_name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span>{dateStr}</span>
                      <span>•</span>
                      <span>{post.read_time}분 소요</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="lg:hidden p-2 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <button className="lg:hidden p-2 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="mb-10 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image_url}
                alt="Post Thumbnail"
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            {/* Content Body (Fake Markdown with Excerpt) */}
            <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="mb-6 text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                {post.excerpt}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
                본문 목업 영역입니다
              </h2>
              <p className="mb-4">
                현재 데이터베이스 구조 상 <code>content</code> 칼럼이 없어서,
                요약 내용(<code>excerpt</code>)을 기반으로 본문이 렌더링되도록
                구성했습니다. 실제 서비스 시에는 에디터에서 작성된 마크다운
                텍스트나 데이터를 파싱하여 렌더링되게 구성해야 합니다.
              </p>

              <div className="relative group my-8 rounded-lg overflow-hidden dark:bg-[#1e2732] bg-slate-50 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    example.ts
                  </span>
                  <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      content_copy
                    </span>
                  </button>
                </div>
                <div className="p-5 overflow-x-auto text-sm font-mono leading-relaxed dark:text-slate-300 text-slate-800">
                  {`function App() {
  return (
    <div>Hello World</div>
  );
}`}
                </div>
              </div>

              <p className="mb-6">
                추가적인 내용입니다. 디자인 템플릿의 UI 구조를 완벽하게
                유지하면서, 모바일 환경과 데스크탑 환경 모두에 맞게 반응형으로
                사이드바와 본문 화면이 표시됩니다.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
