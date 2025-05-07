import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicPostById } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SyncIndicator from "@/components/SyncIndicator";

export default function PublicPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["publicPost", id],
    queryFn: () => getPublicPostById(id!),
    enabled: !!id,
  });

  if (isLoading) return <SyncIndicator />;
  if (error)
    return (
      <div className="text-center mt-10 space-y-4">
        <p className="text-red-500">Failed to load post.</p>
        <button
          onClick={() => navigate("/posts")}
          className="px-4 py-2 text-sm bg-muted border rounded hover:bg-muted/80 transition"
        >
          ← Go back to posts
        </button>
      </div>
    );
  if (!data) return <p className="text-center mt-10">Post not found.</p>;

  const { title, content, createdAt } = data.post;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Post Details</h1>
        <p className="text-muted-foreground text-sm">
          You’re viewing a full public blog post.
        </p>
      </div>

      <Card className="space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Published on {new Date(createdAt).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <p className="whitespace-pre-line text-base">{content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
