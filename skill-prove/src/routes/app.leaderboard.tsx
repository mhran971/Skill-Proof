import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { Trophy, Medal, Crown, Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — SkillProof" }] }),
  component: LB,
});

function LB() {
  const { t, lang } = useI18n();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<any[]>("/leaderboard");
        setData(res);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);
  const icons = [Crown, Trophy, Medal];

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title={t("leaderboard")} subtitle={lang==="ar"?"أبطال هذا الأسبوع":"This week's champions"} />

      <div className="grid gap-4 md:grid-cols-3">
        {top3.map((u, i) => {
          const Icon = icons[i];
          return (
            <Card key={u.rank} className={`overflow-hidden ${i===0?"md:-translate-y-2":""}`}>
              <div className={`h-2 ${i===0?"bg-gradient-primary":i===1?"bg-primary-glow":"bg-warning"}`} />
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-card shadow-elegant"><AvatarImage src={u.avatar}/><AvatarFallback>{u.name.charAt(0)}</AvatarFallback></Avatar>
                  <div className="absolute -end-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground"><Icon className="h-4 w-4"/></div>
                </div>
                <div className="mt-4 font-bold">{u.name}</div>
                <Badge className="mt-2 bg-gradient-primary text-primary-foreground">{u.badge_tier}</Badge>
                <div className="mt-3 text-2xl font-extrabold text-gradient">{(u.reputation || 0).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{lang==="ar"?"نقاط السمعة":"reputation points"}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="divide-y">
            {rest.map((u, idx)=>(
              <div key={u.id} className="flex items-center gap-4 p-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-sm font-bold">{idx + 4}</div>
                <Avatar><AvatarImage src={u.avatar}/><AvatarFallback>{u.name.charAt(0)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{u.name}</div>
                  <Badge variant="outline" className="mt-0.5 text-[10px]">{u.badge_tier}</Badge>
                </div>
                <div className="text-end">
                  <div className="font-extrabold">{(u.reputation || 0).toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground">pts</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
