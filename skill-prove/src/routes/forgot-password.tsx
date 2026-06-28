import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { AuthShell } from "@/routes/login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — SkillProof" }] }),
  component: Forgot,
});

function Forgot() {
  const { t, lang } = useI18n();
  return (
    <AuthShell>
      <Card className="shadow-elegant">
        <CardContent className="p-8">
          <h1 className="text-2xl font-extrabold">{t("forgotPassword")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang==="ar"?"أدخل بريدك وسنرسل لك رابط الاستعادة.":"Enter your email and we'll send a reset link."}
          </p>
          <form className="mt-6 space-y-4" onSubmit={(e)=>{e.preventDefault();}}>
            <div className="space-y-1.5">
              <Label>{t("email")}</Label>
              <Input type="email" placeholder="you@email.com" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-elegant">
              {t("resetLink")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-semibold text-primary hover:underline">{t("signIn")}</Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
