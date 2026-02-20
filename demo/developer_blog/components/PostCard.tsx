import Link from "next/link";

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: { name: string; slug: string } | null;
  read_time: number;
  image_url: string;
  author_name: string;
  author_avatar_url: string;
  created_at: string;
};

export function PostCard({ post }: { post: Post }) {
  const dateStr = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.created_at));

  return (
    <Link href={`/post/${post.id}`} className="group cursor-pointer">
      <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white dark:bg-surface-dark shadow-sm ring-1 ring-slate-200 dark:ring-white/10 transition hover:shadow-lg dark:hover:ring-primary/50">
        <div className="relative h-48 w-full overflow-hidden bg-slate-800 shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${post.image_url}')` }}
          ></div>
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-md bg-white/90 dark:bg-black/50 px-2 py-1 text-xs font-medium text-slate-800 dark:text-white backdrop-blur-md shadow-sm">
              {post.category?.name || "기타"}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold leading-snug text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 line-clamp-3">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
            <div className="flex items-center gap-x-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[16px]">
                calendar_today
              </span>
              {dateStr}
            </div>
            <div className="flex items-center gap-x-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[16px]">
                timer
              </span>
              {post.read_time}분 소요
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
