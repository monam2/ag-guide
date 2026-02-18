"use client";

import { useActionState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import {
  createPostAction,
  updatePostAction,
  ActionState,
} from "@/presentation/actions/postActions";
import { Post } from "@/domain/entities/Post";

interface PostEditorProps {
  post?: Post; // If provided, it's edit mode
}

export function PostEditor({ post }: PostEditorProps) {
  const initialState: ActionState = { message: "", error: "" };

  // If post exists, we bind the id to updatePostAction
  const action = post ? updatePostAction.bind(null, post.id) : createPostAction;

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter post title"
          defaultValue={post?.title}
          required
          minLength={5}
          maxLength={100}
        />
        <p className="text-sm text-neutral-500">5 to 100 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here..."
          defaultValue={post?.content}
          required
          minLength={10}
          maxLength={10000}
          className="min-h-[300px] font-mono"
        />
        <p className="text-sm text-neutral-500">10 to 10,000 characters</p>
      </div>

      {state.error && (
        <div className="text-red-500 text-sm font-medium">
          Error: {state.error}
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
