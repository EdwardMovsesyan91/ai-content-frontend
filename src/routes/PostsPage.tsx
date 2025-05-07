import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts, getAllPublicPosts } from "@/lib/posts";
import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import SyncIndicator from "@/components/SyncIndicator";

export default function PostsPage() {
  const [view, setView] = useState<"my" | "public">("my");

  const token = useAuthStore((s) => s.token);
  const { myPosts, publicPosts, setMyPosts, setPublicPosts } = usePostStore();

  const { data: userPostsData, isFetching: isFetchingMy } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    enabled: view === "my" && !!token,
    staleTime: 0, // force fresh data each mount
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { data: publicPostsData, isFetching: isFetchingPublic } = useQuery({
    queryKey: ["publicPosts"],
    queryFn: getAllPublicPosts,
    enabled: view === "public",
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userPostsData) setMyPosts(userPostsData);
  }, [userPostsData, setMyPosts]);

  useEffect(() => {
    if (publicPostsData) setPublicPosts(publicPostsData);
  }, [publicPostsData, setPublicPosts]);

  const postsToRender = view === "my" ? myPosts : publicPosts;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Button
          variant={view === "my" ? "default" : "outline"}
          onClick={() => setView("my")}
        >
          My Posts
        </Button>
        <Button
          variant={view === "public" ? "default" : "outline"}
          onClick={() => setView("public")}
        >
          Public Posts
        </Button>
      </div>

      <h1 className="text-3xl font-bold">
        Browse {view === "my" ? "My" : "Public"} Posts
      </h1>

      {postsToRender.length === 0 ? (
        <p className="text-muted-foreground">No posts yet</p>
      ) : (
        <div className="flex flex-col gap-6">
          {postsToRender.map((post) => (
            <PostCard key={post._id} post={post} canEdit={view === "my"} />
          ))}
        </div>
      )}
      {(isFetchingMy || isFetchingPublic) && <SyncIndicator />}
    </div>
  );
}
