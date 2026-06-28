import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { microTasks, earningsByMonth, earningsTransactions } from "@/lib/mock-data";
import { Coins, Clock, Star, Wallet, ArrowDownToLine, TrendingUp } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/app/tasks")({
  head: () => ({ meta: [{ title: "Micro-Tasks & Earnings — SkillProof" }] }),
  component: Tasks,
});

function Tasks() {
  const { t, lang } = useI18n();
  const all = [...microTasks, ...microTasks];
  const total = earningsByMonth.reduce((a, b) => a + b.v, 0);
  const thisMonth = earningsByMonth[earningsByMonth.length - 1].v;

  return (
    <AppShell>
      <PageHeader
        title={t("tasks")}
        subtitle={lang==="ar"?"مهام صغيرة مدفوعة لبناء سجلّك وأرباحك":"Small paid tasks to grow your record and earnings"}
        action={<Button className="gap-2 bg-gradient-primary text-primary-foreground"><ArrowDownToLine className="h-4 w-4" />{t("withdraw")}</Button>}
      />

      <Tabs defaultValue="market">
        <TabsList>
          <TabsTrigger value="market">{lang==="ar"?"السوق":"Marketplace"}</TabsTrigger>
          <TabsTrigger value="earnings">{t("earnings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="mt-4 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { l: t("totalEarnings"), v: `${total.toLocaleString()} SAR`, i: Wallet },
              { l: lang==="ar"?"المهام المُنجزة":"Tasks completed", v: "38", i: Coins },
              { l: lang==="ar"?"التقييم":"Rating", v: "4.9 / 5", i: Star },
            ].map((s, i) => (
              <Card key={i}><CardContent className="flex items-center gap-3 p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><s.i className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="text-xl font-extrabold">{s.v}</div></div>
              </CardContent></Card>
            ))}
          </div>

          <Card><CardContent className="p-0">
            <div className="divide-y">
              {all.map((tt, i) => (
                <div key={i} className="flex flex-wrap items-center gap-4 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Coins className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{tt.title[lang]}</div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{tt.time}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" />{tt.rating}</span>
                    </div>
                  </div>
                  <div className="text-end"><div className="text-lg font-extrabold text-gradient">{tt.payout} SAR</div></div>
                  <Button size="sm" className="bg-gradient-primary text-primary-foreground">{t("start")}</Button>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="earnings" className="mt-4 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Wallet className="h-4 w-4" />{t("totalEarnings")}</div>
              <div className="mt-1 text-3xl font-extrabold text-gradient">{total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">SAR · {lang==="ar"?"آخر 6 أشهر":"last 6 months"}</div>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><TrendingUp className="h-4 w-4" />{t("thisMonth")}</div>
              <div className="mt-1 text-3xl font-extrabold">{thisMonth.toLocaleString()}</div>
              <Badge variant="outline" className="mt-1 text-success">+27%</Badge>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Coins className="h-4 w-4" />{t("pending")}</div>
              <div className="mt-1 text-3xl font-extrabold text-warning">25</div>
              <div className="text-xs text-muted-foreground">SAR</div>
            </CardContent></Card>
          </div>

          <Card><CardContent className="p-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {lang==="ar"?"الأرباح الشهرية":"Monthly earnings"}
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsByMonth} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10 }} />
                  <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#earn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-0">
            <div className="border-b p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("transactions")}</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>{lang==="ar"?"المهمة":"Task"}</TableHead>
                  <TableHead>{lang==="ar"?"التاريخ":"Date"}</TableHead>
                  <TableHead className="text-end">{lang==="ar"?"المبلغ":"Amount"}</TableHead>
                  <TableHead>{lang==="ar"?"الحالة":"Status"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earningsTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs font-mono text-muted-foreground">{tx.id}</TableCell>
                    <TableCell className="font-medium">{tx.task[lang]}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="text-end font-bold">{tx.amount} SAR</TableCell>
                    <TableCell>
                      {tx.status === "paid"
                        ? <Badge className="bg-success/15 text-success">{t("paid")}</Badge>
                        : <Badge className="bg-warning/15 text-warning-foreground">{t("pending")}</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
