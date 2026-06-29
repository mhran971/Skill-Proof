import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { getCandidateProfile, getMySubmissions } from "@/lib/api/profile";
import {
  skills as mockSkills,
  rubricSkills,
  myRubricScores,
  submissions as mockSubmissions,
} from "@/lib/mock-data";
import {
  Mail, MapPin, Award, GraduationCap, FolderGit2, Video, Trophy,
  Pencil, Eye, CheckCircle2, Star, ClipboardList, Clock, XCircle,
  Bot, Github, Globe, Play, FileText,
} from "lucide-react";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — SkillProof" }] }),
  component: Profile,
});

function Profile() {
  const { t, lang } = useI18n();
  const { user } = useAuth();

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["candidate", "profile"],
    queryFn: getCandidateProfile,
    enabled: !!user,
    staleTime: 60_000,
  });

  const { data: submissionsData } = useQuery({
    queryKey: ["submissions", "mine"],
    queryFn: getMySubmissions,
    enabled: !!user,
    staleTime: 30_000,
  });

  const profile = profileData ?? null;
  const displayName = profile?.name ?? user?.name ?? "—";
  const displayEmail = profile?.email ?? user?.email ?? "—";
  const displayAvatar = profile?.avatar ?? user?.avatar ?? "";
  const displayTitle = profile?.title ?? user?.title ?? "";
  const displayLocation = profile?.location ?? user?.location ?? "";
  const profileCompletion = profile?.profile_completion ?? user?.profile_completion ?? 0;
  const reputation = profile?.reputation ?? user?.reputation ?? 0;
  const readiness = profile?.readiness ?? user?.readiness ?? 0;

  const apiSkills = profile?.skills ?? [];
  const apiEducations = profile?.educations ?? [];
  const apiCerts = profile?.certifications ?? [];
  const apiPortfolio = profile?.portfolioItems ?? [];
  const apiSubmissions = submissionsData?.data ?? [];

  const skills = apiSkills.length > 0 ? apiSkills : mockSkills.map(s => ({
    id: 0, name: s.name, pivot: { level: s.level, score: s.score },
  }));

  const educations = apiEducations.length > 0 ? apiEducations : [
    { id: 1, school: "King Saud University", degree: "BSc Computer Science", start_year: 2021, end_year: 2025, gpa: "3.9 / 4.0" },
    { id: 2, school: "Coursera", degree: "Deep Learning Specialization", end_year: 2024, gpa: "Honors" },
  ];

  const certs = apiCerts.length > 0 ? apiCerts : [
    { id: 1, name: "AWS Solutions Architect", issuer: "Amazon", year: 2025 },
    { id: 2, name: "Meta Frontend Pro", issuer: "Meta", year: 2024 },
    { id: 3, name: "Google UX Design", issuer: "Google", year: 2024 },
  ];

  const portfolio = apiPortfolio.length > 0 ? apiPortfolio : [
    { id: 1, name: "E-commerce platform", stack: "React · Node · Postgres", url: "#" },
    { id: 2, name: "AI Resume Parser", stack: "Python · LLMs", url: "#" },
    { id: 3, name: "Realtime chat app", stack: "Next.js · WebSocket", url: "#" },
  ];

  const badges = ["Top 5%", "AI Pioneer", "Challenge Champion", "Streak 30d", "Verified Skill", "Open Source"];

  const allSubmissions = apiSubmissions.length > 0 ? apiSubmissions : mockSubmissions;

  if (profileLoading) {
    return (
      <AppShell>
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-primary" />
          <CardContent className="relative p-6">
            <Skeleton className="h-24 w-24 rounded-full -mt-16" />
            <Skeleton className="mt-4 h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </CardContent>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-primary" />
        <CardContent className="relative p-6">
          <div className="flex flex-wrap items-end gap-5">
            <Avatar className="-mt-16 h-24 w-24 shrink-0 border-4 border-card shadow-elegant">
              <AvatarImage src={displayAvatar} />
              <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold">{displayName}</h1>
              {displayTitle && <p className="text-sm text-muted-foreground">{displayTitle}</p>}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {displayEmail}</span>
                {displayLocation && (
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {displayLocation}</span>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Pencil className="h-4 w-4" />{lang === "ar" ? "تعديل" : "Edit"}
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { l: t("readiness"),         v: `${readiness}%` },
              { l: t("reputation"),        v: reputation.toLocaleString() },
              { l: t("profileCompletion"), v: `${profileCompletion}%` },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-gradient-soft p-4">
                <div className="text-xs text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-2xl font-extrabold text-gradient">{s.v}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="skills" className="mt-6">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="skills">{t("skills")}</TabsTrigger>
          <TabsTrigger value="education">{t("education")}</TabsTrigger>
          <TabsTrigger value="certs">{t("certifications")}</TabsTrigger>
          <TabsTrigger value="portfolio">{t("portfolio")}</TabsTrigger>
          <TabsTrigger value="videos">{t("videos")}</TabsTrigger>
          <TabsTrigger value="badges">{t("badges")}</TabsTrigger>
          <TabsTrigger value="tasks" className="gap-1">
            <ClipboardList className="h-3.5 w-3.5" />{t("mySubmissions")}
          </TabsTrigger>
          <TabsTrigger value="public" className="gap-1">
            <Eye className="h-3.5 w-3.5" />{t("publicProfile")}
          </TabsTrigger>
        </TabsList>

        {/* ── Skills ── */}
        <TabsContent value="skills" className="mt-4">
          <Card><CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={`${s.id}-${s.name}`} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <Badge variant="secondary">{s.pivot.level}</Badge>
                </div>
                <Progress value={s.pivot.score} className="mt-3 h-2" />
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        {/* ── Education ── */}
        <TabsContent value="education" className="mt-4">
          <Card><CardContent className="space-y-3 p-6">
            {educations.map((e) => (
              <div key={e.id} className="flex items-start gap-4 rounded-xl border p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{e.school}</div>
                  <div className="text-sm text-muted-foreground">{e.degree}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {e.start_year && e.end_year
                      ? `${e.start_year} — ${e.end_year}`
                      : e.end_year ?? ""}
                    {e.gpa ? ` · ${e.gpa}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        {/* ── Certifications ── */}
        <TabsContent value="certs" className="mt-4">
          <Card><CardContent className="grid gap-3 p-6 sm:grid-cols-2">
            {certs.map((c) => (
              <div key={c.id} className="flex items-start gap-3 rounded-xl border p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.issuer} · {c.year}</div>
                </div>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        {/* ── Portfolio ── */}
        <TabsContent value="portfolio" className="mt-4">
          <Card><CardContent className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((p) => (
              <a key={p.id} href={p.url ?? "#"} className="group rounded-xl border p-5 transition hover:shadow-elegant">
                <FolderGit2 className="h-6 w-6 text-primary" />
                <div className="mt-3 font-semibold group-hover:text-primary">{p.name}</div>
                {p.stack && <div className="text-xs text-muted-foreground">{p.stack}</div>}
                {p.description && <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</div>}
              </a>
            ))}
          </CardContent></Card>
        </TabsContent>

        {/* ── Videos ── */}
        <TabsContent value="videos" className="mt-4">
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Video className="h-5 w-5" />
              {lang === "ar"
                ? "اذهب إلى صفحة الفيديو لعرض المعرض"
                : "Go to Videos page to see the gallery"}
            </div>
          </CardContent></Card>
        </TabsContent>

        {/* ── Badges ── */}
        <TabsContent value="badges" className="mt-4">
          <Card><CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <Badge key={b} className="gap-1.5 bg-gradient-primary px-3 py-1.5 text-primary-foreground">
                  <Trophy className="h-3.5 w-3.5" />{b}
                </Badge>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>

        {/* ── My Submissions ── */}
        <TabsContent value="tasks" className="mt-4">
          <Card><CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />{t("mySubmissions")}
              </h3>
              <Badge variant="outline" className="font-bold">{allSubmissions.length}</Badge>
            </div>

            {allSubmissions.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                {t("noSubmissions")}
              </div>
            ) : (
              <div className="space-y-3">
                {allSubmissions.map((s: any) => {
                  const StatusIcon =
                    s.status === "accepted" ? CheckCircle2
                    : s.status === "rejected" ? XCircle
                    : s.status === "pending_ai" ? Bot : Clock;
                  const tone =
                    s.status === "accepted" ? "bg-success/15 text-success border-success/30"
                    : s.status === "rejected" ? "bg-destructive/10 text-destructive border-destructive/30"
                    : "bg-warning/15 text-warning-foreground border-warning/30";

                  // Support both API shape and mock shape
                  const challengeTitle = s.challenge
                    ? (lang === "ar" ? s.challenge.title_ar : s.challenge.title_en)
                    : (s.challenge?.ar ?? s.challenge?.en ?? "");
                  const submittedAt = s.submitted_at ?? s.created_at ?? s.submittedAt ?? "";
                  const links: any[] = s.links ?? [];

                  return (
                    <div key={s.id} className="rounded-xl border p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{challengeTitle}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {submittedAt ? new Date(submittedAt).toLocaleDateString(
                              lang === "ar" ? "ar-SA" : "en-US",
                              { year: "numeric", month: "short", day: "numeric" }
                            ) : ""}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline" className={`gap-1 ${tone}`}>
                              <StatusIcon className="h-3 w-3" />
                              {t(
                                s.status === "accepted" ? "accepted"
                                : s.status === "rejected" ? "rejected"
                                : s.status === "pending_ai" ? "pendingReview"
                                : "inReview"
                              )}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {links.map((l: any, i: number) => {
                            const Icon =
                              l.kind === "github" ? Github
                              : l.kind === "live" ? Globe
                              : l.kind === "video" ? Play : FileText;
                            return (
                              <a
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-2.5 py-1 text-[11px] font-medium hover:border-primary"
                              >
                                <Icon className="h-3 w-3 text-primary" />{l.label}
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Feedback */}
                      {(s.feedback_ar || s.feedback_en || s.feedback) && (
                        <div className="mt-3 rounded-lg border bg-muted/30 p-3">
                          <div className="text-xs italic text-muted-foreground">
                            "{lang === "ar"
                              ? (s.feedback_ar ?? s.feedback?.ar ?? "")
                              : (s.feedback_en ?? s.feedback?.en ?? "")}"
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent></Card>
        </TabsContent>

        {/* ── Public Profile ── */}
        <TabsContent value="public" className="mt-4 space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary">
            <Eye className="me-1 inline h-3.5 w-3.5" />{t("publicProfileNote")}
          </div>

          <Card><CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold">{t("scorePerSkill")}</h3>
              <Badge variant="outline" className="font-bold">
                {t("averageScore")}:{" "}
                <span className="ms-1 text-gradient">
                  {(Object.values(myRubricScores).reduce((a, b) => a + b, 0) / rubricSkills.length).toFixed(1)}/10
                </span>
              </Badge>
            </div>
            <div className="space-y-2.5">
              {rubricSkills.map((s) => {
                const v = myRubricScores[s.key];
                return (
                  <div key={s.key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-3">
                    <div className="text-sm font-medium">{s[lang]}</div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${(v / 10) * 100}%` }} />
                    </div>
                    <div className="text-sm font-bold tabular-nums">{v.toFixed(1)} / 10</div>
                  </div>
                );
              })}
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <h3 className="mb-4 text-base font-bold flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />{t("publicShowcase")}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {(mockSubmissions as any[]).filter((s) => s.acceptedToShowcase).map((s) => (
                <div key={s.id} className="rounded-xl border bg-gradient-soft p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold">{s.challenge[lang]}</div>
                    <Badge className="gap-1 bg-success text-success-foreground">
                      <CheckCircle2 className="h-3 w-3" />{t("accepted")}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.evaluatedSkills.slice(0, 4).map((k: any) => {
                      const sk = rubricSkills.find((x) => x.key === k)!;
                      return (
                        <Badge key={k} variant="outline" className="text-[10px]">
                          {sk[lang]}: {s.scores[k] ?? "—"}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
