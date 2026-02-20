/* eslint-disable */
"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { type User } from "@supabase/supabase-js";

export default function WritePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState("Understanding React Server Components");
  const [content, setContent] = useState(
    `# Introduction\nReact Server Components (RSC) are a new paradigm in React that allow you to render components on the server. This reduces the bundle size sent to the client and improves initial load performance.\n\n## Why RSC?\nTraditionally, React components render on the client. With RSC, we can move data-heavy operations to the server.\n\n> "Server Components allow developers to build apps that span the server and client."\n\nHere is a simple example of a server component:\n\n\`\`\`javascript\nasync function getData() {\n  const res = await fetch('https://api.example.com/data');\n  return res.json();\n}\n\nexport default async function Page() {\n  const data = await getData();\n  return (\n    <main>\n      <h1>{data.title}</h1>\n      <p>{data.description}</p>\n    </main>\n  );\n}\n\`\`\`\n\n## Key Benefits\n- **Zero Bundle Size:** Server components don't add to your JS bundle.\n- **Direct Database Access:** Query your DB directly inside your component.\n- **Automatic Code Splitting:** Client components imported by server components are automatically code-split.`,
  );

  const [isPublishing, setIsPublishing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync scroll positions
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login?error=You must be logged in to write a post");
      } else {
        setUser(session.user);
      }
    }
    getUser();
  }, [supabase, router]);

  useEffect(() => {
    // Check initial dark mode from window
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (!previewRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const percentage = scrollTop / (scrollHeight - clientHeight);

    const previewScrollHeight = previewRef.current.scrollHeight;
    const previewClientHeight = previewRef.current.clientHeight;
    previewRef.current.scrollTop =
      percentage * (previewScrollHeight - previewClientHeight);
  };

  const insertText = (
    before: string,
    after: string = "",
    defaultText: string = "",
  ) => {
    if (!editorRef.current) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;

    const newContent =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    setContent(newContent);

    // Set timeout to ensure React state has updated before setting selection
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        const cursorPosition = start + before.length + selectedText.length;
        editorRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const handlePublish = async () => {
    if (!user) return;
    setIsPublishing(true);

    // Generate dummy/calculated values for columns not in this UI
    const excerpt =
      content.substring(0, 150) + (content.length > 150 ? "..." : "");
    const read_time = Math.max(1, Math.ceil(content.split(" ").length / 200));
    const image_url =
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
    const author_name = user.email?.split("@")[0] || "Author";
    const author_avatar_url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
    const category_id = "55555555-5555-5555-5555-555555555555"; // example "리액트" category ID from seed

    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        excerpt,
        read_time,
        image_url,
        author_name,
        author_avatar_url,
        category_id,
        user_id: user.id,
      },
    ]);

    setIsPublishing(false);

    if (error) {
      alert("Failed to publish post: " + error.message);
    } else {
      alert("Post published successfully!");
      router.push("/");
    }
  };

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark text-slate-500">
        Loading...
      </div>
    );
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  // Naive line and col for current caret, simpler approximation
  const lines = content.split("\n");

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 antialiased overflow-hidden flex flex-col h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 5px;
            border: 2px solid transparent;
            background-clip: content-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #475569;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #64748b;
        }
      `,
        }}
      />

      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c2430] flex items-center justify-between px-6 shrink-0 z-10 shadow-sm transition-colors">
        <div className="flex items-center gap-4 flex-1">
          <Link
            href="/"
            className="flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              arrow_back
            </span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <div className="flex flex-col flex-1 max-w-lg">
            <input
              className="bg-transparent border-none p-0 text-lg font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 w-full leading-tight focus:outline-none"
              placeholder="Enter post title..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Draft Auto-saved
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-sm font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hidden sm:flex">
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            Settings
          </button>

          <div className="flex items-center gap-2 sm:ml-4">
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 hidden sm:block">
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 transition-colors shadow-md shadow-primary/10 disabled:opacity-50 flex flex-row items-center gap-2"
            >
              {isPublishing ? "Publishing..." : "Publish"}
              <span className="material-symbols-outlined text-[16px]">
                send
              </span>
            </button>
          </div>

          <div className="ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-0.5 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                alt="Avatar"
                className="h-full w-full object-cover rounded-full bg-slate-200"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="h-12 border-b border-slate-200 dark:border-slate-800 bg-gray-50 dark:bg-[#111922] flex items-center px-6 gap-1 shrink-0 overflow-x-auto">
        <button
          onClick={() => insertText("**", "**", "text")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Bold"
        >
          <span className="material-symbols-outlined text-[20px]">
            format_bold
          </span>
        </button>
        <button
          onClick={() => insertText("*", "*", "text")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Italic"
        >
          <span className="material-symbols-outlined text-[20px]">
            format_italic
          </span>
        </button>
        <button
          onClick={() => insertText("~~", "~~", "text")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Strikethrough"
        >
          <span className="material-symbols-outlined text-[20px]">
            format_strikethrough
          </span>
        </button>
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1 shrink-0"></div>
        <button
          onClick={() => insertText("# ", "", "Heading")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Header 1"
        >
          <span className="material-symbols-outlined text-[20px]">
            format_h1
          </span>
        </button>
        <button
          onClick={() => insertText("## ", "", "Heading")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Header 2"
        >
          <span className="material-symbols-outlined text-[20px]">
            format_h2
          </span>
        </button>
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1 shrink-0"></div>
        <button
          onClick={() => insertText("> ", "", "Quote")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Quote"
        >
          <span className="material-symbols-outlined text-[20px]">
            format_quote
          </span>
        </button>
        <button
          onClick={() => insertText("`\n", "\n`\n", "code block")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Code Block"
        >
          <span className="material-symbols-outlined text-[20px]">code</span>
        </button>
        <button
          onClick={() => insertText("[", "](url)", "link text")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Link"
        >
          <span className="material-symbols-outlined text-[20px]">link</span>
        </button>
        <button
          onClick={() => insertText("![", "](image url)", "alt text")}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all shrink-0"
          title="Image"
        >
          <span className="material-symbols-outlined text-[20px]">image</span>
        </button>

        <div className="flex-1"></div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
          <span className="material-symbols-outlined text-[16px]">
            visibility
          </span>
          <span className="hidden sm:inline">Preview Mode</span>
        </div>
      </div>

      {/* Editor & Preview Workspace */}
      <main className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Editor Pane */}
        <div className="w-full md:w-1/2 bg-white dark:bg-[#1c2430] border-r border-slate-200 dark:border-slate-800 flex flex-col relative group">
          <div className="flex-1 flex overflow-hidden">
            <textarea
              ref={editorRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onScroll={handleScroll}
              className="flex-1 w-full h-full bg-transparent resize-none outline-none font-mono text-sm leading-7 text-slate-800 dark:text-slate-300 p-6 custom-scrollbar"
              spellCheck="false"
              placeholder="# Start writing..."
            />
          </div>

          {/* Editor Status bar */}
          <div className="h-8 bg-slate-50 dark:bg-[#111922] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <div className="flex gap-4">
              <span className="font-medium">Markdown</span>
              <span>UTF-8</span>
            </div>
            <div className="flex gap-4">
              <span>{lines.length} Lines</span>
              <span>{wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Preview Pane */}
        <div
          ref={previewRef}
          className="w-full md:w-1/2 bg-background-light dark:bg-background-dark flex flex-col overflow-y-auto p-8 md:p-12 custom-scrollbar pb-32"
        >
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {/* Inject title into preview for full context */}
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
              {title || "Untitled"}
            </h1>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node: _node, ...props }) => (
                  <h2
                    className="text-2xl font-bold mb-4 text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2"
                    {...props}
                  />
                ),
                blockquote: ({ node: _node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary pl-4 py-1 my-6 italic text-slate-600 dark:text-slate-400 bg-white dark:bg-[#1e2732] shadow-sm rounded-r pr-4"
                    {...props}
                  />
                ),
                pre: ({ node: _node, ...props }) => (
                  <div className="rounded-lg overflow-hidden bg-slate-900 text-sm my-6 shadow-md border border-slate-800">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-400 font-mono text-xs">
                        code snippet
                      </span>
                    </div>
                    <div className="p-4 font-mono overflow-x-auto text-slate-300">
                      <pre className="!bg-transparent !p-0 !m-0" {...props} />
                    </div>
                  </div>
                ),
                ul: ({ node: _node, ...props }) => (
                  <ul
                    className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8 marker:text-primary"
                    {...props}
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
}
