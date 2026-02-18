import { Post } from "@/domain/entities/Post";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
  isAdmin?: boolean;
}

export function PostList({ posts, isAdmin }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-neutral-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
