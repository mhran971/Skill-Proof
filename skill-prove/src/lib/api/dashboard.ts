import { api } from "./client";

export type ActivityLog = {
  id: number;
  action?: string;
  description_ar?: string;
  description_en?: string;
  created_at: string;
};

export type CandidateDashboard = {
  profile_completion: number;
  readiness: number;
  badge_tier: string;
  reputation: number;
  xp_points: number;
  level: number;
  submissions_count: number;
  applications_count: number;
  interviews_count: number;
  tasks_count: number;
  internships_count: number;
  recent_activities: ActivityLog[];
};

export type CompanyDashboard = {
  jobs_count: number;
  total_applicants: number;
  challenges_count: number;
  submissions_count: number;
  recent_applications: any[];
};

export const getCandidateDashboard = () =>
  api.get<CandidateDashboard>("/dashboard/candidate");

export const getCompanyDashboard = () =>
  api.get<CompanyDashboard>("/dashboard/company");
