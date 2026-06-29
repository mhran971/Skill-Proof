import { api } from "./client";
import type { Paginated } from "./challenges";

export type Job = {
  id: number;
  title: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  description?: string;
  type?: string;
  skills_required?: string[];
  status: "open" | "reviewing" | "closed";
  applicants_count?: number;
  company?: {
    id: number;
    name: string;
    avatar?: string;
    location?: string;
  };
};

export const getJobs = (params?: { search?: string; type?: string; location?: string }) => {
  const q = new URLSearchParams();
  if (params?.search) q.set("search", params.search);
  if (params?.type) q.set("type", params.type);
  if (params?.location) q.set("location", params.location);
  const qs = q.toString();
  return api.get<Paginated<Job>>(`/jobs${qs ? `?${qs}` : ""}`);
};

export const getJob = (id: number) => api.get<Job>(`/jobs/${id}`);

export const applyToJob = (jobId: number, coverNote?: string) =>
  api.post<any>(`/jobs/${jobId}/apply`, { cover_note: coverNote ?? "" });
