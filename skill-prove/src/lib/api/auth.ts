import { api } from "./client";
import type { AuthUser } from "../auth";

type AuthResponse = { user: AuthUser; token: string };

export const loginApi = (email: string, password: string) =>
  api.post<AuthResponse>("/auth/login", { email, password });

export const registerCandidateApi = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => api.post<AuthResponse>("/auth/register/candidate", data);

export const registerCompanyApi = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company_name: string;
}) => api.post<AuthResponse>("/auth/register/company", data);

export const forgotPasswordApi = (email: string) =>
  api.post<{ message: string }>("/auth/forgot-password", { email });

export const logoutApi = () =>
  api.post<{ message: string }>("/auth/logout", {});

export const getMeApi = () => api.get<AuthUser>("/auth/me");
