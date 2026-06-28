import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { recommendedChallenges } from "@/lib/mock-data";
import { Clock, Coins, Filter, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/challenges")({
  head: () => ({ meta: [{ title: "Challenges — SkillProof" }] }),
  component: Challenges,
});

const cats = ["All", "Frontend", "Backend", "Data", "Design", "Mobile"];
const diffs = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

function Challenges() {
  const { t, lang } = useI18n();
  const all = [...recommendedChallenges, ...recommendedChallenges];
  return (
    <AppShell>
      <PageHeader
        title={t("browseChallenges")}
        subtitle={lang==="ar"?"أثبت مهاراتك من خلال تحديات حقيقية":"Prove your skills through real challenges"}
      />

      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3"/>
            <Input placeholder={lang==="ar"?"ابحث في التحديات…":"Search challenges…"} className="ps-9"/>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="self-center text-xs font-semibold text-muted-foreground">{t("category")}:</span>
            {cats.map(c=>(<Badge key={c} variant={c==="All"?"default":"outline"} className="cursor-pointer">{c}</Badge>))}
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4"/>{t("filterBy")}</Button>
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {all.map((c, i) => (
          <Card key={i} className="group transition hover:-translate-y-0.5 hover:shadow-elegant">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Sparkles className="h-5 w-5"/></div>
                <Badge variant="secondary">{c.difficulty}</Badge>
              </div>
              <h3 className="mt-4 text-base font-bold">{c.title[lang]}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {lang==="ar"?"تحدي عملي يهدف لقياس مهاراتك في بيئة شبيهة بالعمل الحقيقي.":"A real-world challenge that benchmarks your skills like on the job."}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5"/>{c.duration}</span>
                <span className="flex items-center gap-1"><Coins className="h-3.5 w-3.5 text-warning"/>{c.reward} pts</span>
                <Badge variant="outline">{c.category}</Badge>
              </div>
              <Link to="/app/challenges/submit"><Button className="mt-5 w-full bg-gradient-primary text-primary-foreground">{t("start")}</Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
