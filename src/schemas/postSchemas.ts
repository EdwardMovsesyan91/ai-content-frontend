import { z } from "zod";

export const manualPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  isPublic: z.boolean(),
  isDraft: z.boolean(),
});
