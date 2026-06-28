import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";
import { rubricSkills, myRubricScores } from "@/lib/mock-data";
import { Mail, MapPin, Award, GraduationCap, FolderGit2, Video, Trophy, Pencil, Eye, CheckCircle2, Star, ClipboardList, Clock, XCircle, Bot, Github, Globe, Play, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — SkillProof" }] }),
  component: Profile,
});

const education = [
  { school: "King Saud University", degree: "BSc Computer Science", years: "2021 — 2025", gpa: "3.9 / 4.0" },
  { school: "Coursera", degree: "Deep Learning Specialization", years: "2024", gpa: "Honors" },
];
const certs = [
  { name: "AWS Solutions Architect", issuer: "Amazon", year: 2025 },
  { name: "Meta Frontend Pro", issuer: "Meta", year: 2024 },
  { name: "Google UX Design", issuer: "Google", year: 2024 },
];
const portfolio = [
  { name: "E-commerce platform", stack: "React · Node · Postgres", url: "#" },
  { name: "AI Resume Parser", stack: "Python · LLMs", url: "#" },
  { name: "Realtime chat app", stack: "Next.js · WebSocket", url: "#" },
];
const badges = ["Top 5%", "AI Pioneer", "Challenge Champion", "Streak 30d", "Verified Skill", "Open Source"];

function Profile() {
  const { t, lang } = useI18n();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await api.get<any>("/candidate/profile");
        setData(profileData);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  const profile = data?.candidate_profile || {};
  const user = data || {};

  return (
    <AppShell>
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-primary" />
        <CardContent className="relative p-6">
          <div className="flex flex-wrap items-end gap-5">
            <Avatar className="-mt-16 h-24 w-24 shrink-0 border-4 border-card shadow-elegant">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.title}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {user.email}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {user.location}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2"><Pencil className="h-4 w-4" />{lang==="ar"?"تعديل":"Edit"}</Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              {l:t("readiness"),v:`${user.readiness || 0}%`},
              {l:t("reputation"),v:(user.reputation || 0).toLocaleString()},
              {l:t("profileCompletion"),v:`${user.profile_completion || 0}%`},
            ].map((s,i)=>(
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
          <TabsTrigger value="tasks" className="gap-1"><ClipboardList className="h-3.5 w-3.5" />{t("mySubmissions")}</TabsTrigger>
          <TabsTrigger value="public" className="gap-1"><Eye className="h-3.5 w-3.5" />{t("publicProfile")}</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="mt-4">
          <Card><CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            {(user.user_skills || []).map((s: any)=>(
              <div key={s.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.skill.name}</span>
                  <Badge variant="secondary">{s.level}</Badge>
                </div>
                <Progress value={s.score || 0} className="mt-3 h-2" />
              </div>
            ))}
            {(!user.user_skills?.length) && <div className="col-span-full text-center text-muted-foreground py-4 italic">{lang==="ar"?"لا توجد مهارات مضافة":"No skills added"}</div>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="education" className="mt-4">
          <Card><CardContent className="space-y-3 p-6">
            {(user.educations || []).map((e: any,i: number)=>(
              <div key={i} className="flex items-start gap-4 rounded-xl border p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><GraduationCap className="h-5 w-5"/></div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{e.institution}</div>
                  <div className="text-sm text-muted-foreground">{e.degree}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{e.start_date} — {e.end_date || t("present")}</div>
                </div>
              </div>
            ))}
            {(!user.educations?.length) && <div className="text-center text-muted-foreground py-4 italic">{lang==="ar"?"لا توجد معلومات تعليمية":"No education info"}</div>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="certs" className="mt-4">
          <Card><CardContent className="grid gap-3 p-6 sm:grid-cols-2">
            {(user.certifications || []).map((c: any,i: number)=>(
              <div key={i} className="flex items-start gap-3 rounded-xl border p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><Award className="h-5 w-5"/></div>
                <div><div className="font-semibold">{c.name}</div><div className="text-xs text-muted-foreground">{c.issuing_organization} · {c.year}</div></div>
              </div>
            ))}
            {(!user.certifications?.length) && <div className="col-span-full text-center text-muted-foreground py-4 italic">{lang==="ar"?"لا توجد شهادات":"No certifications"}</div>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-4">
          <Card><CardContent className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {(user.portfolio_items || []).map((p: any,i: number)=>(
              <a key={i} href={p.url} className="group rounded-xl border p-5 transition hover:shadow-elegant">
                <FolderGit2 className="h-6 w-6 text-primary"/>
                <div className="mt-3 font-semibold group-hover:text-primary">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.description}</div>
              </a>
            ))}
            {(!user.portfolio_items?.length) && <div className="col-span-full text-center text-muted-foreground py-4 italic">{lang==="ar"?"لا توجد أعمال في المعرض":"No portfolio items"}</div>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground"><Video className="h-5 w-5"/>{lang==="ar"?"اذهب إلى صفحة الفيديو لعرض المعرض":"Go to Videos page to see the gallery"}</div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-4">
          <Card><CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {badges.map(b=>(
                <Badge key={b} className="gap-1.5 bg-gradient-primary px-3 py-1.5 text-primary-foreground"><Trophy className="h-3.5 w-3.5"/>{b}</Badge>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <Card><CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />{t("mySubmissions")}
              </h3>
              <Badge variant="outline" className="font-bold">{submissions.length}</Badge>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                {t("noSubmissions")}
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((s) => {
                  const StatusIcon = s.status === "accepted" ? CheckCircle2
                    : s.status === "rejected" ? XCircle
                    : s.status === "pending_ai" ? Bot : Clock;
                  const tone = s.status === "accepted" ? "bg-success/15 text-success border-success/30"
                    : s.status === "rejected" ? "bg-destructive/10 text-destructive border-destructive/30"
                    : "bg-warning/15 text-warning-foreground border-warning/30";
                  const vals = Object.values(s.scores).filter((x): x is number => typeof x === "number");
                  const sa = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
                  return (
                    <div key={s.id} className="rounded-xl border p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <img src={s.company.logo} alt="" className="h-7 w-7 rounded-md bg-muted object-cover" />
                            <div className="min-w-0">
                              <div className="text-xs font-bold leading-tight">{s.company.name[lang]}</div>
                              <div className="text-[10px] text-muted-foreground">{lang==="ar"?"الشركة المُقيِّمة":"Evaluating company"}</div>
                            </div>
                          </div>
                          <div className="font-semibold">{s.challenge[lang]}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{s.submittedAt}</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {s.type === "final" && (
                              <Badge className="gap-1 bg-gradient-primary text-primary-foreground"><Star className="h-3 w-3" />{t("finalTask")}</Badge>
                            )}
                            <Badge variant="outline" className={`gap-1 ${tone}`}>
                              <StatusIcon className="h-3 w-3" />
                              {t(s.status === "accepted" ? "accepted" : s.status === "rejected" ? "rejected" : s.status === "pending_ai" ? "pendingReview" : "inReview")}
                            </Badge>
                            {sa && <Badge variant="outline" className="font-bold">{t("averageScore")}: <span className="ms-1 text-gradient">{sa}/10</span></Badge>}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {s.links.map((l, i) => {
                            const Icon = l.kind === "github" ? Github : l.kind === "live" ? Globe : l.kind === "video" ? Play : FileText;
                            return (
                              <a key={i} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-2.5 py-1 text-[11px] font-medium hover:border-primary">
                                <Icon className="h-3 w-3 text-primary" />{l.label}
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Per-skill scores breakdown */}
                      {s.evaluatedSkills.length > 0 && (
                        <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
                          {s.evaluatedSkills.map((k) => {
                            const sk = rubricSkills.find((x) => x.key === k)!;
                            const v = s.scores[k];
                            return (
                              <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-2">
                                <div className="truncate text-xs">{sk[lang]}</div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                                  <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${((v ?? 0) / 10) * 100}%` }} />
                                </div>
                                <div className="w-10 text-end text-[11px] font-bold tabular-nums">{v != null ? `${v}` : "—"}</div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {s.feedback && (
                        <div className="mt-3 rounded-lg border bg-muted/30 p-3">
                          {s.reviewer && (
                            <div className="mb-2 flex items-center gap-2">
                              <Avatar className="h-6 w-6"><AvatarImage src={s.reviewer.avatar} /><AvatarFallback>?</AvatarFallback></Avatar>
                              <div className="text-[11px]">
                                <span className="font-semibold">{s.reviewer.name[lang]}</span>
                                <span className="text-muted-foreground"> · {s.reviewer.role[lang]} · {s.company.name[lang]}</span>
                              </div>
                            </div>
                          )}
                          <div className="text-xs italic text-muted-foreground">"{s.feedback[lang]}"</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="public" className="mt-4 space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary">
            <Eye className="me-1 inline h-3.5 w-3.5" />{t("publicProfileNote")}
          </div>

          {/* Rubric scores */}
          <Card><CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold">{t("scorePerSkill")}</h3>
              <Badge variant="outline" className="font-bold">
                {t("averageScore")}: <span className="ms-1 text-gradient">
                  {(Object.values(myRubricScores).reduce((a,b)=>a+b,0)/rubricSkills.length).toFixed(1)}/10
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
                      <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${(v/10)*100}%` }} />
                    </div>
                    <div className="text-sm font-bold tabular-nums">{v.toFixed(1)} / 10</div>
                  </div>
                );
              })}
            </div>
          </CardContent></Card>

          {/* Public showcase — accepted submissions */}
          <Card><CardContent className="p-6">
            <h3 className="mb-4 text-base font-bold flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />{t("publicShowcase")}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {submissions.filter(s=>s.acceptedToShowcase).map((s)=>(
                <div key={s.id} className="rounded-xl border bg-gradient-soft p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold">{s.challenge[lang]}</div>
                    <Badge className="gap-1 bg-success text-success-foreground"><CheckCircle2 className="h-3 w-3"/>{t("accepted")}</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.evaluatedSkills.slice(0,4).map(k=>{
                      const sk = rubricSkills.find(x=>x.key===k)!;
                      return <Badge key={k} variant="outline" className="text-[10px]">{sk[lang]}: {s.scores[k] ?? "—"}</Badge>;
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
