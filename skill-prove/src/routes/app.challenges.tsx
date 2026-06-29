import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { getChallenges } from "@/lib/api/challenges";
import { recommendedChallenges as mockChallenges } from "@/lib/mock-data";
import { Clock, Coins, Filter, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/challenges")({
  head: () => ({ meta: [{ title: "Challenges — SkillProof" }] }),
  component: Challenges,
});

const cats = ["All", "Frontend", "Backend", "Data", "Design", "Mobile"];
const diffs = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

function ChallengeCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

function Challenges() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedDiff, setSelectedDiff] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["challenges", { category: selectedCat, difficulty: selectedDiff, search: debouncedSearch }],
    queryFn: () => getChallenges({ category: selectedCat, difficulty: selectedDiff, search: debouncedSearch }),
    staleTime: 30_000,
  });

  const challenges = data?.data ?? [];
  const showMock = !isLoading && challenges.length === 0;
  const displayList = showMock
    ? [...mockChallenges, ...mockChallenges].map((c, i) => ({
        id: i,
        title_ar: c.title.ar,
        title_en: c.title.en,
        category: c.category,
        difficulty: c.difficulty as "Beginner" | "Intermediate" | "Advanced",
        duration: c.duration,
        reward: c.reward,
      }))
    : challenges;

  return (
    <AppShell>
      <PageHeader
        title={t("browseChallenges")}
        subtitle={lang === "ar" ? "أثبت مهاراتك من خلال تحديات حقيقية" : "Prove your skills through real challenges"}
      />

      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3" />
            <Input
              placeholder={lang === "ar" ? "ابحث في التحديات…" : "Search challenges…"}
              className="ps-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="self-center text-xs font-semibold text-muted-foreground">
              {t("category")}:
            </span>
            {cats.map((c) => (
              <Badge
                key={c}
                variant={selectedCat === c ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCat(c)}
              >
                {c}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="self-center text-xs font-semibold text-muted-foreground">
              {t("difficulty")}:
            </span>
            {diffs.map((d) => (
              <Badge
                key={d}
                variant={selectedDiff === d ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedDiff(d)}
              >
                {d}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ChallengeCardSkeleton key={i} />)
          : displayList.map((c) => (
              <Card key={c.id} className="group transition hover:-translate-y-0.5 hover:shadow-elegant">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{c.difficulty}</Badge>
                  </div>
                  <h3 className="mt-4 text-base font-bold">
                    {lang === "ar" ? c.title_ar : c.title_en}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {lang === "ar"
                      ? "تحدي عملي يهدف لقياس مهاراتك في بيئة شبيهة بالعمل الحقيقي."
                      : "A real-world challenge that benchmarks your skills like on the job."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />{c.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-warning" />{c.reward} pts
                    </span>
                    <Badge variant="outline">{c.category}</Badge>
                  </div>
                  <Link to="/app/challenges/submit">
                    <Button className="mt-5 w-full bg-gradient-primary text-primary-foreground">
                      {t("start")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
      </div>

      {data && data.meta.last_page > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          {lang === "ar" ? "الصفحة" : "Page"} {data.meta.current_page} {lang === "ar" ? "من" : "of"} {data.meta.last_page}
          <span>· {data.meta.total} {lang === "ar" ? "تحدي" : "challenges"}</span>
        </div>
      )}
    </AppShell>
  );
}
