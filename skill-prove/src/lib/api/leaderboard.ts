import { api } from "./client";
import type { Paginated } from "./challenges";

export type LeaderboardEntry = {
  id: number;
  name: string;
  avatar?: string;
  reputation: number;
  readiness: number;
  badge_tier: string;
  title?: string;
  candidateProfile?: {
    bio?: string;
  };
};

export const getLeaderboard = (params?: { skill?: string; badge?: string }) => {
  const q = new URLSearchParams();
  if (params?.skill) q.set("skill", params.skill);
  if (params?.badge) q.set("badge", params.badge);
  const qs = q.toString();
  return api.get<Paginated<LeaderboardEntry>>(`/leaderboard${qs ? `?${qs}` : ""}`);
};
