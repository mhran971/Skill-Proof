import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { AuthShell } from "@/routes/login";
import { useAuth } from "@/lib/auth";
import { registerCompanyApi } from "@/lib/api/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register/company")({
  head: () => ({ meta: [{ title: "Register as Company — SkillProof" }] }),
  component: RegCompany,
});

function RegCompany() {
  const { t, lang } = useI18n();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error(lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const data = await registerCompanyApi({
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
        company_name: companyName,
      });
      setAuth(data.user, data.token);
      navigate({ to: "/app/company" });
    } catch (err: any) {
      toast.error(err.message ?? (lang === "ar" ? "خطأ في إنشاء الحساب" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <Card className="shadow-elegant">
        <CardContent className="p-8">
          <h1 className="text-2xl font-extrabold">
            {t("signUp")} {t("asCompany")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "ar" ? "اعثر على المواهب المناسبة بسرعة." : "Find the right talent fast."}
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label>{t("fullName")}</Label>
              <Input
                placeholder={lang === "ar" ? "اسمك الكامل" : "Your full name"}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("companyName")}</Label>
              <Input
                placeholder={lang === "ar" ? "اسم شركتك" : "Your company name"}
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("email")}</Label>
              <Input
                type="email"
                placeholder="hr@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("password")}</Label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{lang === "ar" ? "تأكيد كلمة المرور" : "Confirm password"}</Label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary text-primary-foreground shadow-elegant"
            >
              {loading
                ? lang === "ar" ? "جاري الإنشاء…" : "Creating account…"
                : t("signUp")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t("signIn")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
