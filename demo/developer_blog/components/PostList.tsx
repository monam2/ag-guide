"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { PostCard, type Post } from "./PostCard";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 6;
  // Memoize supabase client to avoid recreation on every render
  const [supabase] = useState(() => createClient());

  // Fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*");
      if (data) setCategories(data);
    }
    fetchCategories();
  }, [supabase]);

  // Fetch Posts
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      let query = supabase
        .from("posts")
        .select(
          `
          *,
          category:categories(name, slug)
        `,
        )
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      // Pagination calculation
      const from = 0;
      const to = page * POSTS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data } = await query;

      if (data) {
        setPosts(data as unknown as Post[]);
        // If we get fewer items than requested requested max, there's no more pages.
        // Or if we exactly got requested max, there *might* be more. Better is query.count(), but checking length is acceptable here.
        setHasMore(data.length === page * POSTS_PER_PAGE);
      }
      setLoading(false);
    }
    fetchPosts();
  }, [supabase, selectedCategory, page]);

  const featuredPost =
    !selectedCategory && page === 1 && posts.length > 0 ? posts[0] : null;
  const displayedPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <div>
      {/* Category Filters */}
      <div className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start mb-12">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setPage(1);
          }}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !selectedCategory
              ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/20"
              : "bg-slate-100 dark:bg-surface-dark text-slate-600 dark:text-slate-300 ring-1 ring-inset ring-slate-200 dark:ring-white/10 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">apps</span>
          전체보기
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setPage(1);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/20"
                : "bg-slate-100 dark:bg-surface-dark text-slate-600 dark:text-slate-300 ring-1 ring-inset ring-slate-200 dark:ring-white/10 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading && posts.length === 0 ? (
        <div className="flex justify-center py-20 text-slate-500">
          포스트를 불러오는 중...
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <Link
              href={`/post/${featuredPost.id}`}
              className="block relative mb-12 overflow-hidden rounded-2xl bg-surface-dark shadow-xl ring-1 ring-white/10 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              <div
                className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${featuredPost.image_url}')` }}
              ></div>
              <div className="relative z-20 flex h-full min-h-[400px] flex-col justify-end p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-md bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/30 backdrop-blur-sm shadow-sm">
                    추천 게시물
                  </span>
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1 drop-shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">
                      schedule
                    </span>{" "}
                    {featuredPost.read_time}분 소요
                  </span>
                </div>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl max-w-3xl leading-tight drop-shadow-md">
                  {featuredPost.title}
                </h3>
                <p className="mt-4 text-lg text-slate-300 max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-none drop-shadow-sm">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-700 ring-2 ring-white/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={featuredPost.author_name}
                        className="h-full w-full object-cover"
                        src={featuredPost.author_avatar_url}
                      />
                    </div>
                    <div className="text-sm font-medium text-white drop-shadow-sm">
                      <span>{featuredPost.author_name}</span>
                      <span className="mx-1 text-slate-400">•</span>
                      <span className="text-slate-400">
                        {new Intl.DateTimeFormat("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(featuredPost.created_at))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination / Load More */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-surface-dark px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  {loading ? "hourglass_empty" : "refresh"}
                </span>
                {loading ? "불러오는 중..." : "게시물 더보기"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
