import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { AuthShell } from "@/routes/login";

export const Route = createFileRoute("/register/company")({
  head: () => ({ meta: [{ title: "Register as Company — SkillProof" }] }),
  component: RegCompany,
});

function RegCompany() {
  const { t, lang } = useI18n();
  return (
    <AuthShell>
      <Card className="shadow-elegant">
        <CardContent className="p-8">
          <h1 className="text-2xl font-extrabold">{t("signUp")} {t("asCompany")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang==="ar"?"اعثر على المواهب المناسبة بسرعة.":"Find the right talent fast."}
          </p>
          <form className="mt-6 space-y-4" onSubmit={(e)=>{e.preventDefault(); window.location.href="/app/company";}}>
            <div className="space-y-1.5">
              <Label>{t("companyName")}</Label>
              <Input placeholder={lang==="ar"?"اسم شركتك":"Your company name"} required />
            </div>
            <div className="space-y-1.5">
              <Label>{t("email")}</Label>
              <Input type="email" placeholder="hr@company.com" required />
            </div>
            <div className="space-y-1.5">
              <Label>{t("password")}</Label>
              <Input type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-elegant">
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
