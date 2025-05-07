import type { Post } from "@/types/post";
import { api } from "./api";

export interface SavePostPayload {
  title: string;
  content: string;
  isPublic: boolean;
  isDraft: boolean;
}

export interface UpdatePostPayload {
  title: string;
  content: string;
  isPublic: boolean;
  isDraft: boolean;
}

export async function savePost(payload: SavePostPayload) {
  const response = await api.post("/api/posts/save", payload);
  return response.data;
}

export async function updatePost(id: string, payload: UpdatePostPayload) {
  const response = await api.put(`/api/posts/${id}`, payload);
  return response.data;
}

export async function getAllPublicPosts(): Promise<Post[]> {
  const response = await api.get("/api/posts/public");
  return response.data.posts;
}

export async function getUserPosts(): Promise<Post[]> {
  const response = await api.get("/api/posts/user");
  return response.data.posts;
}

export async function deletePostApi(id: string): Promise<void> {
  await api.delete(`/api/posts/${id}`);
}

export async function getPublicPostById(id: string): Promise<{ post: Post }> {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
}
