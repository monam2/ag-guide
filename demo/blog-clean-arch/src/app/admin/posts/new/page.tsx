import { PostEditor } from "@/presentation/components/features/posts/PostEditor";

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Post</h1>
      <PostEditor />
    </div>
  );
}
