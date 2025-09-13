import { api } from "./http";

export type AuthResp = {
  ok: boolean;
  token?: string;
  id?: number;
  fullName?: string;
  email?: string;
  role?: "CUSTOMER" | "ADMIN";
};

export const login = (email: string, password: string) =>
  api<AuthResp>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (fullName: string, email: string, password: string) =>
  api<AuthResp>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });

export const me = (token: string) =>
  api<AuthResp>("/api/auth/me", { method: "GET" }, token);
