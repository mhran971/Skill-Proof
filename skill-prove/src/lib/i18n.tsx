import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const dict: Dict = {
  appName: { ar: "سكِل بروف", en: "SkillProof" },
  tagline: {
    ar: "التوظيف القائم على إثبات المهارة",
    en: "Proof-of-Skill Hiring",
  },
  heroTitle: {
    ar: "أثبت مهاراتك. وظّف بثقة.",
    en: "Prove Your Skills. Hire With Confidence.",
  },
  heroSub: {
    ar: "منصة توظيف ذكية تربط الخريجين بالشركات عبر تحديات عملية ومقاطع فيديو وتقييم بالذكاء الاصطناعي بدلاً من الاعتماد على السيرة الذاتية فقط.",
    en: "A smart recruitment platform connecting graduates with companies through practical challenges, videos, and AI evaluation — beyond résumés.",
  },
  getStarted: { ar: "ابدأ مجاناً", en: "Get Started Free" },
  forCompanies: { ar: "للشركات", en: "For Companies" },
  signIn: { ar: "تسجيل الدخول", en: "Sign In" },
  signUp: { ar: "إنشاء حساب", en: "Sign Up" },
  benefits: { ar: "لماذا سكِل بروف؟", en: "Why SkillProof?" },
  benefit1Title: { ar: "إثبات مهارة حقيقي", en: "Real Skill Proof" },
  benefit1Desc: {
    ar: "تحديات عملية ومشاريع وفيديوهات بدلاً من الكلام الفارغ.",
    en: "Practical challenges, projects and videos — not empty claims.",
  },
  benefit2Title: { ar: "تقييم بالذكاء الاصطناعي", en: "AI-Powered Evaluation" },
  benefit2Desc: {
    ar: "تحليل ذكي وموضوعي لأداء كل مرشح في الوقت الفعلي.",
    en: "Smart, objective analysis of every candidate in real time.",
  },
  benefit3Title: { ar: "جواز سفر المهارات", en: "Skill Passport" },
  benefit3Desc: {
    ar: "سجل موثّق وقابل للمشاركة يثبت مستواك في كل مهارة.",
    en: "A verifiable, shareable record proving your level in every skill.",
  },
  benefit4Title: { ar: "توظيف أسرع", en: "Faster Hiring" },
  benefit4Desc: {
    ar: "اعثر على المرشح المناسب في أيام، لا أشهر.",
    en: "Find the right candidate in days, not months.",
  },
  stats: { ar: "أرقامنا", en: "Our Numbers" },
  statCandidates: { ar: "مرشح فعّال", en: "Active Candidates" },
  statCompanies: { ar: "شركة موظِّفة", en: "Hiring Companies" },
  statChallenges: { ar: "تحدي عملي", en: "Practical Challenges" },
  statHires: { ar: "توظيف ناجح", en: "Successful Hires" },
  howItWorks: { ar: "كيف يعمل؟", en: "How It Works" },
  step1: { ar: "أنشئ حسابك", en: "Create your account" },
  step1d: { ar: "سجّل كمرشح أو شركة في دقائق.", en: "Register as a candidate or company in minutes." },
  step2: { ar: "أثبت مهارتك", en: "Prove your skills" },
  step2d: { ar: "أنجز تحديات، ارفع مشاريع وفيديوهات.", en: "Complete challenges, upload projects & videos." },
  step3: { ar: "احصل على التقييم", en: "Get evaluated" },
  step3d: { ar: "تقييم ذكي يبني جواز مهاراتك ودرجة الجاهزية.", en: "AI builds your Skill Passport and Readiness Score." },
  step4: { ar: "وظّف أو توظّف", en: "Hire or get hired" },
  step4d: { ar: "تطابق ذكي بين المهارات والوظائف.", en: "Smart matching between skills and jobs." },
  successStories: { ar: "قصص نجاح", en: "Success Stories" },
  footerRights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },

  // Nav / dashboard
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  profile: { ar: "الملف الشخصي", en: "Profile" },
  videos: { ar: "فيديوهاتي", en: "My Videos" },
  challenges: { ar: "التحديات", en: "Challenges" },
  interview: { ar: "مقابلة AI", en: "AI Interview" },
  jobs: { ar: "الوظائف", en: "Jobs" },
  leaderboard: { ar: "المتصدّرون", en: "Leaderboard" },
  internships: { ar: "التدريب", en: "Internships" },
  tasks: { ar: "المهام المصغّرة", en: "Micro-Tasks" },
  companyHub: { ar: "بوابة الشركة", en: "Company Hub" },
  evaluate: { ar: "تقييم المرشح", en: "Evaluate" },
  createChallenge: { ar: "إنشاء تحدي", en: "Create Challenge" },
  admin: { ar: "الإدارة", en: "Admin" },
  logout: { ar: "خروج", en: "Sign out" },

  // Candidate dashboard
  welcomeBack: { ar: "أهلاً بعودتك", en: "Welcome back" },
  profileCompletion: { ar: "اكتمال الملف", en: "Profile completion" },
  reputation: { ar: "نقاط السمعة", en: "Reputation" },
  readiness: { ar: "جاهزية التوظيف", en: "Job Readiness" },
  skillPassport: { ar: "جواز المهارات", en: "Skill Passport" },
  recentActivity: { ar: "النشاط الأخير", en: "Recent activity" },
  recommendedChallenges: { ar: "تحديات مقترحة", en: "Recommended challenges" },
  recommendedJobs: { ar: "وظائف مقترحة", en: "Recommended jobs" },
  viewAll: { ar: "عرض الكل", en: "View all" },
  apply: { ar: "تقديم", en: "Apply" },
  start: { ar: "ابدأ", en: "Start" },
  match: { ar: "تطابق", en: "match" },

  // Profile
  personalInfo: { ar: "المعلومات الشخصية", en: "Personal Info" },
  education: { ar: "التعليم", en: "Education" },
  skills: { ar: "المهارات", en: "Skills" },
  certifications: { ar: "الشهادات", en: "Certifications" },
  portfolio: { ar: "الأعمال", en: "Portfolio" },
  history: { ar: "السجل", en: "History" },
  badges: { ar: "الأوسمة", en: "Badges" },

  // Videos
  uploadVideo: { ar: "رفع فيديو", en: "Upload Video" },
  aiSummary: { ar: "ملخص الذكاء الاصطناعي", en: "AI Evaluation" },

  // Challenges
  browseChallenges: { ar: "استعرض التحديات", en: "Browse Challenges" },
  filterBy: { ar: "تصفية", en: "Filter" },
  difficulty: { ar: "الصعوبة", en: "Difficulty" },
  category: { ar: "الفئة", en: "Category" },
  timeLimit: { ar: "المدة", en: "Time limit" },
  submit: { ar: "إرسال الحل", en: "Submit solution" },

  // Interview
  startInterview: { ar: "ابدأ المقابلة", en: "Start Interview" },
  endInterview: { ar: "إنهاء", en: "End" },
  aiQuestion: { ar: "سؤال", en: "Question" },

  // Jobs
  searchJobs: { ar: "ابحث عن وظيفة", en: "Search jobs" },

  // Company
  talentSearch: { ar: "البحث عن مواهب", en: "Talent Search" },
  candidateRecommendations: { ar: "مرشحون مقترحون", en: "Candidate Recommendations" },
  postedChallenges: { ar: "تحدياتك", en: "Your Challenges" },
  postedJobs: { ar: "وظائفك", en: "Your Jobs" },
  analytics: { ar: "التحليلات", en: "Analytics" },

  // Admin
  userMgmt: { ar: "إدارة المستخدمين", en: "User Management" },
  challengeMgmt: { ar: "إدارة التحديات", en: "Challenge Management" },
  reports: { ar: "البلاغات", en: "Reports" },
  fraud: { ar: "كشف الاحتيال", en: "Fraud Detection" },

  // Auth
  email: { ar: "البريد الإلكتروني", en: "Email" },
  password: { ar: "كلمة المرور", en: "Password" },
  fullName: { ar: "الاسم الكامل", en: "Full name" },
  companyName: { ar: "اسم الشركة", en: "Company name" },
  forgotPassword: { ar: "نسيت كلمة المرور؟", en: "Forgot password?" },
  noAccount: { ar: "ليس لديك حساب؟", en: "Don't have an account?" },
  haveAccount: { ar: "لديك حساب؟", en: "Already have an account?" },
  asCandidate: { ar: "كمرشح", en: "as Candidate" },
  asCompany: { ar: "كشركة", en: "as Company" },
  resetLink: { ar: "إرسال رابط الاستعادة", en: "Send reset link" },

  // Rubric / submissions / new pages
  talent: { ar: "بحث المواهب", en: "Talent Search" },
  submitSolution: { ar: "إرسال الحل", en: "Submit Solution" },
  earnings: { ar: "الأرباح", en: "Earnings" },
  evaluatedSkills: { ar: "المهارات المُقيَّمة", en: "Skills evaluated" },
  scorePerSkill: { ar: "التقييم لكل مهارة (0-10)", en: "Score per skill (0–10)" },
  averageScore: { ar: "المتوسط", en: "Average" },
  writtenFeedback: { ar: "ملاحظات مكتوبة", en: "Written feedback" },
  saveScores: { ar: "حفظ التقييم", en: "Save scores" },
  acceptSubmission: { ar: "قبول وإضافة للعرض", en: "Accept & publish" },
  rejectSubmission: { ar: "رفض", en: "Reject" },
  pendingReview: { ar: "بانتظار التقييم", en: "Pending review" },
  inReview: { ar: "قيد المراجعة", en: "In review" },
  accepted: { ar: "مقبول", en: "Accepted" },
  rejected: { ar: "مرفوض", en: "Rejected" },
  finalTask: { ar: "مهمة نهائية", en: "Final task" },
  regularTask: { ar: "مهمة عادية", en: "Regular task" },
  finalNote: { ar: "المهمة النهائية تتطلّب فيديو شرح وتمر بمراجعة الاعتماد قبل ظهورها في العرض العام.", en: "Final tasks require a video walkthrough and go through acceptance review before showing in the public showcase." },
  publicShowcase: { ar: "العرض العام", en: "Public showcase" },
  publicProfile: { ar: "الملف العام", en: "Public profile" },
  publicProfileNote: { ar: "هكذا تراك الشركات. جميع التقييمات ظاهرة.", en: "This is how companies see you. All evaluations are visible." },
  githubRepo: { ar: "رابط المستودع (GitHub)", en: "GitHub repository URL" },
  liveUrl: { ar: "رابط النسخة الحيّة", en: "Live URL" },
  uploadFile: { ar: "ملفات داعمة", en: "Supporting files" },
  videoExplain: { ar: "فيديو شرح", en: "Video walkthrough" },
  reviewTimeline: { ar: "مسار المراجعة", en: "Review timeline" },
  aiReview: { ar: "مراجعة AI", en: "AI review" },
  humanReview: { ar: "مراجعة بشرية", en: "Human review" },
  finalDecision: { ar: "القرار النهائي", en: "Final decision" },
  totalEarnings: { ar: "إجمالي الأرباح", en: "Total earnings" },
  thisMonth: { ar: "هذا الشهر", en: "This month" },
  withdraw: { ar: "سحب", en: "Withdraw" },
  transactions: { ar: "العمليات", en: "Transactions" },
  paid: { ar: "مدفوع", en: "Paid" },
  pending: { ar: "معلّق", en: "Pending" },
  home: { ar: "الرئيسية", en: "Home" },
  passport: { ar: "الجواز", en: "Passport" },
  country: { ar: "الدولة", en: "Country" },
  avgScore: { ar: "متوسط التقييم", en: "Avg score" },
  verifiedOnly: { ar: "موثّق فقط", en: "Verified only" },
  shortlist: { ar: "قائمة مختصرة", en: "Shortlist" },
  message: { ar: "تواصل", en: "Message" },

  // Rubric / tasks extensions
  evaluationRubric: { ar: "مهارات التقييم", en: "Evaluation rubric" },
  rubricHint: { ar: "اختر المهارات التي ستُقيَّم وحدّد ترتيب/وزن كل منها (1 = الأهم).", en: "Pick the skills to evaluate and set each one's rank/weight (1 = highest)." },
  rank: { ar: "الترتيب", en: "Rank" },
  weight: { ar: "الوزن", en: "Weight" },
  mySubmissions: { ar: "مهامي المُنجزة", en: "My submitted tasks" },
  noSubmissions: { ar: "لا توجد تسليمات بعد", en: "No submissions yet" },
  yourChallengesAndSubs: { ar: "تحدياتك وتسليمات المرشحين", en: "Your challenges & candidate submissions" },
  solvedBy: { ar: "حلّها", en: "Solved by" },
  viewSubmission: { ar: "عرض التسليم", en: "View submission" },
  totalSubmissions: { ar: "إجمالي التسليمات", en: "Total submissions" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
  dir: "rtl" | "ltr";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
