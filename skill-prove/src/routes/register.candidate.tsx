import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { AuthShell } from "@/routes/login";
import { useAuth } from "@/lib/auth";
import { registerCandidateApi } from "@/lib/api/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register/candidate")({
  head: () => ({ meta: [{ title: "Register as Candidate — SkillProof" }] }),
  component: RegCandidate,
});

function RegCandidate() {
  const { t, lang } = useI18n();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
      const data = await registerCandidateApi({
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      setAuth(data.user, data.token);
      navigate({ to: "/app/dashboard" });
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
            {t("signUp")} {t("asCandidate")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "ar"
              ? "ابدأ ببناء جواز مهاراتك خلال دقائق."
              : "Start building your Skill Passport in minutes."}
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
              <Label>{t("email")}</Label>
              <Input
                type="email"
                placeholder="you@email.com"
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
