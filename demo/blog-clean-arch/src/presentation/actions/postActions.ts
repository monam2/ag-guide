"use server";

import { CreatePost } from "../../domain/use-cases/CreatePost";
import { UpdatePost } from "../../domain/use-cases/UpdatePost";
import { PublishPost } from "../../domain/use-cases/PublishPost";
import { DeletePost } from "../../domain/use-cases/DeletePost";
import { ListPosts } from "../../domain/use-cases/ListPosts";
import { GetPost } from "../../domain/use-cases/GetPost";
import { FilePostRepository } from "../../infrastructure/repositories/FilePostRepository";
import { Post, PostStatus } from "../../domain/entities/Post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Dependency Injection
const postRepository = new FilePostRepository();
const createPostUseCase = new CreatePost(postRepository);
const updatePostUseCase = new UpdatePost(postRepository);
const publishPostUseCase = new PublishPost(postRepository);
const deletePostUseCase = new DeletePost(postRepository);
const listPostsUseCase = new ListPosts(postRepository);
const getPostUseCase = new GetPost(postRepository);

const DEMO_USER_ID = "demo-user"; // Hardcoded for demo requirement

export type ActionState = {
  message?: string;
  error?: string;
};

export async function createPostAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    await createPostUseCase.execute({
      title,
      content,
      authorId: DEMO_USER_ID,
    });
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath("/posts");
  redirect("/posts");
}

export async function updatePostAction(
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    await updatePostUseCase.execute({
      id,
      title,
      content,
      userId: DEMO_USER_ID,
    });
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath(`/posts/${id}`);
  revalidatePath("/posts");
  redirect(`/posts/${id}`);
}

export async function publishPostAction(id: string) {
  try {
    await publishPostUseCase.execute({ id, userId: DEMO_USER_ID });
    revalidatePath(`/posts/${id}`);
    revalidatePath("/posts");
  } catch (error: any) {
    console.error(error);
    // Handle error (e.g. show toast in client)
  }
}

export async function deletePostAction(id: string) {
  try {
    await deletePostUseCase.execute({ id, userId: DEMO_USER_ID });
    revalidatePath("/posts");
  } catch (error: any) {
    console.error(error);
  }
  redirect("/posts");
}

export async function getPosts(status?: PostStatus) {
  return listPostsUseCase.execute({ status, authorId: DEMO_USER_ID });
}

export async function getAllPublicPosts() {
  return listPostsUseCase.execute({ status: "PUBLIC" });
}

export async function getPost(id: string) {
  return getPostUseCase.execute(id);
}
