import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { getJobs, applyToJob } from "@/lib/api/jobs";
import { recommendedJobs as mockJobs } from "@/lib/mock-data";
import { Search, MapPin, Briefcase, Filter, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/jobs")({
  head: () => ({ meta: [{ title: "Jobs — SkillProof" }] }),
  component: Jobs,
});

function JobCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-5">
        <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

function Jobs() {
  const { t, lang } = useI18n();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [appliedIds, setAppliedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["jobs", { search: debouncedSearch }],
    queryFn: () => getJobs({ search: debouncedSearch }),
    staleTime: 30_000,
  });

  const applyMutation = useMutation({
    mutationFn: (jobId: number) => applyToJob(jobId),
    onSuccess: (_, jobId) => {
      setAppliedIds((prev) => new Set([...prev, jobId]));
      toast.success(lang === "ar" ? "تم إرسال طلبك بنجاح!" : "Application submitted successfully!");
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err: any) => {
      toast.error(err.message ?? (lang === "ar" ? "خطأ في التقديم" : "Application failed"));
    },
  });

  const jobs = data?.data ?? [];
  const showMock = !isLoading && jobs.length === 0;

  return (
    <AppShell>
      <PageHeader
        title={t("jobs")}
        subtitle={lang === "ar" ? "مطابقات ذكية مبنية على مهاراتك" : "Smart matches based on your skills"}
      />

      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3" />
            <Input
              placeholder={t("searchJobs")}
              className="ps-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />{t("filterBy")}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          : showMock
            ? mockJobs.map((j, i) => (
                <Card key={i} className="transition hover:shadow-elegant">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                      <Briefcase className="h-6 w-6" />
                    </div>
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
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />{j.location}
                        </Badge>
                        <Badge variant="outline">{j.salary} SAR</Badge>
                        <Badge variant="outline">Full-time</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="bg-gradient-primary text-primary-foreground">
                          {t("apply")}
                        </Button>
                        <Button size="sm" variant="outline">
                          {lang === "ar" ? "حفظ" : "Save"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : jobs.map((j) => {
                const isApplied = appliedIds.has(j.id);
                const isApplying = applyMutation.isPending && applyMutation.variables === j.id;
                return (
                  <Card key={j.id} className="transition hover:shadow-elegant">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-bold">{j.title}</h3>
                            <div className="text-xs text-muted-foreground">
                              {j.company?.name ?? ""}
                            </div>
                          </div>
                          {j.applicants_count != null && (
                            <div className="text-end">
                              <div className="text-sm font-bold">{j.applicants_count}</div>
                              <div className="text-[10px] text-muted-foreground">
                                {lang === "ar" ? "متقدّم" : "applicants"}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <Badge variant="outline" className="gap-1">
                            <MapPin className="h-3 w-3" />{j.location}
                          </Badge>
                          {j.salary_min && j.salary_max && (
                            <Badge variant="outline">
                              {j.salary_min}–{j.salary_max}k SAR
                            </Badge>
                          )}
                          {j.type && (
                            <Badge variant="outline">{j.type}</Badge>
                          )}
                        </div>
                        {j.skills_required && j.skills_required.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {j.skills_required.slice(0, 4).map((s) => (
                              <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex gap-2">
                          {isApplied ? (
                            <Button size="sm" disabled className="gap-1 bg-success text-success-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {lang === "ar" ? "تم التقديم" : "Applied"}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              disabled={isApplying}
                              className="bg-gradient-primary text-primary-foreground"
                              onClick={() => applyMutation.mutate(j.id)}
                            >
                              {isApplying
                                ? lang === "ar" ? "جاري التقديم…" : "Applying…"
                                : t("apply")}
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            {lang === "ar" ? "حفظ" : "Save"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
      </div>

      {data && data.meta.last_page > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          {lang === "ar" ? "الصفحة" : "Page"} {data.meta.current_page}{" "}
          {lang === "ar" ? "من" : "of"} {data.meta.last_page}
          <span>· {data.meta.total} {lang === "ar" ? "وظيفة" : "jobs"}</span>
        </div>
      )}
    </AppShell>
  );
}
