import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import { companyJobs, companyChallenges, leaderboard, submissions, rubricSkills } from "@/lib/mock-data";
import { Users, Briefcase, Sparkles, TrendingUp, ArrowRight, Plus, CheckCircle2, Clock, XCircle, Bot } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/app/company/")({
  head: () => ({ meta: [{ title: "Company Dashboard — SkillProof" }] }),
  component: CompanyDash,
});

const applicants = [
  { m: "Jan", v: 24 },{ m: "Feb", v: 33 },{ m: "Mar", v: 42 },{ m: "Apr", v: 58 },
  { m: "May", v: 71 },{ m: "Jun", v: 84 },
];
const hires = [
  { m: "Jan", v: 3 },{ m: "Feb", v: 5 },{ m: "Mar", v: 4 },{ m: "Apr", v: 7 },
  { m: "May", v: 9 },{ m: "Jun", v: 12 },
];

function CompanyDash() {
  const { t, lang } = useI18n();
  return (
    <AppShell>
      <PageHeader
        title={t("companyHub")}
        subtitle={lang==="ar"?"اعثر على المواهب المناسبة بأدلّة عمل حقيقية":"Find the right talent with real proof"}
        action={
          <div className="flex gap-2">
            <Link to="/app/company/create-challenge"><Button className="gap-2 bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4"/>{t("createChallenge")}</Button></Link>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {l:lang==="ar"?"مرشحون مطابقون":"Matched candidates",v:"312",i:Users},
          {l:t("postedJobs"),v:companyJobs.length,i:Briefcase},
          {l:t("postedChallenges"),v:companyChallenges.length,i:Sparkles},
          {l:lang==="ar"?"معدّل التوظيف":"Hire rate",v:"34%",i:TrendingUp},
        ].map((s,i)=>(
          <Card key={i}><CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="mt-1 text-3xl font-extrabold">{s.v}</div></div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><s.i className="h-5 w-5"/></div>
            </div>
          </CardContent></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-bold">{lang==="ar"?"المتقدّمون - 6 أشهر":"Applicants (6mo)"}</h3>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicants}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12}/>
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12}/>
                  <Tooltip contentStyle={{background:"var(--color-popover)",border:"1px solid var(--color-border)",borderRadius:8}}/>
                  <Bar dataKey="v" fill="var(--color-primary)" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-bold">{lang==="ar"?"التوظيف الناجح":"Successful hires"}</h3>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hires}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)"/>
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12}/>
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12}/>
                  <Tooltip contentStyle={{background:"var(--color-popover)",border:"1px solid var(--color-border)",borderRadius:8}}/>
                  <Line type="monotone" dataKey="v" stroke="var(--color-primary-glow)" strokeWidth={3} dot={{r:4,fill:"var(--color-primary)"}}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">{t("candidateRecommendations")}</h3>
            <Link to="/app/company/evaluate"><Button variant="ghost" size="sm">{t("viewAll")}</Button></Link>
          </div>
          <div className="mt-4 space-y-3">
            {leaderboard.slice(0,5).map(u=>(
              <Link to="/app/company/evaluate" key={u.rank} className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted/50">
                <Avatar><AvatarImage src={u.avatar}/><AvatarFallback>{u.name[lang].charAt(0)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{u.name[lang]}</div>
                  <div className="text-xs text-muted-foreground">React · TypeScript · Node</div>
                </div>
                <Badge className="bg-gradient-primary text-primary-foreground">{90 + u.rank}%</Badge>
                <ArrowRight className={`h-4 w-4 text-muted-foreground ${lang==="ar"?"rotate-180":""}`}/>
              </Link>
            ))}
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h3 className="text-base font-bold">{t("postedJobs")}</h3>
          <Table className="mt-3">
            <TableHeader>
              <TableRow>
                <TableHead>{lang==="ar"?"الوظيفة":"Job"}</TableHead>
                <TableHead>{lang==="ar"?"المتقدّمون":"Applicants"}</TableHead>
                <TableHead>{lang==="ar"?"الحالة":"Status"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyJobs.map((j,i)=>(
                <TableRow key={i}>
                  <TableCell className="font-medium">{j.title}</TableCell>
                  <TableCell>{j.applicants}</TableCell>
                  <TableCell><Badge variant={j.status==="Open"?"default":j.status==="Closed"?"secondary":"outline"}>{j.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      </div>

      <Card className="mt-6"><CardContent className="p-6">
        <h3 className="text-base font-bold">{t("yourChallengesAndSubs")}</h3>
        <div className="mt-4 space-y-4">
          {companyChallenges.map((c, i) => {
            // pick up to 3 submissions per challenge from the shared mock pool
            const subs = submissions.slice(i, i + 3);
            return (
              <div key={i} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div className="font-semibold">{c.title}</div>
                    <Badge variant={c.status === "Active" ? "default" : "secondary"}>{c.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("totalSubmissions")}: <span className="font-bold text-foreground">{c.submissions}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {rubricSkills.slice(0, 4).map((r) => (
                    <Badge key={r.key} variant="outline" className="text-[10px]">{r[lang]}</Badge>
                  ))}
                </div>

                <div className="mt-4 grid gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("solvedBy")}</div>
                  {subs.map((s) => {
                    const StatusIcon = s.status === "accepted" ? CheckCircle2
                      : s.status === "rejected" ? XCircle
                      : s.status === "pending_ai" ? Bot : Clock;
                    const tone = s.status === "accepted" ? "text-success"
                      : s.status === "rejected" ? "text-destructive"
                      : "text-warning";
                    const vals = Object.values(s.scores).filter((x): x is number => typeof x === "number");
                    const sa = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
                    return (
                      <Link
                        to="/app/company/evaluate"
                        key={s.id}
                        className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-2.5 hover:bg-muted/40"
                      >
                        <Avatar className="h-8 w-8"><AvatarImage src={s.candidate.avatar} /><AvatarFallback>?</AvatarFallback></Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold">{s.candidate.name[lang]}</div>
                          <div className="text-[11px] text-muted-foreground">{s.submittedAt} · {s.links.length} {lang==="ar"?"مرفق":"files"}</div>
                        </div>
                        <Badge variant="outline" className="font-bold">{sa}/10</Badge>
                        <span className={`flex items-center gap-1 text-xs font-medium ${tone}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {t(s.status === "accepted" ? "accepted" : s.status === "rejected" ? "rejected" : "inReview")}
                        </span>
                        <ArrowRight className={`h-4 w-4 text-muted-foreground ${lang==="ar"?"rotate-180":""}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent></Card>
    </AppShell>
  );
}
