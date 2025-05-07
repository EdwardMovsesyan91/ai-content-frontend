import { generatePost } from "@/lib/generate";
import { usePostStore } from "@/store/usePostStore";
import type { Post } from "@/types/post";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { StyleSelector } from "./StyleSelector";

export function GenerateTab() {
  const [topic, setTopic] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: generatePost,
    onSuccess(data) {
      setPost(data.post);
      usePostStore.getState().addPost(data.post);
      toast.success("Post generated!");
    },
    onError() {
      toast.error("Generation failed");
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generate AI Blog Post</h1>
      <Input
        placeholder="Enter a blog topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <StyleSelector selected={styles} setSelected={setStyles} />
      <Button
        onClick={() =>
          mutation.mutate({ topic, length: "short", style: styles.join(", ") })
        }
        disabled={!topic || styles.length === 0 || mutation.isPending}
      >
        {mutation.isPending ? "Generating..." : "Generate"}
      </Button>

      {post && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground italic">
            ✏️ Click the generated post below to edit it
          </div>
          <div
            className="border-2 border-dashed border-accent rounded-lg p-4 bg-muted/60 hover:bg-muted transition cursor-pointer max-h-64 overflow-auto group"
            onClick={() =>
              navigate("/edit", {
                state: {
                  id: post._id,
                  title: post.title,
                  content: post.content,
                  isDraft: post.isDraft,
                  isPublic: post.isPublic,
                },
              })
            }
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:underline">
              Generated Post:
            </h2>
            <p className="whitespace-pre-line">{post.content}</p>
          </div>
          <div className="text-xs text-muted-foreground text-center italic">
            💾 If you don’t edit the post, the generated content will be saved
            exactly as shown above.
          </div>
        </div>
      )}
    </div>
  );
}
