import { api } from "./client";

export type Challenge = {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  reward: number;
  status: "active" | "closed";
  company?: {
    id: number;
    name: string;
    avatar?: string;
  };
};

export type Paginated<T> = {
  data: T[];
  links: Record<string, string | null>;
  meta: { current_page: number; last_page: number; total: number; per_page: number };
};

export const getChallenges = (params?: {
  category?: string;
  difficulty?: string;
  search?: string;
}) => {
  const q = new URLSearchParams();
  if (params?.category && params.category !== "All") q.set("category", params.category);
  if (params?.difficulty && params.difficulty !== "All") q.set("difficulty", params.difficulty);
  if (params?.search) q.set("search", params.search);
  const qs = q.toString();
  return api.get<Paginated<Challenge>>(`/challenges${qs ? `?${qs}` : ""}`);
};

export const getChallenge = (id: number) =>
  api.get<Challenge>(`/challenges/${id}`);

export const submitChallenge = (
  challengeId: number,
  data: { github_url?: string; live_url?: string; notes?: string }
) => api.post<any>(`/challenges/${challengeId}/submit`, data);
