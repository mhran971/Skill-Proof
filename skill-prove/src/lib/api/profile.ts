import { api } from "./client";
import type { Paginated } from "./challenges";

export type Education = {
  id: number;
  school: string;
  degree: string;
  start_year?: number;
  end_year?: number;
  gpa?: string;
};

export type Certification = {
  id: number;
  name: string;
  issuer: string;
  year: number;
  url?: string;
};

export type PortfolioItem = {
  id: number;
  name: string;
  description?: string;
  url?: string;
  stack?: string;
};

export type UserSkill = {
  id: number;
  name: string;
  pivot: { level: string; score: number };
};

export type SubmissionLink = {
  id: number;
  kind: "github" | "live" | "video" | "file";
  label: string;
  url: string;
};

export type Submission = {
  id: number;
  status: "pending_ai" | "ai_done" | "in_review" | "accepted" | "rejected";
  submitted_at?: string;
  created_at?: string;
  challenge?: { id: number; title_ar: string; title_en: string };
  links?: SubmissionLink[];
  ai_score?: number;
  ai_feedback_ar?: string;
  ai_feedback_en?: string;
  human_score?: number;
  feedback_ar?: string;
  feedback_en?: string;
};

export type CandidateProfileData = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  title?: string;
  profile_completion?: number;
  reputation?: number;
  readiness?: number;
  badge_tier?: string;
  candidateProfile?: {
    bio?: string;
    github_url?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    xp_points?: number;
    level?: number;
  };
  educations?: Education[];
  certifications?: Certification[];
  portfolioItems?: PortfolioItem[];
  skills?: UserSkill[];
};

export const getCandidateProfile = () =>
  api.get<CandidateProfileData>("/candidate/profile");

export const getMySubmissions = () =>
  api.get<Paginated<Submission>>("/submissions");

export const getEducations = () =>
  api.get<Education[]>("/educations");

export const getCertifications = () =>
  api.get<Certification[]>("/certifications");

export const getPortfolioItems = () =>
  api.get<PortfolioItem[]>("/portfolio-items");

export const getSkills = () =>
  api.get<UserSkill[]>("/skills");
