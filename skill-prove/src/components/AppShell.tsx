import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  User,
  Video,
  Trophy,
  Briefcase,
  Award,
  GraduationCap,
  CheckSquare,
  Building2,
  Shield,
  Menu,
  X,
  Languages,
  Bot,
  Sparkles,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { useI18n, dict } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { logoutApi } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type Item = { to: string; icon: any; key: keyof typeof dict };

const candidateItems: Item[] = [
  { to: "/app/dashboard", icon: LayoutDashboard, key: "dashboard" },
  { to: "/app/profile", icon: User, key: "profile" },
  { to: "/app/videos", icon: Video, key: "videos" },
  { to: "/app/challenges", icon: Sparkles, key: "challenges" },
  { to: "/app/interview", icon: Bot, key: "interview" },
  { to: "/app/jobs", icon: Briefcase, key: "jobs" },
  { to: "/app/leaderboard", icon: Trophy, key: "leaderboard" },
  { to: "/app/internships", icon: GraduationCap, key: "internships" },
  { to: "/app/tasks", icon: CheckSquare, key: "tasks" },
];
const companyItems: Item[] = [
  { to: "/app/company", icon: Building2, key: "companyHub" },
  { to: "/app/company/talent", icon: User, key: "talent" },
  { to: "/app/company/create-challenge", icon: Sparkles, key: "createChallenge" },
  { to: "/app/company/evaluate", icon: Award, key: "evaluate" },
];
const adminItems: Item[] = [{ to: "/app/admin", icon: Shield, key: "admin" }];

export function AppShell({ children }: { children: ReactNode }) {
  const { t, lang, setLang, dir } = useI18n();
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // Token may already be invalid — proceed with client-side logout
    }
    clearAuth();
    navigate({ to: "/login" });
    toast.success(lang === "ar" ? "تم تسجيل الخروج" : "Signed out");
  };

  const displayName = user?.name ?? "";
  const displayTitle = user?.title ?? (lang === "ar" ? "مستخدم" : "User");
  const displayAvatar = user?.avatar ?? "";
  const userInitial = displayName.charAt(0) || "U";

  // Show company items for company role, candidate items otherwise
  const isCompany = user?.role === "company";
  const isAdmin = user?.role === "admin";
  const navItems = isCompany ? companyItems : candidateItems;

  const NavLink = ({ item }: { item: Item }) => {
    const active = pathname === item.to || (item.to !== "/app/dashboard" && pathname.startsWith(item.to));
    const Icon = item.icon;
    return (
      <Link
        to={item.to}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          active
            ? "bg-gradient-primary text-primary-foreground shadow-elegant"
            : "text-sidebar-foreground hover:bg-sidebar-accent"
        }`}
      >
        <Icon className="h-4.5 w-4.5 shrink-0" size={18} />
        <span className="truncate">{t(item.key)}</span>
      </Link>
    );
  };

  const SidebarContent = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" className="flex items-center gap-2 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <div className="text-base font-extrabold leading-none text-gradient">{t("appName")}</div>
          <div className="mt-1 text-[10px] text-muted-foreground">{t("tagline")}</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        <div>
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {isCompany ? t("companyHub") : t("dashboard")}
          </div>
          <div className="space-y-1">
            {navItems.map((i) => <NavLink key={i.to} item={i} />)}
          </div>
        </div>
        {isAdmin && (
          <div>
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t("admin")}
            </div>
            <div className="space-y-1">
              {adminItems.map((i) => <NavLink key={i.to} item={i} />)}
            </div>
          </div>
        )}
      </nav>

      <div className="rounded-xl border bg-gradient-soft p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={displayAvatar} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{displayName}</div>
            <div className="truncate text-xs text-muted-foreground">{displayTitle}</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition"
            title={t("logout")}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-background" dir={dir}>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-e bg-sidebar lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 start-0 w-72 bg-sidebar shadow-xl">
            <div className="flex items-center justify-between p-3">
              <span className="font-bold">{t("appName")}</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
          <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden flex-1 max-w-md md:block">
              <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3" />
              <Input
                placeholder={lang === "ar" ? "ابحث…" : "Search…"}
                className="ps-9"
              />
            </div>
            <div className="flex-1 md:hidden" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              {lang === "ar" ? "EN" : "ع"}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-glow" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={displayAvatar} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4 pb-24 lg:p-8 lg:pb-8">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card/95 backdrop-blur lg:hidden" dir={dir}>
          {[
            { to: "/app/dashboard", icon: LayoutDashboard, key: "home" as const },
            { to: "/app/challenges", icon: Sparkles, key: "challenges" as const },
            { to: "/app/jobs", icon: Briefcase, key: "jobs" as const },
            { to: "/app/profile", icon: Award, key: "passport" as const },
            { to: "/app/profile", icon: User, key: "profile" as const },
          ].map((it, i) => {
            const active = pathname === it.to;
            const Icon = it.icon;
            return (
              <Link
                key={i}
                to={it.to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t(it.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
