import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/lib/i18n";
import { talentPool } from "@/lib/mock-data";
import { Search, MapPin, ShieldCheck, ThumbsUp, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/app/company/talent")({
  head: () => ({ meta: [{ title: "Talent Search — SkillProof" }] }),
  component: Talent,
});

const skillTags = ["All", "React", "Node", "Python", "Go", "ML", "Flutter", "AWS", "UI"];

function Talent() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [activeSkill, setActiveSkill] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minReadiness, setMinReadiness] = useState(0);

  const results = useMemo(() => {
    return talentPool.filter((c) => {
      if (verifiedOnly && !c.verified) return false;
      if (c.readiness < minReadiness) return false;
      if (activeSkill !== "All" && !c.top.includes(activeSkill)) return false;
      const ql = q.trim().toLowerCase();
      if (ql && !`${c.name.ar} ${c.name.en} ${c.title}`.toLowerCase().includes(ql)) return false;
      return true;
    });
  }, [q, activeSkill, verifiedOnly, minReadiness]);

  return (
    <AppShell>
      <PageHeader title={t("talent")} subtitle={lang==="ar"?"اكتشف مرشّحين بأدلّة مهارة موثّقة":"Discover candidates with verified proof of skill"} />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Filters */}
        <Card className="h-fit lg:sticky lg:top-20">
          <CardContent className="space-y-5 p-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("skills")}</label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skillTags.map((s) => (
                  <Badge key={s} variant={s === activeSkill ? "default" : "outline"} className="cursor-pointer" onClick={() => setActiveSkill(s)}>
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("readiness")} ≥ <span className="text-primary">{minReadiness}</span>
              </label>
              <input type="range" min={0} max={95} step={5} value={minReadiness} onChange={(e)=>setMinReadiness(parseInt(e.target.value))} className="mt-2 w-full accent-primary" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-success" />{t("verifiedOnly")}</div>
              <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="min-w-0 space-y-4">
          <Card><CardContent className="flex flex-wrap items-center gap-3 p-4">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3" />
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder={lang==="ar"?"ابحث بالاسم أو التخصص…":"Search by name or role…"} className="ps-9" />
            </div>
            <div className="text-xs text-muted-foreground">
              {results.length} {lang==="ar"?"مرشّح":"candidates"}
            </div>
          </CardContent></Card>

          <div className="grid gap-4 md:grid-cols-2">
            {results.map((c) => (
              <Card key={c.id} className="transition hover:shadow-elegant">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12"><AvatarImage src={c.avatar} /><AvatarFallback>?</AvatarFallback></Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate font-bold">{c.name[lang]}</h3>
                        {c.verified && <ShieldCheck className="h-4 w-4 text-success" />}
                      </div>
                      <div className="text-xs text-muted-foreground">{c.title} · <MapPin className="inline h-3 w-3" /> {c.country}</div>
                    </div>
                    <div className="text-end">
                      <div className="text-xl font-extrabold text-gradient">{c.avg}</div>
                      <div className="text-[10px] text-muted-foreground">{t("avgScore")}</div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-muted/40 p-2"><div className="text-muted-foreground">{t("readiness")}</div><div className="font-bold">{c.readiness}/100</div></div>
                    <div className="rounded-lg bg-muted/40 p-2"><div className="text-muted-foreground">{t("reputation")}</div><div className="font-bold">{c.reputation.toLocaleString()}</div></div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.top.map((s) => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1"><MessageSquare className="h-3.5 w-3.5" />{t("message")}</Button>
                    <Button size="sm" className="flex-1 gap-1 bg-gradient-primary text-primary-foreground"><ThumbsUp className="h-3.5 w-3.5" />{t("shortlist")}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {results.length === 0 && (
              <Card className="md:col-span-2"><CardContent className="p-10 text-center text-sm text-muted-foreground">
                {lang==="ar"?"لا توجد نتائج تطابق المرشّحات.":"No candidates match these filters."}
              </CardContent></Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
