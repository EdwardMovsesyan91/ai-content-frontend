import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost as updatePostApi } from "@/lib/posts";
import { usePostStore } from "@/store/usePostStore";

export default function EditPostPage() {
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.title ?? "");
  const [content, setContent] = useState(state.content ?? "");
  const [isDraft, setIsDraft] = useState(state.isDraft ?? true);
  const [isPublic, setIsPublic] = useState(state.isPublic ?? false);

  const { updatePost: updateInStore } = usePostStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updatePostApi(state.id, { title, content, isPublic, isDraft }),
    onSuccess: (data) => {
      updateInStore(data.post); // optional: for Zustand syncing
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      queryClient.invalidateQueries({ queryKey: ["publicPosts"] });
      toast.success("Post saved!");
      navigate("/posts");
    },
    onError: () => {
      toast.error("Failed to save post.");
    },
  });
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Draft</h1>
      <Input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Post content"
        className="min-h-[300px] max-h-[450px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <Switch
          id="isDraft"
          checked={isDraft}
          onCheckedChange={(checked) => {
            setIsDraft(checked);
            if (checked) setIsPublic(false);
          }}
        />
        <Label htmlFor="isDraft" className="text-base font-medium">
          Save as Draft
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="isPublic"
          checked={isPublic}
          onCheckedChange={(checked) => {
            setIsPublic(checked);
            if (checked) setIsDraft(false);
          }}
        />
        <Label htmlFor="isPublic" className="text-base font-medium">
          Make Public
        </Label>
      </div>
      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? "Saving..." : "Save Post"}
      </Button>
    </div>
  );
}
