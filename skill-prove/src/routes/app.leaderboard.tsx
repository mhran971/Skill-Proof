import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { getLeaderboard } from "@/lib/api/leaderboard";
import { leaderboard as mockLeaderboard } from "@/lib/mock-data";
import { Trophy, Medal, Crown } from "lucide-react";

export const Route = createFileRoute("/app/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — SkillProof" }] }),
  component: LB,
});

function LB() {
  const { t, lang } = useI18n();

  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
    staleTime: 60_000,
  });

  const entries = data?.data ?? [];
  const showMock = !isLoading && entries.length === 0;

  const ranked = showMock
    ? mockLeaderboard.map((u, i) => ({
        id: i,
        name: u.name[lang],
        avatar: u.avatar,
        reputation: u.score,
        readiness: 80,
        badge_tier: u.badge,
        rank: u.rank,
      }))
    : entries.map((u, i) => ({ ...u, rank: i + 1 }));

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const icons = [Crown, Trophy, Medal];

  return (
    <AppShell>
      <PageHeader
        title={t("leaderboard")}
        subtitle={lang === "ar" ? "أبطال هذا الأسبوع" : "This week's champions"}
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-2 bg-muted" />
              <CardContent className="flex flex-col items-center p-6 text-center gap-3">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-6 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {top3.map((u, i) => {
            const Icon = icons[i];
            return (
              <Card key={u.id} className={`overflow-hidden ${i === 0 ? "md:-translate-y-2" : ""}`}>
                <div className={`h-2 ${i === 0 ? "bg-gradient-primary" : i === 1 ? "bg-primary-glow" : "bg-warning"}`} />
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-card shadow-elegant">
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -end-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 font-bold">{u.name}</div>
                  <Badge className="mt-2 bg-gradient-primary text-primary-foreground">{u.badge_tier}</Badge>
                  <div className="mt-3 text-2xl font-extrabold text-gradient">
                    {u.reputation.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lang === "ar" ? "نقاط السمعة" : "reputation points"}
                  </div>
                  {u.readiness > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {lang === "ar" ? "جاهزية:" : "Readiness:"} {u.readiness}%
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="divide-y">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))
              : rest.map((u) => (
                  <div key={u.id} className="flex items-center gap-4 p-4">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-sm font-bold">
                      {u.rank}
                    </div>
                    <Avatar>
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{u.name}</div>
                      <Badge variant="outline" className="mt-0.5 text-[10px]">{u.badge_tier}</Badge>
                    </div>
                    <div className="text-end">
                      <div className="font-extrabold">{u.reputation.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground">pts</div>
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

      {data && data.meta.total > 20 && (
        <div className="mt-4 text-center text-xs text-muted-foreground">
          {lang === "ar" ? `إجمالي ${data.meta.total} مرشح` : `${data.meta.total} total candidates`}
        </div>
      )}
    </AppShell>
  );
}
