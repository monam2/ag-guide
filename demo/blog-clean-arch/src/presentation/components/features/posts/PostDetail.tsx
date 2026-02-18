import { Post } from "@/domain/entities/Post";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import Link from "next/link";
import {
  deletePostAction,
  publishPostAction,
} from "@/presentation/actions/postActions";

interface PostDetailProps {
  post: Post;
  isAdmin?: boolean;
}

export function PostDetail({ post, isAdmin }: PostDetailProps) {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-4 text-center">
        <div className="flex justify-center gap-2">
          {post.status !== "PUBLIC" && (
            <Badge variant="secondary">{post.status}</Badge>
          )}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-neutral-500">
          Published on {format(new Date(post.createdAt), "MMMM d, yyyy")}
        </p>
      </header>

      {isAdmin && (
        <div className="flex justify-center gap-4 border-y py-4">
          {post.status === "PRIVATE" && (
            <>
              <form
                action={async () => {
                  "use server";
                  await publishPostAction(post.id);
                }}
              >
                <Button variant="default">Publish</Button>
              </form>
              <Button variant="outline" asChild>
                <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
              </Button>
            </>
          )}
          <form
            action={async () => {
              "use server";
              await deletePostAction(post.id);
            }}
          >
            <Button variant="destructive">Archive</Button>
          </form>
        </div>
      )}

      <div className="prose dark:prose-invert mx-auto">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
