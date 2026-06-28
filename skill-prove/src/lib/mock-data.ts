export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export const candidate = {
  name: { ar: "ليلى عبدالله", en: "Layla Abdullah" },
  title: { ar: "مطوّرة Full-Stack", en: "Full-Stack Developer" },
  email: "layla@skillproof.app",
  location: { ar: "الرياض، السعودية", en: "Riyadh, Saudi Arabia" },
  avatar: "https://i.pravatar.cc/200?img=47",
  profileCompletion: 78,
  reputation: 4820,
  readiness: 86,
};

export const skills: { name: string; level: SkillLevel; score: number }[] = [
  { name: "React", level: "Expert", score: 92 },
  { name: "TypeScript", level: "Advanced", score: 84 },
  { name: "Node.js", level: "Advanced", score: 80 },
  { name: "UI/UX", level: "Intermediate", score: 68 },
  { name: "PostgreSQL", level: "Advanced", score: 75 },
  { name: "Communication", level: "Advanced", score: 88 },
];

export const recentActivity = [
  { ar: "أكملتِ تحدي 'بناء API بمعدّل أداء عالٍ'", en: "Completed challenge 'High-Performance API'", time: "2h" },
  { ar: "حصلتِ على وسام Top 5%", en: "Earned Top 5% badge", time: "1d" },
  { ar: "تقديمكِ لشركة Nova تم استلامه", en: "Application to Nova received", time: "2d" },
  { ar: "ملخص AI لمقابلتكِ التجريبية جاهز", en: "AI mock-interview summary ready", time: "3d" },
];

export const recommendedChallenges = [
  { title: { ar: "تحدي تصميم نظام", en: "System Design Sprint" }, category: "Backend", duration: "3h", difficulty: "Advanced", reward: 250 },
  { title: { ar: "واجهة لوحة تحكم تفاعلية", en: "Interactive Dashboard UI" }, category: "Frontend", duration: "2h", difficulty: "Intermediate", reward: 180 },
  { title: { ar: "نموذج تنبؤ بالعملاء", en: "Customer Churn Model" }, category: "Data", duration: "4h", difficulty: "Advanced", reward: 320 },
  { title: { ar: "إعادة هيكلة كود قديم", en: "Refactor Legacy Code" }, category: "Backend", duration: "90m", difficulty: "Intermediate", reward: 140 },
];

export const recommendedJobs = [
  { title: { ar: "مهندس Frontend رئيسي", en: "Senior Frontend Engineer" }, company: "Nova Labs", location: "Remote", salary: "18-24k", match: 96 },
  { title: { ar: "مطوّر Full-Stack", en: "Full-Stack Developer" }, company: "Mirai", location: "Riyadh", salary: "14-20k", match: 91 },
  { title: { ar: "مهندس React Native", en: "React Native Engineer" }, company: "Beacon", location: "Hybrid", salary: "16-22k", match: 88 },
];

export const videos = [
  { id: "v1", title: { ar: "شرح مشروع التجارة الإلكترونية", en: "E-commerce Project Walkthrough" }, duration: "4:12", views: 320, thumb: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600" },
  { id: "v2", title: { ar: "تحدي خوارزميات", en: "Algorithms Challenge" }, duration: "6:30", views: 410, thumb: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" },
  { id: "v3", title: { ar: "تصميم واجهة لوحة تحكم", en: "Dashboard UI Design" }, duration: "3:45", views: 188, thumb: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600" },
  { id: "v4", title: { ar: "بناء API كامل", en: "Building a Full API" }, duration: "7:55", views: 522, thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600" },
];

export const internships = [
  { title: { ar: "تدريب هندسة بيانات", en: "Data Engineering Internship" }, company: "Atlas", duration: "12 weeks", progress: 42 },
  { title: { ar: "تدريب تطوير ويب", en: "Web Dev Internship" }, company: "Nova Labs", duration: "8 weeks", progress: 12 },
  { title: { ar: "تدريب تسويق منتجات", en: "Product Marketing Internship" }, company: "Mirai", duration: "10 weeks", progress: 0 },
];

export const microTasks = [
  { title: { ar: "ترجمة نص تقني", en: "Translate technical doc" }, payout: 25, time: "30m", rating: 4.8 },
  { title: { ar: "مراجعة كود Pull Request", en: "Review a Pull Request" }, payout: 40, time: "1h", rating: 4.9 },
  { title: { ar: "تصميم أيقونات SVG", en: "Design SVG icons" }, payout: 60, time: "2h", rating: 4.7 },
  { title: { ar: "اختبار تطبيق ويب", en: "QA test a web app" }, payout: 35, time: "45m", rating: 4.6 },
];

export const leaderboard = [
  { rank: 1, name: { ar: "خالد الزهراني", en: "Khalid Alzahrani" }, score: 9820, badge: "Diamond", avatar: "https://i.pravatar.cc/100?img=12" },
  { rank: 2, name: { ar: "نورا السبيعي", en: "Noura Alsubaie" }, score: 9510, badge: "Diamond", avatar: "https://i.pravatar.cc/100?img=45" },
  { rank: 3, name: { ar: "ليلى عبدالله", en: "Layla Abdullah" }, score: 9280, badge: "Platinum", avatar: "https://i.pravatar.cc/100?img=47" },
  { rank: 4, name: { ar: "أحمد المطيري", en: "Ahmed Almutairi" }, score: 8990, badge: "Platinum", avatar: "https://i.pravatar.cc/100?img=33" },
  { rank: 5, name: { ar: "سارة القحطاني", en: "Sara Alqahtani" }, score: 8740, badge: "Gold", avatar: "https://i.pravatar.cc/100?img=49" },
  { rank: 6, name: { ar: "محمد الغامدي", en: "Mohammed Alghamdi" }, score: 8420, badge: "Gold", avatar: "https://i.pravatar.cc/100?img=15" },
  { rank: 7, name: { ar: "ريم الدوسري", en: "Reem Aldossari" }, score: 8210, badge: "Silver", avatar: "https://i.pravatar.cc/100?img=44" },
  { rank: 8, name: { ar: "فيصل العتيبي", en: "Faisal Alotaibi" }, score: 8050, badge: "Silver", avatar: "https://i.pravatar.cc/100?img=68" },
];

export const stats = [
  { value: "42K+", label: "statCandidates" as const },
  { value: "1.2K", label: "statCompanies" as const },
  { value: "8.5K", label: "statChallenges" as const },
  { value: "6.7K", label: "statHires" as const },
];

export const stories = [
  {
    name: { ar: "عمر السالم", en: "Omar Alsalem" },
    role: { ar: "مهندس Backend في Nova", en: "Backend Engineer at Nova" },
    quote: {
      ar: "حصلت على عرض عمل خلال أسبوعين فقط بعد إنجاز تحديين فقط. سكِل بروف غيّر مسيرتي.",
      en: "Got an offer within two weeks after just two challenges. SkillProof changed my career.",
    },
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: { ar: "هند الحربي", en: "Hind Alharbi" },
    role: { ar: "مديرة توظيف، Mirai", en: "Talent Lead, Mirai" },
    quote: {
      ar: "وفّرنا 70% من وقت الفرز بفضل تقييمات الذكاء الاصطناعي والمشاريع العملية.",
      en: "We cut screening time by 70% thanks to AI evaluation and real projects.",
    },
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: { ar: "بدر الشمري", en: "Bader Alshammari" },
    role: { ar: "خرّيج 2025", en: "2025 Graduate" },
    quote: {
      ar: "حتى بدون خبرة، أثبتت قدراتي عبر تحديات حقيقية ووظّفت بسرعة.",
      en: "With zero experience, I proved my skills with real challenges and got hired fast.",
    },
    avatar: "https://i.pravatar.cc/100?img=64",
  },
];

export const companyJobs = [
  { title: "Frontend Engineer", applicants: 84, status: "Open", posted: "3d" },
  { title: "Data Analyst", applicants: 52, status: "Open", posted: "1w" },
  { title: "Product Designer", applicants: 31, status: "Reviewing", posted: "2w" },
  { title: "DevOps Engineer", applicants: 19, status: "Closed", posted: "1mo" },
];

export const companyChallenges = [
  { title: "Build a checkout flow", submissions: 47, status: "Active" },
  { title: "Design system audit", submissions: 22, status: "Active" },
  { title: "SQL optimization quiz", submissions: 68, status: "Closed" },
];

export const adminUsers = [
  { name: "Layla Abdullah", role: "Candidate", status: "Active", joined: "2025-04-12" },
  { name: "Nova Labs", role: "Company", status: "Verified", joined: "2024-11-02" },
  { name: "Ahmed Almutairi", role: "Candidate", status: "Active", joined: "2025-06-21" },
  { name: "Mirai Inc.", role: "Company", status: "Pending", joined: "2026-01-15" },
  { name: "Sara Alqahtani", role: "Candidate", status: "Suspended", joined: "2025-09-04" },
];

export const fraudAlerts = [
  { type: "Duplicate submission", user: "User #4821", severity: "high", time: "2h" },
  { type: "Suspicious IP pattern", user: "User #1290", severity: "medium", time: "5h" },
  { type: "Fake company profile", user: "Acme XYZ", severity: "high", time: "1d" },
];

export const interviewQuestions = [
  { ar: "حدّثيني عن أصعب مشكلة تقنية واجهتها وكيف حللتها.", en: "Tell me about the hardest technical problem you've solved." },
  { ar: "كيف تصممين نظاماً قابلاً للتوسّع لخدمة مليون مستخدم؟", en: "How would you design a scalable system for one million users?" },
  { ar: "ما تجربتك في العمل ضمن فريق متعدد الثقافات؟", en: "Describe your experience working in cross-cultural teams." },
];

// ---------- Evaluation rubric (GradShow-style) ----------
export const rubricSkills = [
  { key: "code",     ar: "جودة الكود",        en: "Code quality" },
  { key: "problem",  ar: "حل المشكلات",       en: "Problem solving" },
  { key: "arch",     ar: "البنية المعمارية",  en: "Architecture" },
  { key: "testing",  ar: "الاختبار",          en: "Testing" },
  { key: "docs",     ar: "التوثيق",           en: "Documentation" },
  { key: "comm",     ar: "التواصل",           en: "Communication" },
  { key: "delivery", ar: "الالتزام بالتسليم", en: "Delivery & deadlines" },
  { key: "team",     ar: "العمل الجماعي",     en: "Teamwork" },
  { key: "present",  ar: "العرض التقديمي",    en: "Presentation" },
] as const;
export type RubricKey = (typeof rubricSkills)[number]["key"];

export type Submission = {
  id: string;
  candidate: { name: { ar: string; en: string }; avatar: string };
  company: { name: { ar: string; en: string }; logo: string };
  challenge: { ar: string; en: string };
  type: "regular" | "final";
  submittedAt: string;
  links: { kind: "github" | "live" | "video" | "file"; label: string; url: string }[];
  evaluatedSkills: RubricKey[];
  scores: Partial<Record<RubricKey, number>>;
  feedback?: { ar: string; en: string };
  reviewer?: { name: { ar: string; en: string }; role: { ar: string; en: string }; avatar: string };
  status: "pending_ai" | "ai_done" | "in_review" | "accepted" | "rejected";
  acceptedToShowcase?: boolean;
};

export const submissions: Submission[] = [
  {
    id: "sb-001",
    candidate: { name: { ar: "ليلى عبدالله", en: "Layla Abdullah" }, avatar: "https://i.pravatar.cc/100?img=47" },
    company: { name: { ar: "نوفا لابز", en: "Nova Labs" }, logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Nova&backgroundColor=4F46E5" },
    challenge: { ar: "بناء API بمعدّل أداء عالٍ", en: "High-Performance REST Auth API" },
    type: "final",
    submittedAt: "2026-06-12",
    links: [
      { kind: "github", label: "github.com/layla/auth-api", url: "https://github.com/facebook/react" },
      { kind: "video", label: "5:42 walkthrough", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { kind: "live", label: "auth.demo.app", url: "https://example.com" },
    ],
    evaluatedSkills: ["code", "arch", "testing", "docs", "delivery", "present"],
    scores: { code: 9, arch: 8.5, testing: 8, docs: 7.5, delivery: 9, present: 8.5 },
    feedback: {
      ar: "حل ممتاز مع بنية واضحة وتوثيق جيد. اختبارات الوحدة قوية.",
      en: "Excellent solution with clean architecture and solid docs. Strong unit tests.",
    },
    reviewer: { name: { ar: "هند الحربي", en: "Hind Alharbi" }, role: { ar: "مديرة هندسية", en: "Engineering Lead" }, avatar: "https://i.pravatar.cc/100?img=20" },
    status: "accepted",
    acceptedToShowcase: true,
  },
  {
    id: "sb-002",
    candidate: { name: { ar: "أحمد المطيري", en: "Ahmed Almutairi" }, avatar: "https://i.pravatar.cc/100?img=33" },
    company: { name: { ar: "ميراي", en: "Mirai" }, logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Mirai&backgroundColor=7C3AED" },
    challenge: { ar: "واجهة لوحة تحكم تفاعلية", en: "Interactive Dashboard UI" },
    type: "regular",
    submittedAt: "2026-06-14",
    links: [
      { kind: "github", label: "github.com/ahmed/dash-ui", url: "https://github.com/vercel/next.js" },
      { kind: "live", label: "dash.demo.app", url: "https://example.com" },
    ],
    evaluatedSkills: ["code", "problem", "comm", "present"],
    scores: { code: 7.5, problem: 8, comm: 8.5 },
    status: "in_review",
  },
  {
    id: "sb-003",
    candidate: { name: { ar: "نورا السبيعي", en: "Noura Alsubaie" }, avatar: "https://i.pravatar.cc/100?img=45" },
    company: { name: { ar: "أطلس", en: "Atlas" }, logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Atlas&backgroundColor=10B981" },
    challenge: { ar: "نموذج تنبؤ بالعملاء", en: "Customer Churn Model" },
    type: "final",
    submittedAt: "2026-06-15",
    links: [
      { kind: "github", label: "github.com/noura/churn", url: "https://github.com/scikit-learn/scikit-learn" },
      { kind: "video", label: "7:10 walkthrough", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    evaluatedSkills: ["code", "problem", "arch", "docs", "present"],
    scores: {},
    status: "pending_ai",
  },
  {
    id: "sb-004",
    candidate: { name: { ar: "خالد الزهراني", en: "Khalid Alzahrani" }, avatar: "https://i.pravatar.cc/100?img=12" },
    company: { name: { ar: "نوفا لابز", en: "Nova Labs" }, logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Nova&backgroundColor=4F46E5" },
    challenge: { ar: "إعادة هيكلة كود قديم", en: "Refactor Legacy Code" },
    type: "regular",
    submittedAt: "2026-06-10",
    links: [{ kind: "github", label: "github.com/khalid/refactor", url: "https://github.com/microsoft/TypeScript" }],
    evaluatedSkills: ["code", "arch", "testing", "delivery"],
    scores: { code: 9.5, arch: 9, testing: 8.5, delivery: 9 },
    feedback: { ar: "عمل استثنائي.", en: "Outstanding work." },
    reviewer: { name: { ar: "عمر السالم", en: "Omar Alsalem" }, role: { ar: "مهندس أول", en: "Senior Engineer" }, avatar: "https://i.pravatar.cc/100?img=11" },
    status: "accepted",
    acceptedToShowcase: true,
  },
  {
    id: "sb-005",
    candidate: { name: { ar: "سارة القحطاني", en: "Sara Alqahtani" }, avatar: "https://i.pravatar.cc/100?img=49" },
    company: { name: { ar: "بيكون", en: "Beacon" }, logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Beacon&backgroundColor=F59E0B" },
    challenge: { ar: "تحدي تصميم نظام", en: "System Design Sprint" },
    type: "regular",
    submittedAt: "2026-06-09",
    links: [{ kind: "file", label: "design-doc.pdf", url: "https://example.com/design.pdf" }],
    evaluatedSkills: ["arch", "problem", "comm", "docs"],
    scores: { arch: 6.5, problem: 7, comm: 7.5, docs: 6 },
    feedback: { ar: "يحتاج تعمّق أكبر في معالجة الحالات الحدية.", en: "Needs deeper edge-case handling." },
    reviewer: { name: { ar: "فيصل العتيبي", en: "Faisal Alotaibi" }, role: { ar: "مهندس معماري", en: "Solutions Architect" }, avatar: "https://i.pravatar.cc/100?img=68" },
    status: "rejected",
  },
];

export const talentPool = [
  { id: 1, name: { ar: "ليلى عبدالله", en: "Layla Abdullah" }, title: "Full-Stack", country: "SA", readiness: 86, reputation: 4820, top: ["React", "Node", "Postgres"], avg: 8.4, verified: true, avatar: "https://i.pravatar.cc/100?img=47" },
  { id: 2, name: { ar: "خالد الزهراني", en: "Khalid Alzahrani" }, title: "Backend", country: "SA", readiness: 92, reputation: 5210, top: ["Go", "Kafka", "K8s"], avg: 9.1, verified: true, avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 3, name: { ar: "نورا السبيعي", en: "Noura Alsubaie" }, title: "Data", country: "AE", readiness: 88, reputation: 4970, top: ["Python", "ML", "SQL"], avg: 8.6, verified: true, avatar: "https://i.pravatar.cc/100?img=45" },
  { id: 4, name: { ar: "أحمد المطيري", en: "Ahmed Almutairi" }, title: "Frontend", country: "EG", readiness: 78, reputation: 3990, top: ["React", "TS", "Figma"], avg: 7.8, verified: false, avatar: "https://i.pravatar.cc/100?img=33" },
  { id: 5, name: { ar: "سارة القحطاني", en: "Sara Alqahtani" }, title: "Mobile", country: "SA", readiness: 71, reputation: 3210, top: ["Flutter", "Dart"], avg: 7.2, verified: true, avatar: "https://i.pravatar.cc/100?img=49" },
  { id: 6, name: { ar: "محمد الغامدي", en: "Mohammed Alghamdi" }, title: "DevOps", country: "SA", readiness: 84, reputation: 4420, top: ["AWS", "Terraform"], avg: 8.2, verified: true, avatar: "https://i.pravatar.cc/100?img=15" },
  { id: 7, name: { ar: "ريم الدوسري", en: "Reem Aldossari" }, title: "Designer", country: "KW", readiness: 81, reputation: 4110, top: ["UI", "Research"], avg: 8.0, verified: true, avatar: "https://i.pravatar.cc/100?img=44" },
  { id: 8, name: { ar: "فيصل العتيبي", en: "Faisal Alotaibi" }, title: "Full-Stack", country: "JO", readiness: 76, reputation: 3650, top: ["Next.js", "Prisma"], avg: 7.6, verified: false, avatar: "https://i.pravatar.cc/100?img=68" },
];

export const earningsByMonth = [
  { m: "Jan", v: 320 }, { m: "Feb", v: 480 }, { m: "Mar", v: 540 },
  { m: "Apr", v: 720 }, { m: "May", v: 980 }, { m: "Jun", v: 1240 },
];
export const earningsTransactions = [
  { id: "tx-091", task: { ar: "مراجعة كود Pull Request", en: "Review a Pull Request" }, date: "2026-06-14", amount: 40, status: "paid" },
  { id: "tx-090", task: { ar: "تصميم أيقونات SVG", en: "Design SVG icons" }, date: "2026-06-12", amount: 60, status: "paid" },
  { id: "tx-089", task: { ar: "اختبار تطبيق ويب", en: "QA test a web app" }, date: "2026-06-10", amount: 35, status: "paid" },
  { id: "tx-088", task: { ar: "ترجمة نص تقني", en: "Translate technical doc" }, date: "2026-06-08", amount: 25, status: "pending" },
  { id: "tx-087", task: { ar: "مراجعة كود Pull Request", en: "Review a Pull Request" }, date: "2026-06-05", amount: 40, status: "paid" },
];

export const myRubricScores: Record<RubricKey, number> = {
  code: 8.6, problem: 8.4, arch: 7.9, testing: 7.5, docs: 7.2,
  comm: 8.8, delivery: 9.0, team: 8.3, present: 7.8,
};
