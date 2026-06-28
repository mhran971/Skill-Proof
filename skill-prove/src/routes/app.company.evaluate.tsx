import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { submissions, rubricSkills, type RubricKey, type Submission } from "@/lib/mock-data";
import {
  Github, Globe, FileText, Play, Bot, CheckCircle2, Clock, XCircle,
  ThumbsUp, MessageSquare, Sparkles, Star,
} from "lucide-react";
import { InPlatformViewer, type ViewerLink } from "@/components/InPlatformViewer";

export const Route = createFileRoute("/app/company/evaluate")({
  head: () => ({ meta: [{ title: "Evaluate — SkillProof" }] }),
  component: EvaluateRoute,
});

function avg(scores: Partial<Record<RubricKey, number>>) {
  const v = Object.values(scores).filter((x): x is number => typeof x === "number");
  if (!v.length) return 0;
  return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10;
}

const statusMeta: Record<Submission["status"], { tone: string; icon: any; key: any }> = {
  pending_ai: { tone: "bg-warning/15 text-warning-foreground border-warning/30", icon: Bot, key: "pendingReview" },
  ai_done:    { tone: "bg-primary/10 text-primary border-primary/30",            icon: Bot, key: "inReview" },
  in_review:  { tone: "bg-warning/15 text-warning-foreground border-warning/30", icon: Clock, key: "inReview" },
  accepted:   { tone: "bg-success/15 text-success border-success/30",            icon: CheckCircle2, key: "accepted" },
  rejected:   { tone: "bg-destructive/10 text-destructive border-destructive/30", icon: XCircle, key: "rejected" },
};

function linkIcon(kind: string) {
  if (kind === "github") return Github;
  if (kind === "live") return Globe;
  if (kind === "video") return Play;
  return FileText;
}

function EvaluateRoute() {
  const { t, lang } = useI18n();
  const [activeId, setActiveId] = useState(submissions[0].id);
  const [scoresMap, setScoresMap] = useState<Record<string, Partial<Record<RubricKey, number>>>>(
    () => Object.fromEntries(submissions.map((s) => [s.id, { ...s.scores }]))
  );
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>(
    () => Object.fromEntries(submissions.map((s) => [s.id, s.feedback?.[lang] ?? ""]))
  );

  const active = submissions.find((s) => s.id === activeId)!;
  const activeScores = scoresMap[active.id];
  const a = avg(activeScores);

  const counts = useMemo(() => ({
    pending: submissions.filter((s) => s.status === "pending_ai" || s.status === "in_review").length,
    accepted: submissions.filter((s) => s.status === "accepted").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  }), []);

  const setScore = (k: RubricKey, v: number) =>
    setScoresMap((m) => ({ ...m, [active.id]: { ...m[active.id], [k]: v } }));

  const [viewerLink, setViewerLink] = useState<ViewerLink | null>(null);

  return (
    <AppShell>
      <PageHeader
        title={t("evaluate")}
        subtitle={lang === "ar" ? "قيّم كل تسليم لكل مهارة من 0 إلى 10" : "Score each submission per skill, 0–10"}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { l: t("pendingReview"), v: counts.pending, tone: "text-warning" },
          { l: t("accepted"), v: counts.accepted, tone: "text-success" },
          { l: t("rejected"), v: counts.rejected, tone: "text-destructive" },
        ].map((s, i) => (
          <Card key={i}><CardContent className="p-5">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className={`mt-1 text-3xl font-extrabold ${s.tone}`}>{s.v}</div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Submission list */}
        <Card className="lg:sticky lg:top-20 h-fit">
          <CardContent className="p-0">
            <div className="border-b p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {lang === "ar" ? "التسليمات" : "Submissions"}
            </div>
            <div className="max-h-[640px] divide-y overflow-y-auto">
              {submissions.map((s) => {
                const m = statusMeta[s.status];
                const Icon = m.icon;
                const isActive = s.id === activeId;
                const sa = avg(scoresMap[s.id]);
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={`flex w-full items-start gap-3 p-4 text-start transition ${
                      isActive ? "bg-gradient-soft" : "hover:bg-muted/50"
                    }`}
                  >
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={s.candidate.avatar} /><AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{s.candidate.name[lang]}</div>
                      <div className="truncate text-xs text-muted-foreground">{s.challenge[lang]}</div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline" className={`gap-1 px-1.5 py-0 text-[10px] ${m.tone}`}>
                          <Icon className="h-3 w-3" />{t(m.key)}
                        </Badge>
                        {s.type === "final" && (
                          <Badge variant="outline" className="gap-1 border-primary/40 px-1.5 py-0 text-[10px] text-primary">
                            <Star className="h-3 w-3" />{t("finalTask")}
                          </Badge>
                        )}
                        {sa > 0 && <span className="text-[10px] font-bold text-gradient">{sa}/10</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active submission detail */}
        <div className="min-w-0 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start gap-4">
                <Avatar className="h-14 w-14"><AvatarImage src={active.candidate.avatar} /><AvatarFallback>?</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-extrabold">{active.candidate.name[lang]}</h2>
                  <div className="mt-1 text-sm text-muted-foreground">{active.challenge[lang]} · {active.submittedAt}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {active.type === "final" ? (
                      <Badge className="gap-1 bg-gradient-primary text-primary-foreground"><Star className="h-3 w-3" />{t("finalTask")}</Badge>
                    ) : (
                      <Badge variant="outline">{t("regularTask")}</Badge>
                    )}
                    {a > 0 && <Badge variant="outline" className="font-bold">{t("averageScore")}: {a}/10</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2"><MessageSquare className="h-4 w-4" />{t("message")}</Button>
                </div>
              </div>

              {active.type === "final" && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary">
                  <Sparkles className="me-1 inline h-3.5 w-3.5" />{t("finalNote")}
                </div>
              )}

              {/* Submitted links */}
              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {lang === "ar" ? "المُرفقات" : "Submission"}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.links.map((l, i) => {
                    const Icon = linkIcon(l.kind);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setViewerLink(l)}
                        className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs font-medium transition hover:border-primary hover:shadow-sm"
                      >
                        <Icon className="h-3.5 w-3.5 text-primary" />{l.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {lang === "ar" ? "افتح أي مرفق داخل المنصة دون مغادرة الصفحة." : "Open any attachment inside the platform — no new tab."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="rubric">
            <TabsList>
              <TabsTrigger value="rubric">{t("scorePerSkill")}</TabsTrigger>
              <TabsTrigger value="timeline">{t("reviewTimeline")}</TabsTrigger>
              <TabsTrigger value="ai">{t("aiReview")}</TabsTrigger>
            </TabsList>

            <TabsContent value="rubric" className="mt-4">
              <Card><CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("evaluatedSkills")} · {active.evaluatedSkills.length}
                  </div>
                  <Badge variant="outline" className="font-bold">{t("averageScore")}: <span className="ms-1 text-gradient">{a}/10</span></Badge>
                </div>

                <div className="space-y-3">
                  {active.evaluatedSkills.map((k) => {
                    const skill = rubricSkills.find((s) => s.key === k)!;
                    const val = activeScores[k] ?? 0;
                    return (
                      <div key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 sm:grid-cols-[200px_minmax(0,1fr)_80px]">
                        <div className="text-sm font-semibold">{skill[lang]}</div>
                        <div className="col-span-2 sm:col-span-1">
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${(val / 10) * 100}%` }} />
                          </div>
                        </div>
                        <Input
                          type="number" min={0} max={10} step={0.5}
                          value={val || ""}
                          onChange={(e) => setScore(k, parseFloat(e.target.value) || 0)}
                          className="h-9 w-20 text-center font-bold"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("writtenFeedback")}
                  </label>
                  <Textarea
                    rows={4}
                    className="mt-2"
                    value={feedbacks[active.id]}
                    onChange={(e) => setFeedbacks((f) => ({ ...f, [active.id]: e.target.value }))}
                    placeholder={lang === "ar" ? "اكتب ملاحظاتك للمرشّح…" : "Write feedback for the candidate…"}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">{t("saveScores")}</Button>
                  <Button variant="outline" size="sm" className="gap-2 border-destructive/40 text-destructive hover:bg-destructive/10">
                    <XCircle className="h-4 w-4" />{t("rejectSubmission")}
                  </Button>
                  <Button size="sm" className="gap-2 bg-gradient-primary text-primary-foreground">
                    <ThumbsUp className="h-4 w-4" />{t("acceptSubmission")}
                  </Button>
                </div>
              </CardContent></Card>
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <Card><CardContent className="p-6">
                <ol className="relative space-y-5 ps-6">
                  <span className="absolute inset-y-2 start-2 w-px bg-border" />
                  {[
                    { i: Bot, t: t("aiReview"), d: lang==="ar"?"تم تحليل الكود والتغطية والأمان.":"Code, coverage and security analyzed.", done: true },
                    { i: Clock, t: t("humanReview"), d: lang==="ar"?"المراجع البشري يقيّم كل مهارة.":"Human reviewer scoring each skill.", done: active.status !== "pending_ai" },
                    { i: CheckCircle2, t: t("finalDecision"), d: lang==="ar"?"قبول أو رفض ونشر في العرض العام.":"Accept or reject and publish to showcase.", done: active.status==="accepted"||active.status==="rejected" },
                  ].map((s, i) => (
                    <li key={i} className="relative">
                      <span className={`absolute -start-[26px] grid h-5 w-5 place-items-center rounded-full ${s.done ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <s.i className="h-3 w-3" />
                      </span>
                      <div className="font-semibold">{s.t}</div>
                      <div className="text-xs text-muted-foreground">{s.d}</div>
                    </li>
                  ))}
                </ol>
              </CardContent></Card>
            </TabsContent>

            <TabsContent value="ai" className="mt-4">
              <Card><CardContent className="p-6">
                <div className="flex items-center gap-2 text-primary"><Bot className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase">{t("aiReview")}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed">
                  {lang === "ar"
                    ? "تحليل تلقائي: الكود نظيف ومنظم، تغطية الاختبار 84%، لا ثغرات أمنية بارزة. الأداء ضمن الحدود المتوقعة. مناسب لمراجعة بشرية."
                    : "Automated analysis: code is clean and well-structured, test coverage 84%, no critical security findings. Performance within expected range. Ready for human review."}
                </p>
              </CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <InPlatformViewer
        link={viewerLink}
        context={{ candidate: active.candidate.name[lang], challenge: active.challenge[lang] }}
        onClose={() => setViewerLink(null)}
      />
    </AppShell>
  );
}
