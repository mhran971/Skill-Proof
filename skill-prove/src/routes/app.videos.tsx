import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { videos } from "@/lib/mock-data";
import { Upload, Play, Eye, Bot } from "lucide-react";

export const Route = createFileRoute("/app/videos")({
  head: () => ({ meta: [{ title: "Video Portfolio — SkillProof" }] }),
  component: Videos,
});

function Videos() {
  const { t, lang } = useI18n();
  return (
    <AppShell>
      <PageHeader
        title={t("videos")}
        subtitle={lang==="ar"?"معرض الفيديوهات الخاص بك مع تقييم الذكاء الاصطناعي":"Your video portfolio with AI evaluation"}
        action={<Button className="gap-2 bg-gradient-primary text-primary-foreground shadow-elegant"><Upload className="h-4 w-4"/>{t("uploadVideo")}</Button>}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <img src={v.thumb} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-foreground/30 opacity-0 transition group-hover:opacity-100">
                <Play className="h-10 w-10 text-white" />
              </div>
              <Badge className="absolute end-2 top-2 bg-black/60 text-white">{v.duration}</Badge>
            </div>
            <CardContent className="p-4">
              <div className="font-semibold">{v.title[lang]}</div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5"/>{v.views}</span>
              </div>
              <div className="mt-3 rounded-lg bg-gradient-soft p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary"><Bot className="h-3.5 w-3.5"/>{t("aiSummary")}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang==="ar"?"شرح واضح، نطق ممتاز، وتنظيم منطقي للأفكار.":"Clear explanation, excellent diction, logical flow."}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
