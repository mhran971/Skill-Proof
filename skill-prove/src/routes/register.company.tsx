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

export const Route = createFileRoute("/register/company")({
  head: () => ({ meta: [{ title: "Register as Company — SkillProof" }] }),
  component: RegCompany,
});

function RegCompany() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", password_confirmation: "", company_name: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post<{ token: string; user: any }>("/auth/register/company", formData);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(lang === "ar" ? "تم إنشاء حساب الشركة بنجاح" : "Company account created successfully");
      navigate({ to: "/app/company" });
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
          <h1 className="text-2xl font-extrabold">{t("signUp")} {t("asCompany")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang==="ar"?"اعثر على المواهب المناسبة بسرعة.":"Find the right talent fast."}
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label>{t("companyName")}</Label>
              <Input
                placeholder={lang==="ar"?"اسم شركتك":"Your company name"}
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("email")}</Label>
              <Input
                type="email"
                placeholder="hr@company.com"
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
