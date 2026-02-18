import { getPost } from "@/presentation/actions/postActions";
import { PostEditor } from "@/presentation/components/features/posts/PostEditor";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  // Assuming only admin access reaches here
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      <PostEditor post={post} />
    </div>
  );
}
