import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Plus, X, Sparkles, ArrowUp, ArrowDown, Scale } from "lucide-react";
import { rubricSkills, type RubricKey } from "@/lib/mock-data";

export const Route = createFileRoute("/app/company/create-challenge")({
  head: () => ({ meta: [{ title: "Create Challenge — SkillProof" }] }),
  component: CreateChallenge,
});

type RubricRow = { key: RubricKey; weight: number };

function CreateChallenge() {
  const { t, lang } = useI18n();
  const [skills, setSkills] = useState(["React","TypeScript"]);
  const [input, setInput] = useState("");
  const [rubric, setRubric] = useState<RubricRow[]>([
    { key: "code", weight: 3 },
    { key: "arch", weight: 2 },
    { key: "present", weight: 1 },
  ]);

  const add = () => {
    if (input.trim()) { setSkills([...skills, input.trim()]); setInput(""); }
  };

  const toggleRubric = (k: RubricKey) => {
    setRubric((r) =>
      r.some((x) => x.key === k)
        ? r.filter((x) => x.key !== k)
        : [...r, { key: k, weight: 1 }]
    );
  };
  const move = (i: number, dir: -1 | 1) => {
    setRubric((r) => {
      const next = [...r];
      const j = i + dir;
      if (j < 0 || j >= next.length) return r;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const setWeight = (i: number, w: number) =>
    setRubric((r) => r.map((x, idx) => (idx === i ? { ...x, weight: w } : x)));

  return (
    <AppShell>
      <PageHeader title={t("createChallenge")} subtitle={lang==="ar"?"صمّم تحدياً عملياً يكشف المهارات الحقيقية":"Design a real challenge that surfaces true skill"} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="space-y-5 p-6">
          <div className="space-y-1.5">
            <Label>{lang==="ar"?"عنوان التحدي":"Challenge title"}</Label>
            <Input placeholder={lang==="ar"?"مثال: بناء واجهة لوحة تحكم تفاعلية":"e.g. Build an interactive dashboard"} />
          </div>
          <div className="space-y-1.5">
            <Label>{lang==="ar"?"الوصف":"Description"}</Label>
            <Textarea rows={6} placeholder={lang==="ar"?"اشرح المهمة، المتطلبات، والمعطيات…":"Describe the task, requirements and inputs…"}/>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{lang==="ar"?"الموعد النهائي":"Deadline"}</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("difficulty")}</Label>
              <Input placeholder="Intermediate" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{lang==="ar"?"المهارات المطلوبة":"Required skills"}</Label>
            <div className="flex flex-wrap gap-2">
              {skills.map(s=>(
                <Badge key={s} variant="secondary" className="gap-1.5 px-3 py-1.5">
                  {s}
                  <button onClick={()=>setSkills(skills.filter(x=>x!==s))} aria-label="remove"><X className="h-3 w-3"/></button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={input} onChange={e=>setInput(e.target.value)} placeholder={lang==="ar"?"أضف مهارة…":"Add a skill…"} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add();}}}/>
              <Button onClick={add} variant="outline" className="gap-1"><Plus className="h-4 w-4"/></Button>
            </div>
          </div>
          {/* Evaluation rubric — same skills set used in /app/company/evaluate */}
          <div className="space-y-2 rounded-xl border bg-gradient-soft p-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              <Label className="text-sm font-bold">{t("evaluationRubric")}</Label>
            </div>
            <p className="text-xs text-muted-foreground">{t("rubricHint")}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {rubricSkills.map((s) => {
                const active = rubric.some((r) => r.key === s.key);
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => toggleRubric(s.key)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "border-primary bg-gradient-primary text-primary-foreground shadow-elegant"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <Checkbox checked={active} className="pointer-events-none h-3.5 w-3.5" />
                    {s[lang]}
                  </button>
                );
              })}
            </div>

            {rubric.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("rank")} · {t("weight")}
                </div>
                {rubric.map((r, i) => {
                  const sk = rubricSkills.find((x) => x.key === r.key)!;
                  return (
                    <div key={r.key} className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-2 rounded-lg border bg-card p-2">
                      <Badge className="bg-gradient-primary text-primary-foreground">#{i + 1}</Badge>
                      <div className="min-w-0 truncate text-sm font-semibold">{sk[lang]}</div>
                      <Input
                        type="number" min={1} max={5} step={1}
                        value={r.weight}
                        onChange={(e) => setWeight(i, parseInt(e.target.value) || 1)}
                        className="h-8 w-16 text-center font-bold"
                      />
                      <div className="flex gap-1">
                        <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={() => move(i, -1)}><ArrowUp className="h-3.5 w-3.5" /></Button>
                        <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={() => move(i, 1)}><ArrowDown className="h-3.5 w-3.5" /></Button>
                        <Button type="button" size="icon" variant="outline" className="h-7 w-7 text-destructive" onClick={() => toggleRubric(r.key)}><X className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>{lang==="ar"?"ملاحظات إضافية":"Additional notes"}</Label>
            <Textarea rows={3} placeholder={lang==="ar"?"تعليمات إضافية للمرشحين…":"Extra instructions for candidates…"}/>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline">{lang==="ar"?"حفظ كمسودّة":"Save draft"}</Button>
            <Button className="bg-gradient-primary text-primary-foreground">{lang==="ar"?"نشر التحدي":"Publish challenge"}</Button>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <div className="flex items-center gap-2 text-primary"><Sparkles className="h-5 w-5"/><span className="text-xs font-bold uppercase tracking-wider">{lang==="ar"?"معاينة":"Preview"}</span></div>
          <h3 className="mt-3 text-lg font-bold">{lang==="ar"?"بناء واجهة لوحة تحكم تفاعلية":"Build an interactive dashboard"}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{lang==="ar"?"ستظهر معاينة التحدي هنا كما يراها المرشّحون.":"Candidate-facing preview will render here."}</p>
          <div className="mt-4 space-y-2">
            <Badge variant="outline">3h</Badge>
            <Badge variant="outline" className="ms-1">Intermediate</Badge>
          </div>
        </CardContent></Card>
      </div>
    </AppShell>
  );
}
