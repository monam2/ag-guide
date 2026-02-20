import Link from "next/link";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="relative flex w-full flex-col overflow-hidden py-12 min-h-screen">
      <div className="layout-container flex h-full grow flex-col justify-center items-center px-4 z-10">
        {/* Auth Card */}
        <div className="flex flex-col w-full max-w-[440px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c2430] shadow-xl p-8">
          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">
                terminal
              </span>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Welcome back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                Sign in to access your dashboard
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
              {error as string}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-4" action={login}>
            {/* Email */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="w-full h-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111922] px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  htmlFor="password"
                >
                  Password
                </label>
                {/* Forgot Password link kept purely for design matching */}
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full h-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111922] px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="mt-2 w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2 transform active:scale-[0.98] shadow-md shadow-primary/20"
            >
              Sign In
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Background Flair */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-60">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal"></div>
      </div>
    </div>
  );
}
