import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { interviewQuestions } from "@/lib/mock-data";
import { Bot, Mic, MicOff, Video, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/interview")({
  head: () => ({ meta: [{ title: "AI Interview — SkillProof" }] }),
  component: Interview,
});

function Interview() {
  const { t, lang } = useI18n();
  const [idx, setIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const q = interviewQuestions[idx];

  return (
    <AppShell>
      <PageHeader title={t("interview")} subtitle={lang==="ar"?"محاكاة مقابلة حقيقية بالذكاء الاصطناعي":"Realistic AI-powered interview simulation"} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden lg:col-span-2">
          <div className="relative grid aspect-video place-items-center bg-foreground">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow"><Video className="h-10 w-10"/></div>
            <div className="absolute bottom-4 start-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white">REC ● 02:14</div>
            <Badge className="absolute end-4 top-4 bg-white/15 text-white">{t("aiQuestion")} {idx+1} / {interviewQuestions.length}</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-primary"><Bot className="h-5 w-5"/><span className="text-xs font-bold uppercase tracking-wider">AI</span></div>
            <p className="mt-2 text-lg font-semibold leading-relaxed">{q[lang]}</p>
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" size="lg" onClick={()=>setMuted(!muted)} className="gap-2">
                {muted? <MicOff className="h-4 w-4"/> : <Mic className="h-4 w-4"/>}
                {muted?(lang==="ar"?"إعادة التشغيل":"Unmute"):(lang==="ar"?"كتم":"Mute")}
              </Button>
              <Button size="lg" className="gap-2 bg-gradient-primary text-primary-foreground"
                onClick={()=>setIdx(i=>Math.min(i+1, interviewQuestions.length-1))}>
                {lang==="ar"?"التالي":"Next"} <ArrowRight className={`h-4 w-4 ${lang==="ar"?"rotate-180":""}`}/>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-bold">{lang==="ar"?"تحليل الأداء المباشر":"Live performance"}</h3>
            <div className="mt-4 space-y-4">
              {[
                {l:lang==="ar"?"الوضوح":"Clarity",v:88},
                {l:lang==="ar"?"الثقة":"Confidence",v:74},
                {l:lang==="ar"?"المحتوى التقني":"Technical content",v:81},
                {l:lang==="ar"?"البنية":"Structure",v:69},
              ].map(m=>(
                <div key={m.l}>
                  <div className="flex justify-between text-xs"><span>{m.l}</span><span className="text-muted-foreground">{m.v}%</span></div>
                  <Progress value={m.v} className="mt-1.5 h-2"/>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-gradient-soft p-4">
              <div className="text-xs font-bold text-primary">{lang==="ar"?"ملاحظات الذكاء الاصطناعي":"AI feedback"}</div>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                {[
                  lang==="ar"?"إجابة منظّمة بشكل جيد وأمثلة عملية":"Well-structured answer with concrete examples",
                  lang==="ar"?"حاول تجنّب كلمات الحشو":"Try to avoid filler words",
                  lang==="ar"?"اشرح الأثر بأرقام":"Quantify your impact",
                ].map((x,i)=>(<li key={i} className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success"/>{x}</li>))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
