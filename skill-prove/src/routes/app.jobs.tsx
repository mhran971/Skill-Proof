import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { recommendedJobs } from "@/lib/mock-data";
import { Search, MapPin, Briefcase, Filter } from "lucide-react";

export const Route = createFileRoute("/app/jobs")({
  head: () => ({ meta: [{ title: "Jobs — SkillProof" }] }),
  component: Jobs,
});

function Jobs() {
  const { t, lang } = useI18n();
  const list = [...recommendedJobs, ...recommendedJobs, ...recommendedJobs];
  return (
    <AppShell>
      <PageHeader title={t("jobs")} subtitle={lang==="ar"?"مطابقات ذكية مبنية على مهاراتك":"Smart matches based on your skills"} />
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3"/>
            <Input placeholder={t("searchJobs")} className="ps-9"/>
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4"/>{t("filterBy")}</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((j, i) => (
          <Card key={i} className="transition hover:shadow-elegant">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Briefcase className="h-6 w-6"/></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold">{j.title[lang]}</h3>
                    <div className="text-xs text-muted-foreground">{j.company}</div>
                  </div>
                  <div className="text-end">
                    <div className="text-lg font-extrabold text-gradient">{j.match}%</div>
                    <div className="text-[10px] text-muted-foreground">{t("match")}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3"/>{j.location}</Badge>
                  <Badge variant="outline">{j.salary} SAR</Badge>
                  <Badge variant="outline">Full-time</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="bg-gradient-primary text-primary-foreground">{t("apply")}</Button>
                  <Button size="sm" variant="outline">{lang==="ar"?"حفظ":"Save"}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
