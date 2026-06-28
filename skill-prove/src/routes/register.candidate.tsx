import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { AuthShell } from "@/routes/login";
import { useState } from "react";
import { api } from "@/lib/api/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/register/candidate")({
  head: () => ({ meta: [{ title: "Register as Candidate — SkillProof" }] }),
  component: RegCandidate,
});

function RegCandidate() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", password_confirmation: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post<{ token: string; user: any }>("/auth/register/candidate", formData);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(lang === "ar" ? "تم إنشاء الحساب بنجاح" : "Account created successfully");
      navigate({ to: "/app/dashboard" });
    } catch (error: any) {
      toast.error(error.message || (lang === "ar" ? "فشل إنشاء الحساب" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <Card className="shadow-elegant">
        <CardContent className="p-8">
          <h1 className="text-2xl font-extrabold">{t("signUp")} {t("asCandidate")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang==="ar"?"ابدأ ببناء جواز مهاراتك خلال دقائق.":"Start building your Skill Passport in minutes."}
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label>{t("fullName")}</Label>
              <Input
                placeholder={lang==="ar"?"اسمك الكامل":"Your full name"}
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("email")}</Label>
              <Input
                type="email"
                placeholder="you@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("password")}</Label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value, password_confirmation: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-elegant" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("signUp")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">{t("signIn")}</Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
