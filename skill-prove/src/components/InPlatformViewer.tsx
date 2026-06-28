import { useEffect, useRef, useState } from "react";
import { X, ExternalLink, Github, Globe, Play, FileText, RefreshCw, ArrowLeft, ArrowRight, GitBranch, Star as StarIcon, GitFork, Code2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export type ViewerLink = {
  kind: "github" | "live" | "video" | "file";
  label: string;
  url: string;
};

const iconFor = (k: ViewerLink["kind"]) =>
  k === "github" ? Github : k === "live" ? Globe : k === "video" ? Play : FileText;

export function InPlatformViewer({
  link,
  context,
  onClose,
}: {
  link: ViewerLink | null;
  context?: { candidate?: string; challenge?: string };
  onClose: () => void;
}) {
  const { lang } = useI18n();
  const [width, setWidth] = useState(720);
  const draggingRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const w = window.innerWidth - e.clientX;
      setWidth(Math.max(380, Math.min(window.innerWidth - 120, w)));
    };
    const onUp = () => { draggingRef.current = false; document.body.style.userSelect = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!link) return null;
  const Icon = iconFor(link.kind);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <aside
        className="fixed inset-y-0 end-0 z-50 flex flex-col border-s bg-card shadow-2xl animate-in slide-in-from-right"
        style={{ width }}
      >
        {/* drag handle */}
        <div
          onMouseDown={() => { draggingRef.current = true; document.body.style.userSelect = "none"; }}
          className="absolute inset-y-0 start-0 z-10 flex w-1.5 cursor-col-resize items-center justify-center hover:bg-primary/40"
          title={lang === "ar" ? "اسحب لتغيير الحجم" : "Drag to resize"}
        >
          <span className="h-10 w-1 rounded-full bg-border" />
        </div>

        {/* header */}
        <header className="flex items-center gap-2 border-b bg-gradient-soft p-3 ps-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">
              {context?.challenge ?? link.label}
            </div>
            {context?.candidate && (
              <div className="truncate text-[11px] text-muted-foreground">
                {lang === "ar" ? "بواسطة " : "by "}{context.candidate}
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href={link.url} target="_blank" rel="noreferrer" title={lang === "ar" ? "فتح خارجياً" : "Open externally"}>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </header>

        {/* fake browser bar */}
        <div className="flex items-center gap-1 border-b px-3 py-2">
          <Button variant="ghost" size="icon" className="h-7 w-7"><ArrowLeft className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7"><ArrowRight className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-3.5 w-3.5" /></Button>
          <div className="ms-1 flex-1 truncate rounded-md border bg-muted/50 px-2 py-1 font-mono text-[11px] text-muted-foreground">
            {link.url}
          </div>
        </div>

        {/* content */}
        <div className="flex-1 overflow-auto">
          {link.kind === "github" ? (
            <GithubMock link={link} />
          ) : (
            <iframe
              src={link.url}
              className="h-full w-full border-0"
              title={link.label}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>
      </aside>
    </>
  );
}

function GithubMock({ link }: { link: ViewerLink }) {
  const { lang } = useI18n();
  const repo = link.label.replace(/^github\.com\//, "");
  const files = [
    { name: "src", type: "dir", msg: "feat: add auth controller", t: "2d ago" },
    { name: "tests", type: "dir", msg: "test: cover edge cases", t: "3d ago" },
    { name: "README.md", type: "file", msg: "docs: usage and quickstart", t: "5d ago" },
    { name: "package.json", type: "file", msg: "chore: bump deps", t: "1w ago" },
    { name: ".github/workflows", type: "dir", msg: "ci: add coverage report", t: "1w ago" },
    { name: "Dockerfile", type: "file", msg: "build: multi-stage image", t: "2w ago" },
  ];
  return (
    <div className="bg-background p-5">
      <div className="flex flex-wrap items-center gap-3">
        <Github className="h-6 w-6" />
        <h2 className="text-lg font-bold">{repo}</h2>
        <Badge variant="outline" className="text-[10px]">Public</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {lang === "ar"
          ? "مستودع المرشّح المُسلَّم للتقييم. تصفّح الكود، الاختبارات، والتوثيق دون مغادرة المنصة."
          : "Candidate's submitted repository. Browse code, tests, and docs without leaving the platform."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="gap-1"><StarIcon className="h-3 w-3" /> 42</Badge>
        <Badge variant="outline" className="gap-1"><GitFork className="h-3 w-3" /> 8</Badge>
        <Badge variant="outline" className="gap-1"><GitBranch className="h-3 w-3" /> main</Badge>
        <Badge variant="outline" className="gap-1"><Code2 className="h-3 w-3" /> TypeScript 84%</Badge>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border">
        <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2 text-xs">
          <GitBranch className="h-3.5 w-3.5 text-primary" />
          <span className="font-semibold">main</span>
          <span className="ms-3 text-muted-foreground">128 commits</span>
        </div>
        <ul className="divide-y">
          {files.map((f) => (
            <li key={f.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/40">
              {f.type === "dir"
                ? <FolderOpen className="h-4 w-4 text-primary" />
                : <FileText className="h-4 w-4 text-muted-foreground" />}
              <div className="flex items-center gap-3 min-w-0">
                <span className={`truncate ${f.type === "dir" ? "font-medium" : ""}`}>{f.name}</span>
                <span className="truncate text-xs text-muted-foreground">{f.msg}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">{f.t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border">
        <div className="border-b px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">README.md</div>
        <div className="space-y-3 p-5 text-sm leading-relaxed">
          <h3 className="text-base font-bold"># {repo.split("/").pop()}</h3>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "خدمة مصادقة عالية الأداء مبنية بـ Node.js، تدعم JWT، تحديد المعدّل، وتسجيل بنيوي."
              : "A high-performance auth service built with Node.js. Supports JWT, rate limiting, and structured logging."}
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs">
{`$ pnpm install
$ pnpm dev
$ pnpm test  # coverage 84%`}
          </pre>
        </div>
      </div>
    </div>
  );
}
