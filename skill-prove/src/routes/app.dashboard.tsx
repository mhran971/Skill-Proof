import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { getCandidateDashboard } from "@/lib/api/dashboard";
import { getChallenges } from "@/lib/api/challenges";
import { getJobs } from "@/lib/api/jobs";
import {
  skills as mockSkills,
  recentActivity as mockActivity,
  recommendedChallenges as mockChallenges,
  recommendedJobs as mockJobs,
} from "@/lib/mock-data";
import { TrendingUp, Award, Target, ArrowRight, Sparkles, Briefcase, Activity } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SkillProof" }] }),
  component: Dashboard,
});

function Stat({ icon: Icon, label, value, sub, accent }: {
  icon: any; label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="text-xs font-medium text-muted-foreground">{label}</div>
            <div className="mt-1 text-3xl font-extrabold">{value}</div>
            {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
          </div>
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accent ?? "bg-gradient-primary"} text-primary-foreground`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { t, lang } = useI18n();
  const { user } = useAuth();

  const { data: dashData } = useQuery({
    queryKey: ["dashboard", "candidate"],
    queryFn: getCandidateDashboard,
    enabled: !!user,
    staleTime: 60_000,
  });

  const { data: challengesData } = useQuery({
    queryKey: ["challenges"],
    queryFn: () => getChallenges(),
    staleTime: 60_000,
  });

  const { data: jobsData } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobs(),
    staleTime: 60_000,
  });

  const profileCompletion = dashData?.profile_completion ?? user?.profile_completion ?? 78;
  const reputation = dashData?.reputation ?? user?.reputation ?? 0;
  const readiness = dashData?.readiness ?? user?.readiness ?? 0;
  const displayName = user?.name ?? "";
  const firstName = displayName.split(" ")[0];

  const recentActivities = dashData?.recent_activities ?? [];
  const challenges = challengesData?.data ?? [];
  const jobs = jobsData?.data ?? [];

  return (
    <AppShell>
      <PageHeader
        title={`${t("welcomeBack")}، ${firstName || (lang === "ar" ? "المستخدم" : "User")} 👋`}
        subtitle={lang === "ar" ? "ملخّص أدائك اليوم" : "Your performance snapshot for today"}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={Target}
          label={t("profileCompletion")}
          value={`${profileCompletion}%`}
          sub={lang === "ar" ? "أكمل ملفك لرفع الفرص" : "Complete to boost reach"}
        />
        <Stat
          icon={Award}
          label={t("reputation")}
          value={reputation.toLocaleString()}
          sub={lang === "ar" ? "نقاط هذا الأسبوع" : "this week"}
          accent="bg-primary-glow"
        />
        <Stat
          icon={TrendingUp}
          label={t("readiness")}
          value={`${readiness}/100`}
          sub={lang === "ar" ? "جاهز للتقديم" : "Ready to apply"}
          accent="bg-success"
        />
        <Stat
          icon={Sparkles}
          label={t("skillPassport")}
          value={dashData?.submissions_count ?? 0}
          sub={lang === "ar" ? "تحدٍّ مكتمل" : "challenges completed"}
          accent="bg-gradient-primary"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Skill passport / stats */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{t("skillPassport")}</h3>
              <Link to="/app/profile">
                <Button variant="ghost" size="sm">{t("viewAll")}</Button>
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {mockSkills.map((s) => (
                <div key={s.name} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{s.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{s.level}</Badge>
                  </div>
                  <Progress value={s.score} className="mt-3 h-2" />
                  <div className="mt-1.5 text-right text-xs text-muted-foreground">{s.score}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">{t("recentActivity")}</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {recentActivities.length > 0
                ? recentActivities.map((a) => (
                    <li key={a.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug">
                          {lang === "ar" ? a.description_ar : a.description_en ?? a.action ?? ""}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(a.created_at).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </li>
                  ))
                : mockActivity.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug">{a[lang]}</p>
                        <span className="text-xs text-muted-foreground">{a.time}</span>
                      </div>
                    </li>
                  ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Recommended challenges */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">{t("recommendedChallenges")}</h3>
              </div>
              <Link to="/app/challenges">
                <Button variant="ghost" size="sm">
                  {t("viewAll")} <ArrowRight className={`h-4 w-4 ${lang === "ar" ? "rotate-180" : ""}`} />
                </Button>
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {challenges.length > 0
                ? challenges.slice(0, 3).map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:shadow-sm">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {lang === "ar" ? c.title_ar : c.title_en}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
                          <Badge variant="outline">{c.category}</Badge>
                          <Badge variant="outline">{c.duration}</Badge>
                          <Badge variant="outline">{c.difficulty}</Badge>
                        </div>
                      </div>
                      <Link to="/app/challenges">
                        <Button size="sm" className="shrink-0 bg-gradient-primary text-primary-foreground">
                          {t("start")}
                        </Button>
                      </Link>
                    </div>
                  ))
                : mockChallenges.slice(0, 3).map((c, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:shadow-sm">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{c.title[lang]}</div>
                        <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
                          <Badge variant="outline">{c.category}</Badge>
                          <Badge variant="outline">{c.duration}</Badge>
                          <Badge variant="outline">{c.difficulty}</Badge>
                        </div>
                      </div>
                      <Link to="/app/challenges">
                        <Button size="sm" className="shrink-0 bg-gradient-primary text-primary-foreground">
                          {t("start")}
                        </Button>
                      </Link>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended jobs */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">{t("recommendedJobs")}</h3>
              </div>
              <Link to="/app/jobs">
                <Button variant="ghost" size="sm">
                  {t("viewAll")} <ArrowRight className={`h-4 w-4 ${lang === "ar" ? "rotate-180" : ""}`} />
                </Button>
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {jobs.length > 0
                ? jobs.slice(0, 3).map((j) => (
                    <div key={j.id} className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:shadow-sm">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{j.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {j.company?.name} · {j.location}
                          {j.salary_min && j.salary_max ? ` · ${j.salary_min}–${j.salary_max}k` : ""}
                        </div>
                      </div>
                      <div className="shrink-0 text-end">
                        <div className="text-lg font-extrabold text-gradient">
                          {j.type ?? "Open"}
                        </div>
                      </div>
                    </div>
                  ))
                : mockJobs.map((j, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:shadow-sm">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{j.title[lang]}</div>
                        <div className="text-xs text-muted-foreground">
                          {j.company} · {j.location} · {j.salary}
                        </div>
                      </div>
                      <div className="shrink-0 text-end">
                        <div className="text-lg font-extrabold text-gradient">{j.match}%</div>
                        <div className="text-[10px] text-muted-foreground">{t("match")}</div>
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
