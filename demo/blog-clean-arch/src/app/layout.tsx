import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clean Blog",
  description: "A blog platform built with Clean Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/posts" className="text-xl font-bold tracking-tight">
              CleanBlog
            </Link>
            <nav className="flex gap-4 items-center">
              <Link
                href="/posts"
                className="text-sm font-medium hover:underline text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/admin/posts/new"
                className="text-sm font-medium hover:underline text-muted-foreground hover:text-primary transition-colors"
              >
                New Post
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
