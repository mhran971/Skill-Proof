import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { api } from "@/lib/api/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — SkillProof" }] }),
  component: Login,
});

function Login() {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post<{ token: string; user: any }>("/auth/login", formData);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(lang === "ar" ? "تم تسجيل الدخول بنجاح" : "Logged in successfully");

      if (data.user.role === "company") {
        navigate({ to: "/app/company" });
      } else {
        navigate({ to: "/app/dashboard" });
      }
    } catch (error: any) {
      toast.error(error.message || (lang === "ar" ? "خطأ في تسجيل الدخول" : "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <Card className="shadow-elegant">
        <CardContent className="p-8">
          <h1 className="text-2xl font-extrabold">{t("signIn")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{lang==="ar"?"أهلاً بعودتك إلى سكِل بروف":"Welcome back to SkillProof"}</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">{t("forgotPassword")}</Link>
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-elegant" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("signIn")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link to="/register/candidate" className="font-semibold text-primary hover:underline">
              {t("signUp")} {t("asCandidate")}
            </Link>
            {" · "}
            <Link to="/register/company" className="font-semibold text-primary hover:underline">
              {t("asCompany")}
            </Link>
          </p>
        </CardContent>
      </Card>
      <Button variant="ghost" size="sm" className="mx-auto mt-4 gap-2" onClick={()=>setLang(lang==="ar"?"en":"ar")}>
        <Languages className="h-4 w-4"/>{lang==="ar"?"English":"العربية"}
      </Button>
    </AuthShell>
  );
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="relative min-h-dvh bg-gradient-soft">
      <div className="absolute -top-40 end-[-10%] h-[500px] w-[500px] rounded-full bg-primary-glow/30 blur-3xl" />
      <div className="absolute -bottom-40 start-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-4 py-10">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold text-gradient">{t("appName")}</span>
        </Link>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
