import { api } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function login(payload: LoginPayload) {
  const response = await api.post("/api/auth/login", payload);
  return response.data;
}

export async function signup(payload: SignupPayload) {
  const response = await api.post("/api/auth/signup", payload);
  return response.data;
}
