import { savePost } from "@/lib/posts";
import { usePostStore } from "@/store/usePostStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { manualPostSchema } from "@/schemas/postSchemas";

export function ManualTab() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const [isPublic, setIsPublic] = useState(false);

  const mutation = useMutation({
    mutationFn: savePost,
    onSuccess: (data) => {
      usePostStore.getState().addPost(data.post);
      toast.success("Post saved!");
      navigate("/posts");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.log(error);
      toast.error(`Failed to save post: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    const result = manualPostSchema.safeParse({
      title,
      content,
      isPublic,
      isDraft,
    });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Validation failed";
      toast.error(firstError);
      return;
    }

    mutation.mutate(result.data); // ✅ validated
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Write Post by Hand</h1>
      <Input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <Switch
          id="isDraft"
          checked={isDraft}
          onCheckedChange={(checked) => {
            setIsDraft(checked);
            if (checked) setIsPublic(false); // turn off public if draft is turned on
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
            if (checked) setIsDraft(false); // turn off draft if public is turned on
          }}
        />
        <Label htmlFor="isPublic" className="text-base font-medium">
          Make Public
        </Label>
      </div>
      <Button onClick={handleSubmit} disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save Post"}
      </Button>
    </div>
  );
}
