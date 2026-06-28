import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Bot,
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  Languages,
  Star,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { stats, stories } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillProof — Proof-of-Skill Hiring" },
      { name: "description", content: "Connect graduates with companies through practical challenges, video portfolios and AI-powered evaluation." },
      { property: "og:title", content: "SkillProof — Proof-of-Skill Hiring" },
      { property: "og:description", content: "Prove your skills. Hire with confidence." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const benefits = [
    { icon: ShieldCheck, title: t("benefit1Title"), desc: t("benefit1Desc") },
    { icon: Bot, title: t("benefit2Title"), desc: t("benefit2Desc") },
    { icon: Award, title: t("benefit3Title"), desc: t("benefit3Desc") },
    { icon: Zap, title: t("benefit4Title"), desc: t("benefit4Desc") },
  ];

  const steps = [
    { title: t("step1"), desc: t("step1d") },
    { title: t("step2"), desc: t("step2d") },
    { title: t("step3"), desc: t("step3d") },
    { title: t("step4"), desc: t("step4d") },
  ];

  return (
    <div className="min-h-dvh bg-background">
      {/* Nav */}
      <header
        className={`sticky top-0 z-50 transition ${
          scrolled ? "border-b bg-background/80 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold text-gradient">{t("appName")}</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#benefits" className="hover:text-primary">{t("benefits")}</a>
            <a href="#how" className="hover:text-primary">{t("howItWorks")}</a>
            <a href="#stories" className="hover:text-primary">{t("successStories")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="gap-1.5"
            >
              <Languages className="h-4 w-4" />
              {lang === "ar" ? "EN" : "ع"}
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm">{t("signIn")}</Button>
            </Link>
            <Link to="/register/candidate">
              <Button size="sm" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
                {t("getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -top-32 end-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="absolute -bottom-32 start-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t("tagline")}
              </Badge>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                <span className="text-gradient">{t("heroTitle")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                {t("heroSub")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register/candidate">
                  <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
                    {t("getStarted")}
                    <ArrowRight className={`h-4 w-4 ${lang === "ar" ? "rotate-180" : ""}`} />
                  </Button>
                </Link>
                <Link to="/register/company">
                  <Button size="lg" variant="outline">
                    {t("forCompanies")}
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> ISO Verified</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> AI-Powered</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> GDPR Compliant</div>
              </div>
            </div>

            {/* Hero preview card */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
              <Card className="overflow-hidden shadow-elegant">
                <div className="bg-gradient-primary p-5 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs opacity-80">{t("skillPassport")}</div>
                      <div className="mt-1 text-xl font-bold">Layla A.</div>
                    </div>
                    <Badge className="bg-white/20 text-white hover:bg-white/30">Top 3%</Badge>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    {[{l: t("readiness"), v: 86},{l: t("reputation"), v: "4.8K"},{l: "Skills", v: 24}].map((s,i)=>(
                      <div key={i} className="rounded-lg bg-white/15 p-3 backdrop-blur">
                        <div className="text-lg font-extrabold">{s.v}</div>
                        <div className="text-[10px] opacity-90">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  {[
                    { name: "React", level: 92 },
                    { name: "TypeScript", level: 84 },
                    { name: "System Design", level: 78 },
                  ].map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs font-medium">
                        <span>{s.name}</span>
                        <span className="text-muted-foreground">{s.level}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-gradient md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("benefits")}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Card key={i} className="group border-border/60 transition hover:-translate-y-1 hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("howItWorks")}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="relative rounded-2xl border bg-card p-6 shadow-sm">
                <div className="absolute -top-4 start-6 grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow">
                  {i + 1}
                </div>
                <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section id="stories" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("successStories")}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <Card key={i} className="border-border/60">
              <CardContent className="p-6">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{s.quote[lang]}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar><AvatarImage src={s.avatar} /><AvatarFallback>{s.name[lang].charAt(0)}</AvatarFallback></Avatar>
                  <div>
                    <div className="text-sm font-semibold">{s.name[lang]}</div>
                    <div className="text-xs text-muted-foreground">{s.role[lang]}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <div className="absolute -top-20 end-[-5%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <h2 className="text-3xl font-extrabold md:text-4xl">{t("heroTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 md:text-base">{t("heroSub")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/register/candidate"><Button size="lg" variant="secondary">{t("getStarted")}</Button></Link>
            <Link to="/register/company"><Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">{t("forCompanies")}</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary"><Sparkles className="h-5 w-5 text-primary-foreground" /></div>
              <span className="font-extrabold text-gradient">{t("appName")}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("tagline")}</p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <a href="#" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-primary"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="hover:text-primary"><Github className="h-4 w-4" /></a>
            </div>
          </div>
          {[
            { h: lang==="ar"?"المنتج":"Product", l: ["Challenges","Jobs","Leaderboard","Internships"] },
            { h: lang==="ar"?"الشركة":"Company", l: ["About","Careers","Press","Contact"] },
            { h: lang==="ar"?"قانوني":"Legal", l: ["Privacy","Terms","Security","Cookies"] },
          ].map((col,i)=>(
            <div key={i}>
              <div className="text-sm font-bold">{col.h}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.l.map(x => <li key={x}><a href="#" className="hover:text-primary">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground lg:px-8">
            <span>© 2026 {t("appName")}. {t("footerRights")}.</span>
            <span>Made with care.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
