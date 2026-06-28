import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { GraduationCap, Clock, Building2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/internships")({
  head: () => ({ meta: [{ title: "Internships — SkillProof" }] }),
  component: Internships,
});

function Internships() {
  const { t, lang } = useI18n();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<any[]>("/internships");
        setData(res);
      } catch (error) {
        console.error("Failed to fetch internships", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AppShell>
      <PageHeader title={t("internships")} subtitle={lang==="ar"?"تدريب افتراضي مع تقدّم مُتابَع":"Virtual internships with progress tracking"} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          data.map((it, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><GraduationCap className="h-5 w-5"/></div>
                  <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3"/>{it.duration_weeks} weeks</Badge>
                </div>
                <h3 className="mt-4 text-base font-bold">{it.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="h-3 w-3"/>{it.company?.name}</div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs"><span>{lang==="ar"?"التقدّم":"Progress"}</span><span className="font-semibold">{it.progress || 0}%</span></div>
                  <Progress value={it.progress || 0} className="mt-1.5 h-2"/>
                </div>
                <Button className="mt-5 w-full bg-gradient-primary text-primary-foreground">
                  {(it.progress || 0) === 0 ? (lang === "ar" ? "التحاق" : "Enroll") : (lang === "ar" ? "متابعة" : "Continue")}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
        {!loading && data.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground italic">
            {lang === "ar" ? "لا توجد برامج تدريب متاحة" : "No internships available"}
          </div>
        )}
      </div>
    </AppShell>
  );
}
