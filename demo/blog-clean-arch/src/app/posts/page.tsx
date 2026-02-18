import { getAllPublicPosts } from "@/presentation/actions/postActions";
import { PostList } from "@/presentation/components/features/posts/PostList";
import { Button } from "@/presentation/components/ui/button";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getAllPublicPosts();
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/new">Create Post</Link>
        </Button>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
