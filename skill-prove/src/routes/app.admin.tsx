import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useI18n } from "@/lib/i18n";
import { adminUsers, fraudAlerts } from "@/lib/mock-data";
import { Users, Building2, Sparkles, AlertTriangle, Search, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin — SkillProof" }] }),
  component: Admin,
});

const growth = [
  { m: "Jan", u: 1200 },{ m: "Feb", u: 1900 },{ m: "Mar", u: 2600 },{ m: "Apr", u: 3400 },
  { m: "May", u: 4400 },{ m: "Jun", u: 5800 },
];
const pieData = [
  { name: "Candidates", value: 4200, color: "var(--color-primary)" },
  { name: "Companies", value: 820, color: "var(--color-primary-glow)" },
  { name: "Admins", value: 24, color: "var(--color-warning)" },
];

function Admin() {
  const { t, lang } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("admin")} subtitle={lang==="ar"?"إدارة المنصة والإشراف على الجودة":"Platform management and quality oversight"} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {l:lang==="ar"?"إجمالي المستخدمين":"Total users",v:"5,044",i:Users},
          {l:lang==="ar"?"الشركات":"Companies",v:"820",i:Building2},
          {l:lang==="ar"?"التحديات النشطة":"Active challenges",v:"312",i:Sparkles},
          {l:lang==="ar"?"تنبيهات الاحتيال":"Fraud alerts",v:fraudAlerts.length,i:AlertTriangle},
        ].map((s,i)=>(
          <Card key={i}><CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="mt-1 text-3xl font-extrabold">{s.v}</div></div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><s.i className="h-5 w-5"/></div>
            </div>
          </CardContent></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <h3 className="text-base font-bold">{lang==="ar"?"نمو المستخدمين":"User growth"}</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growth}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)"/>
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12}/>
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12}/>
                <Tooltip contentStyle={{background:"var(--color-popover)",border:"1px solid var(--color-border)",borderRadius:8}}/>
                <Area type="monotone" dataKey="u" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <h3 className="text-base font-bold">{lang==="ar"?"تركيبة المستخدمين":"User mix"}</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {pieData.map((d,i)=>(<Cell key={i} fill={d.color}/>))}
                </Pie>
                <Legend wrapperStyle={{fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold">{t("userMgmt")}</h3>
            <div className="relative w-56">
              <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3"/>
              <Input placeholder={lang==="ar"?"ابحث…":"Search…"} className="h-9 ps-9"/>
            </div>
          </div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>{lang==="ar"?"الاسم":"Name"}</TableHead>
                <TableHead>{lang==="ar"?"الدور":"Role"}</TableHead>
                <TableHead>{lang==="ar"?"الحالة":"Status"}</TableHead>
                <TableHead>{lang==="ar"?"تاريخ":"Joined"}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((u,i)=>(
                <TableRow key={i}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Badge variant={u.status==="Active"||u.status==="Verified"?"default":u.status==="Pending"?"outline":"destructive"}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{u.joined}</TableCell>
                  <TableCell><Button size="sm" variant="ghost">···</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <div className="flex items-center gap-2 text-destructive"><ShieldAlert className="h-5 w-5"/><h3 className="text-base font-bold text-foreground">{t("fraud")}</h3></div>
          <div className="mt-4 space-y-3">
            {fraudAlerts.map((f,i)=>(
              <div key={i} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{f.type}</div>
                  <Badge variant={f.severity==="high"?"destructive":"outline"} className="text-[10px]">{f.severity}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{f.user} · {f.time}</div>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </AppShell>
  );
}
