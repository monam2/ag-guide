import { getPost } from "@/presentation/actions/postActions";
import { PostDetail } from "@/presentation/components/features/posts/PostDetail";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post || post.status !== "PUBLIC") {
    // Basic check. In real app, checking user session for draft viewing would be here.
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <PostDetail post={post} />
    </div>
  );
}
