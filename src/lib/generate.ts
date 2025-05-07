import { api } from "./api";

export interface GeneratePayload {
  topic: string;
  style: string;
  length?: "short" | "medium" | "long";
}

export async function generatePost(payload: GeneratePayload) {
  const response = await api.post("/api/generate", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}
