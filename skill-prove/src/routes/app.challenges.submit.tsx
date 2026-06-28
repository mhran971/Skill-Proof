import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { rubricSkills, type RubricKey } from "@/lib/mock-data";
import { Github, Globe, Video, Upload, CheckCircle2, Bot, Clock, Sparkles, ArrowLeft, Star } from "lucide-react";

export const Route = createFileRoute("/app/challenges/submit")({
  head: () => ({ meta: [{ title: "Submit Solution — SkillProof" }] }),
  component: SubmitChallenge,
});

// Sample challenge being submitted
const challenge = {
  title: { ar: "بناء API بمعدّل أداء عالٍ", en: "High-Performance REST Auth API" },
  type: "final" as const,
  company: "Nova Labs",
  evaluatedSkills: ["code", "arch", "testing", "docs", "delivery", "present"] as RubricKey[],
  description: {
    ar: "ابنِ نظام مصادقة REST قابل للتوسّع باستخدام JWT و OAuth، مع توثيق Swagger وقابلية لـ 10k req/s.",
    en: "Build a scalable REST auth system with JWT and OAuth, Swagger docs, capable of 10k req/s.",
  },
};

function SubmitChallenge() {
  const { t, lang } = useI18n();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");

  return (
    <AppShell>
      <PageHeader
        title={t("submitSolution")}
        subtitle={challenge.title[lang]}
        action={
          <Link to="/app/challenges"><Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className={`h-4 w-4 ${lang==="ar"?"rotate-180":""}`} />{lang==="ar"?"رجوع":"Back"}
          </Button></Link>
        }
      />

      {/* Stepper */}
      <Card className="mb-6">
        <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
          {[
            { n: 1, l: lang==="ar"?"التسليم":"Upload" },
            { n: 2, l: t("aiReview") },
            { n: 3, l: t("humanReview") },
          ].map((s) => {
            const done = step > s.n, active = step === s.n;
            return (
              <div key={s.n} className={`flex items-center gap-3 rounded-xl border p-3 ${active?"border-primary bg-gradient-soft":done?"border-success/40":""}`}>
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${done?"bg-success text-success-foreground":active?"bg-gradient-primary text-primary-foreground":"bg-muted text-muted-foreground"}`}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-sm font-bold">{s.n}</span>}
                </div>
                <div className="text-sm font-semibold">{s.l}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          {step === 1 && (
            <Card><CardContent className="space-y-5 p-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold"><Github className="h-4 w-4 text-primary" />{t("githubRepo")}</label>
                <Input className="mt-2" placeholder="https://github.com/you/project" value={github} onChange={(e)=>setGithub(e.target.value)} />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold"><Globe className="h-4 w-4 text-primary" />{t("liveUrl")}</label>
                <Input className="mt-2" placeholder="https://your-demo.app" value={live} onChange={(e)=>setLive(e.target.value)} />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold"><Video className="h-4 w-4 text-primary" />{t("videoExplain")}
                  {challenge.type === "final" && <Badge className="bg-gradient-primary text-primary-foreground">{lang==="ar"?"مطلوب":"Required"}</Badge>}
                </label>
                <div className="mt-2 grid place-items-center rounded-xl border-2 border-dashed p-8 text-center text-sm text-muted-foreground">
                  <Upload className="mb-2 h-8 w-8 text-primary" />
                  {lang==="ar"?"اسحب فيديو شرحك هنا أو اضغط للرفع (≤ 200MB)":"Drag your walkthrough video here or click to upload (≤ 200MB)"}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold">{lang==="ar"?"ملاحظات للمراجع":"Notes for reviewer"}</label>
                <Textarea rows={3} className="mt-2" placeholder={lang==="ar"?"اشرح قراراتك التقنية بإيجاز…":"Briefly explain your technical decisions…"} />
              </div>
              <div className="flex justify-end">
                <Button className="gap-2 bg-gradient-primary text-primary-foreground" onClick={()=>setStep(2)}>
                  {lang==="ar"?"إرسال للمراجعة":"Send for review"}<Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </CardContent></Card>
          )}

          {step === 2 && (
            <Card><CardContent className="p-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Bot className="h-8 w-8 animate-pulse" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{t("aiReview")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang==="ar"?"يفحص الذكاء الاصطناعي الكود، التغطية، الأمان، والأداء…":"AI is analyzing your code, coverage, security and performance…"}
              </p>
              <div className="mx-auto mt-5 h-2 max-w-sm overflow-hidden rounded-full bg-muted">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-primary" />
              </div>
              <Button className="mt-6" variant="outline" size="sm" onClick={()=>setStep(3)}>
                {lang==="ar"?"عرض النتيجة":"View result"}
              </Button>
            </CardContent></Card>
          )}

          {step === 3 && (
            <Card><CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-success text-success-foreground"><CheckCircle2 className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold">{lang==="ar"?"تم استلام تسليمك":"Your submission is received"}</div>
                  <div className="text-xs text-muted-foreground">{lang==="ar"?"المراجع البشري سيقيّم كل مهارة من 0 إلى 10.":"A human reviewer will score each skill from 0 to 10."}</div>
                </div>
              </div>

              <div className="rounded-xl border bg-muted/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("aiReview")}</div>
                <p className="mt-2 text-sm">
                  {lang==="ar"?"الكود نظيف، التغطية 84%، لا ثغرات أمنية حرجة. جاهز لمراجعة بشرية.":"Code is clean, coverage 84%, no critical security issues. Ready for human review."}
                </p>
              </div>

              <div className="flex gap-2">
                <Link to="/app/dashboard"><Button variant="outline">{lang==="ar"?"العودة للوحة":"Back to dashboard"}</Button></Link>
              </div>
            </CardContent></Card>
          )}
        </div>

        {/* Side panel: rubric & challenge info */}
        <div className="space-y-4">
          <Card><CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{lang==="ar"?"التحدي":"Challenge"}</div>
              {challenge.type === "final" && (
                <Badge className="gap-1 bg-gradient-primary text-primary-foreground"><Star className="h-3 w-3" />{t("finalTask")}</Badge>
              )}
            </div>
            <h3 className="mt-2 font-bold">{challenge.title[lang]}</h3>
            <div className="mt-1 text-xs text-muted-foreground">{challenge.company}</div>
            <p className="mt-3 text-sm text-muted-foreground">{challenge.description[lang]}</p>
          </CardContent></Card>

          <Card><CardContent className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("evaluatedSkills")}</div>
            <div className="mt-3 space-y-2">
              {challenge.evaluatedSkills.map((k) => {
                const s = rubricSkills.find((x) => x.key === k)!;
                return (
                  <div key={k} className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2.5 text-sm">
                    <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-primary text-[10px] font-bold text-primary-foreground">0-10</div>
                    {s[lang]}
                  </div>
                );
              })}
            </div>
            {challenge.type === "final" && (
              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-primary">
                <Sparkles className="me-1 inline h-3.5 w-3.5" />{t("finalNote")}
              </div>
            )}
          </CardContent></Card>

          <Card><CardContent className="p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />{lang==="ar"?"الموعد النهائي":"Deadline"}
            </div>
            <div className="mt-2 text-lg font-bold">2026-06-30</div>
            <div className="text-xs text-muted-foreground">{lang==="ar"?"متبقّي 14 يوماً":"14 days remaining"}</div>
          </CardContent></Card>
        </div>
      </div>
    </AppShell>
  );
}
