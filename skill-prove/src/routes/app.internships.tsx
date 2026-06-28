import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { internships } from "@/lib/mock-data";
import { GraduationCap, Clock, Building2 } from "lucide-react";

export const Route = createFileRoute("/app/internships")({
  head: () => ({ meta: [{ title: "Internships — SkillProof" }] }),
  component: Internships,
});

function Internships() {
  const { t, lang } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("internships")} subtitle={lang==="ar"?"تدريب افتراضي مع تقدّم مُتابَع":"Virtual internships with progress tracking"} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {internships.map((it, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><GraduationCap className="h-5 w-5"/></div>
                <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3"/>{it.duration}</Badge>
              </div>
              <h3 className="mt-4 text-base font-bold">{it.title[lang]}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="h-3 w-3"/>{it.company}</div>
              <div className="mt-4">
                <div className="flex justify-between text-xs"><span>{lang==="ar"?"التقدّم":"Progress"}</span><span className="font-semibold">{it.progress}%</span></div>
                <Progress value={it.progress} className="mt-1.5 h-2"/>
              </div>
              <Button className="mt-5 w-full bg-gradient-primary text-primary-foreground">
                {it.progress===0?(lang==="ar"?"التحاق":"Enroll"):(lang==="ar"?"متابعة":"Continue")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
