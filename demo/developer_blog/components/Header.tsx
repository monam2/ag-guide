import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { logout } from "@/app/(auth)/actions";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-surface-dark bg-white/80 dark:bg-[#111418]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-xl">terminal</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            DevLog
          </h1>
        </Link>
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            </div>
            <input
              className="block w-full rounded-lg border border-gray-200 dark:border-0 bg-white dark:bg-surface-dark py-2 pl-10 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary sm:leading-6 shadow-sm dark:shadow-none"
              placeholder="게시물 검색..."
              type="text"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="inline-flex items-center rounded border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-transparent px-1.5 py-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                ⌘K
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                {user.email}
              </span>
              <Link
                href="/write"
                className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">
                  edit_document
                </span>
                Write
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors hidden sm:block"
            >
              로그인
            </Link>
          )}
          {!user && (
            <Link
              href="/signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
            >
              시작하기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
