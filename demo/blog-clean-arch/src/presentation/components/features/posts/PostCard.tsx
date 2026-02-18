import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/domain/entities/Post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
}

export function PostCard({ post, isAdmin }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2">
            <Link
              href={
                isAdmin ? `/admin/posts/${post.id}/edit` : `/posts/${post.id}`
              }
              className="hover:underline"
            >
              {post.title}
            </Link>
          </CardTitle>
          {post.status !== "PUBLIC" && (
            <Badge
              variant={post.status === "ARCHIVED" ? "destructive" : "secondary"}
            >
              {post.status}
            </Badge>
          )}
        </div>
        <CardDescription>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-sm text-neutral-500 dark:text-neutral-400">
          {post.content}
        </p>
      </CardContent>
    </Card>
  );
}
