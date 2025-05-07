import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import { deletePostApi } from "@/lib/posts";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  canEdit?: boolean;
}

export default function PostCard({ post, canEdit }: PostCardProps) {
  const navigate = useNavigate();
  const { deletePost } = usePostStore();

  const handleEdit = () => {
    if (!canEdit) return navigate(`/posts/${post._id}`);
    navigate("/edit", {
      state: {
        id: post._id,
        title: post.title,
        content: post.content,
        isDraft: post.isDraft,
        isPublic: post.isPublic,
      },
    });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      await deletePostApi(post._id); // Call API
      deletePost(post._id); // Update Zustand store
      toast.success("Post deleted");
    } catch (err) {
      toast.error(`Failed to delete post ${err}`);
    }
  };

  return (
    <Card
      onClick={handleEdit}
      className="cursor-pointer hover:bg-muted transition"
    >
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          {post.isPublic ? "Public" : "Private"} —{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 text-sm ">{post.content}</p>
      </CardContent>

      {canEdit && (
        <CardFooter className="flex gap-2">
          <div className="flex gap-2">
            <Button onClick={handleEdit}>Edit</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
