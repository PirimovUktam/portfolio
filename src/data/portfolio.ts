export type Locale = "en" | "uz";

export type LocalizedText = {
  en: string;
  uz: string;
};

export type PortfolioImage = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  variants?: readonly { src: string; width: number }[];
};

export type Experience = {
  title: LocalizedText;
  detail: LocalizedText;
  period?: LocalizedText;
  badge?: LocalizedText;
  evidence?: { url: string; label: LocalizedText };
};

export type CaseStudyNode = {
  title: LocalizedText;
  detail: LocalizedText;
};

export type ProjectCaseStudy = {
  problem: LocalizedText;
  solution: LocalizedText;
  audience: LocalizedText;
  architecture: {
    summary: LocalizedText;
    clients: CaseStudyNode[];
    platform: CaseStudyNode;
    services: CaseStudyNode[];
  };
  workflow: {
    step: string;
    title: LocalizedText;
    detail: LocalizedText;
  }[];
};

export type Project = {
  slug: string;
  title: string;
  category: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  cover?: {
    tone: "fern" | "orchid";
    image: PortfolioImage;
    inset?: PortfolioImage;
  };
  caseStudy: ProjectCaseStudy;
};

export type TimelineMilestone = {
  id: string;
  code: string;
  shortTitle: LocalizedText;
  badge: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  stack: string[];
};

export type ProcessStep = {
  step: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  detail: LocalizedText;
};

export const portfolio = {
  site: {
    title: {
      en: "Öktam Pirimov — Mobile & Full-Stack Engineer",
      uz: "Öktam Pirimov — Mobil va Full-Stack dasturçi",
    },
    description: {
      en: "Öktam Pirimov is a mobile and full-stack engineer in Qarshi, Uzbekistan. Explore his work in education, legal technology and AI integration.",
      uz: "Öktam Pirimov — Qarşidagi mobil va Full-Stack dasturçi. Taʼlim, huquqiy texnologiyalar va AI integratsiyasi böyiça loyihalari bilan tanişing.",
    },
    url: "https://pirimov.uz",
    socialImage: {
      src: "/images/social/portfolio-share.jpg",
      width: 1200,
      height: 630,
      alt: {
        en: "Öktam Pirimov with his specialties in Flutter, React and AI",
        uz: "Öktam Pirimov portreti va yönalişlari: Flutter, React va AI",
      },
    },
  },
  profile: {
    name: "Öktam Pirimov",
    givenName: "Öktam",
    familyName: "Pirimov",
    monogram: "OP",
    role: {
      en: "Mobile & Full-Stack Engineer · Applied AI",
      uz: "Mobil va Full-Stack dasturçi · Amaliy AI",
    },
    location: { en: "Qarshi, Uzbekistan", uz: "Qarşi, Özbekiston" },
    status: {
      en: "Available for product & engineering projects",
      uz: "Yangi loyihalar va hamkorlikka oçiq",
    },
    intro: {
      en: "I build mobile and web products and bring AI into the workflows where it helps.",
      uz: "Mobil va veb mahsulotlar yarataman, AI’ni foyda beradigan jarayonlarga qöşaman.",
    },
    bio: {
      en: "I work across the entire product lifecycle — from clarifying the real user problem and designing the interface to architecting the Supabase/PostgreSQL backend, integrating LLM workflows, and shipping to production.",
      uz: "Odamlarga nima kerakligini aniqlaşdan boşlab, interfeysni loyihalaş, Supabase/PostgreSQL backend arxitekturasini quriş, AI jarayonlarini ulab, mahsulotni production’ga çiqarişgaça töliq siklda işlayman.",
    },
    image: {
      src: "/images/profile/oktam-pirimov.webp",
      width: 1000,
      height: 1000,
      alt: { en: "Portrait of Öktam Pirimov", uz: "Öktam Pirimov portreti" },
      variants: [
        { src: "/images/profile/oktam-pirimov-480.webp", width: 480 },
        { src: "/images/profile/oktam-pirimov-768.webp", width: 768 },
      ],
    },
    email: "oktamnuu@gmail.com",
  },
  hero: {
    art: {
      src: "/images/hero/interlock.webp",
      width: 1200,
      height: 900,
      alt: {
        en: "Three ribbed citron metal bands interlock into one sculpture",
        uz: "Uçta oç yaşil, qirrali metall tasma bir butun şaklga tutaşgan",
      },
      variants: [
        { src: "/images/hero/interlock-480.webp", width: 480 },
        { src: "/images/hero/interlock-768.webp", width: 768 },
        { src: "/images/hero/interlock-1080.webp", width: 1080 },
      ],
    },
    plate: "FIG. 01 / INTERLOCK",
    action: { en: "Explore work", uz: "Loyihalarni köriş" },
    secondaryAction: { en: "Start a project", uz: "Boğlaniş" },
    next: { en: "Scroll down", uz: "Pastga" },
    index: { en: "Developer portfolio", uz: "Dasturçi portfoliosi" },
    disciplines: [
      {
        code: "01",
        label: { en: "Mobile · Flutter & Dart", uz: "Mobil · Flutter va Dart" },
      },
      {
        code: "02",
        label: { en: "Full-Stack · Next.js & Supabase", uz: "Full-Stack · Next.js va Supabase" },
      },
      {
        code: "03",
        label: { en: "Applied AI · Gemini & LLMs", uz: "Amaliy AI · Gemini va LLM" },
      },
    ],
    terminalPrompt: "oktam@pirimov.uz:~ $",
    terminalCommands: {
      en: [
        "flutter build --release // cross-platform iOS & Android apps",
        "next build --export // fast static & full-stack web systems",
        "supabase db push // PostgreSQL schemas, RLS & Edge Functions",
        "gemini.generate() // grounded AI tutors & legal assistants",
      ],
      uz: [
        "flutter build --release // kross-platforma mobil ilovalar",
        "next build --export // tezkor full-stack veb platformalar",
        "supabase db push // PostgreSQL bazasi, RLS va Edge Functions",
        "gemini.generate() // AI ustoz va huquqiy maslahat tizimlari",
      ],
    },
  },
  stats: [
    {
      value: "04",
      label: { en: "Shipped Products", uz: "Asosiy Loyihalar" },
      detail: {
        en: "BilimYöl · LexHub · CosmoPlus · Kamoliddin",
        uz: "BilimYöl · LexHub · CosmoPlus · Kamoliddin",
      },
    },
    {
      value: "03",
      label: { en: "Engineering Layers", uz: "Muhandislik Qatlamlari" },
      detail: {
        en: "Mobile (Flutter) · Web (Next.js) · Applied AI",
        uz: "Mobil (Flutter) · Veb (Next.js) · Amaliy AI",
      },
    },
    {
      value: "AI",
      label: { en: "Hackathon Finalist", uz: "Milliy AI Xakatoni" },
      detail: {
        en: "Qarshi stage finalist with BilimYöl Smart Edu",
        uz: "BilimYöl Smart Edu bilan Qarşi bosqiçi finalçisi",
      },
    },
    {
      value: "E2E",
      label: { en: "Full Lifecycle", uz: "Töliq Sikl" },
      detail: {
        en: "Concept → Architecture → UI/UX → Production",
        uz: "Ğoya → Arxitektura → UI/UX → Production",
      },
    },
  ],
  marquee: [
    "Flutter",
    "Dart",
    "Next.js App Router",
    "React 19",
    "TypeScript",
    "Supabase",
    "PostgreSQL · RLS",
    "Gemini AI",
    "LLM Integration",
    "Riverpod / BLoC",
    "Telegram Bot API",
    "Clean Architecture",
  ],
  nav: [
    { id: "work", label: { en: "Work", uz: "Loyihalar" } },
    { id: "journey", label: { en: "Journey", uz: "Tajriba" } },
    { id: "about", label: { en: "About", uz: "Men haqimda" } },
    { id: "contact", label: { en: "Contact", uz: "Aloqa" } },
  ],
  ui: {
    navigation: { en: "Main navigation", uz: "Asosiy navigatsiya" },
    languages: { en: "Site language", uz: "Sayt tili" },
    skip: { en: "Skip to content", uz: "Asosiy mazmunga ötiş" },
    viewProject: { en: "View case study", uz: "Batafsil köriş" },
    demo: { en: "Open live demo", uz: "Jonli demoni oçiş" },
    source: { en: "Source code", uz: "Manba kodi" },
    back: { en: "All projects", uz: "Barça loyihalar" },
    moreWork: { en: "More projects & automations", uz: "Boşqa loyihalar va tizimlar" },
    role: { en: "My role", uz: "Mening rolim" },
    contributions: { en: "What I built", uz: "Nima yaratdim" },
    tech: { en: "Technology", uz: "Texnologiyalar" },
    problem: { en: "01 / The Problem", uz: "01 / Muammo" },
    solution: { en: "02 / The Solution", uz: "02 / Yeçim" },
    audience: { en: "Target users", uz: "Kimlar uçun" },
    architecture: { en: "03 / System Architecture", uz: "03 / Tizim Arxitekturasi" },
    workflow: { en: "04 / Product Flow & Execution", uz: "04 / İşlaş Jarayoni" },
    clientLayer: { en: "Client Applications", uz: "Mijoz Ilovalari" },
    platformLayer: { en: "Core Platform", uz: "Asosiy Platforma" },
    serviceLayer: { en: "Data & AI Services", uz: "Maʼlumotlar va AI Xizmatlari" },
    appliedStack: { en: "Applied stack", uz: "Foydalanilgan texnologiyalar" },
    processHeading: { en: "Delivery Framework", uz: "İşlaş Tizimi" },
    next: { en: "Next project", uz: "Keyingi loyiha" },
    backToTop: { en: "Back to top", uz: "Yuqoriga qaytiş" },
    notFound: {
      title: { en: "Page not found", uz: "Sahifa topilmadi" },
      description: {
        en: "The address may have changed. You can find all the projects from the homepage.",
        uz: "Sahifa manzili özgargan bölişi mumkin. Barça loyihalar boş sahifada.",
      },
      backHome: { en: "Back to homepage", uz: "Boş sahifaga qaytiş" },
    },
  },
  sections: {
    work: {
      label: { en: "01 / Projects", uz: "01 / Loyihalar" },
      title: { en: "Selected work.", uz: "Tanlangan işlar." },
      intro: {
        en: "A closer look at what I’ve built for learning, legal guidance and everyday tasks — with real screenshots, architecture and live demos.",
        uz: "Taʼlim, huquqiy yordam va kundalik vazifalar uçun yaratgan haqiqiy tizimlarim, arxitektura va jonli demolar.",
      },
    },
    journey: {
      label: { en: "02 / Engineering & Process", uz: "02 / Muhandislik va Jarayon" },
      title: { en: "How I engineer.", uz: "Qanday işlayman." },
      intro: {
        en: "From cross-platform Flutter apps and shared Supabase backends to grounded AI workflows and disciplined product delivery.",
        uz: "Kross-platforma Flutter ilovalari va umumiy Supabase backend’dan tortib, aniq AI integratsiyasi va tizimli mahsulot yetkazişgaça.",
      },
    },
    about: {
      label: { en: "03 / Profile", uz: "03 / Profil" },
      title: { en: "A little about me.", uz: "Qisqaça men haqimda." },
    },
    contact: {
      label: { en: "04 / Contact", uz: "04 / Aloqa" },
      title: { en: "Have a project in mind?", uz: "Loyiha ğoyangiz bormi?" },
      intro: {
        en: "Tell me what you’re building and where you’d like help.",
        uz: "Nima yaratayotganingiz va qayerda yordam kerakligini yozing.",
      },
    },
  },
  timeline: [
    {
      id: "mobile",
      code: "01",
      shortTitle: { en: "Mobile Dev", uz: "Mobil Dasturlaş" },
      badge: { en: "Flutter & Dart", uz: "Flutter va Dart" },
      title: {
        en: "Cross-Platform Mobile Engineering",
        uz: "Kross-Platforma Mobil Muhandisligi",
      },
      subtitle: {
        en: "iOS & Android applications from a single clean codebase",
        uz: "Yagona toza kod bazasidan iOS va Android ilovalar",
      },
      description: {
        en: "Building responsive, high-contrast mobile interfaces with predictable state management (Riverpod / BLoC), offline-resilient flows, and native-grade navigation across phones and tablets.",
        uz: "Riverpod va BLoC yordamida tartibli holat boşqaruvi, barqaror navigatsiya hamda barcha ekranlarga moslaşuvçan mobil interfeyslarni loyihalaş va yaratish.",
      },
      highlights: [
        {
          en: "Built Flutter mobile clients for BilimYöl Smart Edu, LexHub, and CosmoPlus.",
          uz: "BilimYöl Smart Edu, LexHub va CosmoPlus uçun Flutter mobil ilovalarini işlab çiqdim.",
        },
        {
          en: "Modular screen architecture separating domain logic from UI widgets.",
          uz: "Biznes mantiqni UI qatlamidan ajratuvçi modulli arxitektura.",
        },
        {
          en: "Responsive layouts tested across compact mobile viewports and desktop web.",
          uz: "Kiçik mobil ekranlardan tortib veb brauzergaça moslaşuvçan dizayn.",
        },
      ],
      stack: ["Flutter", "Dart", "Riverpod", "Material Design 3", "REST / Supabase"],
    },
    {
      id: "fullstack",
      code: "02",
      shortTitle: { en: "Full-Stack Web", uz: "Full-Stack Veb" },
      badge: { en: "Next.js & Supabase", uz: "Next.js va Supabase" },
      title: {
        en: "Full-Stack Web & Shared Cloud Backends",
        uz: "Full-Stack Veb va Umumiy Bulutli Backend",
      },
      subtitle: {
        en: "Next.js App Router, TypeScript, PostgreSQL & Row-Level Security",
        uz: "Next.js App Router, TypeScript, PostgreSQL va RLS xavfsizligi",
      },
      description: {
        en: "Designing unified Supabase and PostgreSQL backends that power both web and mobile apps simultaneously — complete with authentication, role-based access control, and fast static/SSR web frontends.",
        uz: "Veb va mobil ilovalarni bitta umumiy Supabase va PostgreSQL bazasiga ulash — autentifikatsiya, rollar böyiça ruxsatlar (RLS) va tezkor Next.js interfeyslari.",
      },
      highlights: [
        {
          en: "Shared Supabase backend connecting student, teacher, parent, and mobile views in BilimYöl.",
          uz: "BilimYöl’da öquvçi, öqituvçi, ota-ona va mobil ilovani bog‘lovçi yagona Supabase backend.",
        },
        {
          en: "Strict TypeScript contracts and static export verification pipelines.",
          uz: "Qatʼiy TypeScript tiplari va avtomatik tekşiriladigan statik build tizimi.",
        },
        {
          en: "PostgreSQL schema design with Row-Level Security (RLS) policies and RPC functions.",
          uz: "PostgreSQL maʼlumotlar bazasi sxemasi, RLS himoyasi va RPC funksiyalari.",
        },
      ],
      stack: ["Next.js", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    },
    {
      id: "ai",
      code: "03",
      shortTitle: { en: "Applied AI", uz: "Amaliy AI" },
      badge: { en: "Gemini & LLMs", uz: "Gemini va LLM" },
      title: {
        en: "Grounded AI Workflows & Automation",
        uz: "Amaliy AI Jarayonlari va Avtomatizatsiya",
      },
      subtitle: {
        en: "AI tutors, statutory legal assistants & multilingual bots",
        uz: "AI ustoz, qonunçilikka tayangan huquqiy yordamçi va Telegram botlar",
      },
      description: {
        en: "Integrating Gemini and LLM APIs where they solve concrete user problems — explaining student mistakes in BilimYöl, surfacing Uzbekistan legal sources and document drafts in LexHub, and automating regional branch lookup.",
        uz: "AI’ni şunchaki bezak uçun emas, aniq muammoni yeçiş uçun qöşaman: BilimYöl’da xatolarni tuşuntiruvçi Yölçi AI, LexHub’da Özbekiston qonunçiligi asosida hujjat loyihalarini tayyorlaş va Telegram avtomatizatsiyasi.",
      },
      highlights: [
        {
          en: "Integrated Yölçi AI tutor in BilimYöl Smart Edu (National AI Hackathon Qarshi finalist).",
          uz: "BilimYöl Smart Edu’ga Yölçi AI ustozini integratsiya qildim (Milliy AI xakatoni Qarşi finalçisi).",
        },
        {
          en: "Built statutory guidance and legal petition/claim drafting workflows in LexHub.",
          uz: "LexHub’da qonun moddalari asosida maslahat va ariza/daʼvo loyihalarini yaratiş oqimini qurdim.",
        },
        {
          en: "Developed multilingual (UZ / EN / RU) Telegram branch-finder bot for Kamoliddin Pharmacy.",
          uz: "Kamoliddin Pharmacy uçun 3 tilda (UZ / EN / RU) filial qidiriş Telegram botini yaratdim.",
        },
      ],
      stack: ["Gemini API", "LLM Prompting", "Supabase Edge Functions", "Telegram Bot API"],
    },
    {
      id: "delivery",
      code: "04",
      shortTitle: { en: "Product Delivery", uz: "Mahsulot Sikli" },
      badge: { en: "End-to-End", uz: "Töliq Nazorat" },
      title: {
        en: "End-to-End Product Ownership",
        uz: "Ğoyadan Production’gaça Töliq Masʼuliyat",
      },
      subtitle: {
        en: "Problem discovery → System design → Implementation → Production",
        uz: "Muammoni örganiş → Arxitektura → Dasturlaş → Production deploy",
      },
      description: {
        en: "Rather than writing isolated tickets, I take ownership of the whole product loop: defining user journeys, designing high-contrast interfaces, implementing backend & client code, and deploying on custom domains.",
        uz: "Alohida kichik qismlarni emas, butun mahsulot zanjirini boshqaraman: foydalanuvçi oqimini aniqlash, yuqori kontrastli dizayn, klient va server kodi hamda production’ga chiqarish.",
      },
      highlights: [
        {
          en: "Zero fake metrics or placeholder claims — every project is backed by real code or live demos.",
          uz: "Soxta raqamlar va uydirma daʼvolarsiz — har bir loyiha real kod va jonli demoga ega.",
        },
        {
          en: "Bilingual (English & Uzbek) architecture with full SEO, OpenGraph, and sitemap verification.",
          uz: "Ingliz va özbek tillarida töliq SEO, OpenGraph va sitemap tekşiruviga ega tizim.",
        },
        {
          en: "Production deployment on Vercel with automated build & static export tests.",
          uz: "Avtomatik statik eksport testlari bilan Vercel production muhitida barqaror ishlash.",
        },
      ],
      stack: ["System Design", "UI/UX Engineering", "Git & GitHub", "Automated Testing", "SEO"],
    },
  ] as TimelineMilestone[],
  process: [
    {
      step: "01",
      title: { en: "Discover", uz: "Tahlil va Reja" },
      subtitle: { en: "Problem & Scope", uz: "Muammo va Maqsad" },
      detail: {
        en: "Clarify user needs, core workflows, and MVP boundaries before writing code.",
        uz: "Kod yozişdan oldin foydalanuvçi ehtiyoji va asosiy funksional chegaralarni aniqlaş.",
      },
    },
    {
      step: "02",
      title: { en: "Architect", uz: "Arxitektura" },
      subtitle: { en: "Data & Interfaces", uz: "Baza va Interfeys" },
      detail: {
        en: "Structure PostgreSQL schemas, API contracts, state models, and clean UI hierarchy.",
        uz: "PostgreSQL sxemasi, API shartnomalari, holat boshqaruvi va aniq UI ierarxiyasini quriş.",
      },
    },
    {
      step: "03",
      title: { en: "Build", uz: "Dasturlaş" },
      subtitle: { en: "Mobile, Web & AI", uz: "Mobil, Veb va AI" },
      detail: {
        en: "Implement Flutter and Next.js clients with shared Supabase backends and AI features.",
        uz: "Flutter va Next.js ilovalarini umumiy Supabase backend hamda AI modullari bilan yaratish.",
      },
    },
    {
      step: "04",
      title: { en: "Ship", uz: "İşga Tuşiriş" },
      subtitle: { en: "Verify & Deploy", uz: "Tekşiriş va Deploy" },
      detail: {
        en: "Run typechecks, lint, and static export verification before deploying to production.",
        uz: "Production’ga çiqarişdan avval typecheck, lint va avtomatik build testlaridan ötkaziş.",
      },
    },
  ] as ProcessStep[],
  skills: [
    {
      label: { en: "Mobile Engineering", uz: "Mobil Dasturlaş" },
      tools: ["Flutter", "Dart", "Riverpod / BLoC", "Material Design 3"],
    },
    {
      label: { en: "Full-Stack Web", uz: "Full-Stack Veb" },
      tools: ["React 19", "Next.js App Router", "TypeScript", "Supabase", "PostgreSQL"],
    },
    {
      label: { en: "Applied AI & Bots", uz: "Amaliy AI va Botlar" },
      tools: ["Gemini API", "LLM Integration", "Telegram Bot API", "Edge Functions"],
    },
  ],
  experience: [
    {
      title: { en: "National AI Hackathon", uz: "Milliy AI xakatoni" },
      badge: { en: "Qarshi Stage · Finalist", uz: "Qarşi bosqiçi · Finalçi" },
      period: { en: "August 2026", uz: "Avgust 2026" },
      detail: {
        en: "Reached the Qarshi stage finals with BilimYöl Smart Edu — responsible for product concept, full-stack architecture, web/mobile MVPs, and Yölçi AI integration.",
        uz: "BilimYöl Smart Edu loyihasi bilan Qarşi bosqiçi finaliga çiqdim — mahsulot konsepsiyasi, arxitektura, veb/mobil MVP va Yölçi AI integratsiyasini bajardim.",
      },
      evidence: {
        url: "/images/recognition/oktam-pirimov-national-ai-hackathon-qarshi.pdf",
        label: { en: "View official certificate (PDF)", uz: "Rasmiy sertifikatni köriş (PDF)" },
      },
    },
    {
      title: { en: "Education", uz: "Oliy Taʼlim" },
      badge: { en: "Bachelor’s Degree", uz: "Bakalavr" },
      period: { en: "Computer Engineering", uz: "Kompyuter muhandisligi" },
      detail: {
        en: "Information Systems and Technologies · Specialization in Computer Engineering.",
        uz: "Axborot tizimlari va texnologiyalari · Kompyuter muhandisligi mutaxassisligi.",
      },
    },
  ] as Experience[],
  socials: [
    { name: "GitHub", url: "https://github.com/PirimovUktam" },
    { name: "Telegram", url: "https://t.me/Pirimov_Uktam" },
  ],
} as const;

export const projects: Project[] = [
  {
    slug: "bilimyol-smart-edu",
    title: "BilimYöl Smart Edu",
    category: { en: "EdTech · Web, mobile & AI", uz: "EdTech · Veb, mobil va AI" },
    summary: {
      en: "An adaptive learning MVP with a skill map, targeted practice and an AI tutor that explains mistakes.",
      uz: "Bilim xaritasi, maqsadli maşqlar va xatolarni tuşuntiradigan AI ustozga ega taʼlim platformasi.",
    },
    role: {
      en: "Product management and full-stack development",
      uz: "Mahsulot boşqaruvi va Full-Stack dasturlaş",
    },
    contributions: [
      {
        en: "Designed a learning flow that takes students from an initial assessment to a personal roadmap.",
        uz: "Öquvçini dastlabki diagnostikadan şaxsiy öquv rejasiga olib boradigan jarayonni loyihaladim.",
      },
      {
        en: "Built web and mobile MVPs with a shared Supabase backend and role views for students, teachers and parents.",
        uz: "Umumiy Supabase backend’iga ulangan veb va mobil MVP’larni hamda öquvçi, öqituvçi va ota-ona panellarini yaratdim.",
      },
      {
        en: "Integrated Yölçi AI for step-by-step mistake explanations and follow-up practice.",
        uz: "Xatolarni tuşuntiriş va qöşimça maşqlar yaratiş uçun Yölçi AI’ni integratsiya qildim.",
      },
    ],
    technologies: ["React", "TypeScript", "Flutter", "Supabase", "PostgreSQL", "Gemini"],
    liveUrl: "https://bilimyol.uz",
    githubUrl: "https://github.com/PirimovUktam/bilimyol-smart-edu",
    featured: true,
    cover: {
      tone: "fern",
      image: {
        src: "/images/projects/bilimyol-dashboard.webp",
        width: 1440,
        height: 810,
        alt: {
          en: "BilimYöl student dashboard showing a learning roadmap and practice tools",
          uz: "Öquv rejasi va maşqlar vositalari körsatilgan BilimYöl öquvçi paneli",
        },
        variants: [
          { src: "/images/projects/bilimyol-dashboard-480.webp", width: 480 },
          { src: "/images/projects/bilimyol-dashboard-640.webp", width: 640 },
          { src: "/images/projects/bilimyol-dashboard-960.webp", width: 960 },
        ],
      },
      inset: {
        src: "/images/projects/bilimyol-roadmap-mobile.webp",
        width: 475,
        height: 950,
        alt: {
          en: "BilimYöl course selection on a mobile screen",
          uz: "Mobil ekranda BilimYöl kurslarini tanlaş oynasi",
        },
        variants: [{ src: "/images/projects/bilimyol-roadmap-mobile-240.webp", width: 240 }],
      },
    },
    caseStudy: {
      problem: {
        en: "A fixed lesson sequence forces one student to repeat topics they already know while pushing another past unmastered foundations. Standard test scores alone do not explain why a mistake happened or what to practice next.",
        uz: "Bir xil tartibdagi darslar bitta öquvçini bilgan mavzusini takrorlaşga majbur qilsa, boşqasini hali tuşunmagan mavzusidan ötkazib yuboradi. Oddiy test natijasi xato sababini tuşuntirmaydi.",
      },
      solution: {
        en: "Start with a diagnostic assessment, map knowledge gaps visually, and generate an adaptive learning path. Every practice result updates the roadmap while Yölçi AI explains mistakes in plain language.",
        uz: "Dastlabki diagnostika orqali bilimdagi böşliqlar aniqlanadi va şaxsiy öquv xaritasi tuziladi. Har bir maşq natijasi keyingi qadamni yangilaydi, Yölçi AI esa xatolarni sodda tilda tuşuntiradi.",
      },
      audience: {
        en: "Students learning Mathematics and English, with dedicated progress views for parents, teachers, and school admins.",
        uz: "Matematika va ingliz tilini örganayotgan öquvçilar hamda natijalarni kuzatuvçi ota-onalar va öqituvçilar.",
      },
      architecture: {
        summary: {
          en: "Web and Flutter clients share a single Supabase backend with PostgreSQL Row-Level Security and server-side Gemini AI functions.",
          uz: "Veb va Flutter mobil ilovalari PostgreSQL RLS va serverdagi Gemini AI funksiyalariga ega yagona Supabase backend orqali işlaydi.",
        },
        clients: [
          {
            title: { en: "Web Application", uz: "Veb Ilova" },
            detail: { en: "React · TypeScript · Student, Teacher & Parent portals", uz: "React · TypeScript · Öquvçi, öqituvçi va ota-ona panellari" },
          },
          {
            title: { en: "Mobile Application", uz: "Mobil Ilova" },
            detail: { en: "Flutter · Dart · Riverpod adaptive roadmap client", uz: "Flutter · Dart · Riverpod moslaşuvçan mobil ilova" },
          },
        ],
        platform: {
          title: { en: "Supabase Unified Backend", uz: "Supabase Yagona Backend" },
          detail: { en: "Shared authentication, learner profiles & real-time progress sync", uz: "Umumiy autentifikatsiya, öquvçi profillari va sinxron natijalar" },
        },
        services: [
          {
            title: { en: "PostgreSQL · RLS · RPC", uz: "PostgreSQL · RLS · RPC" },
            detail: { en: "Role-based access control and deterministic skill-map evaluation", uz: "Rolga mos ruxsatlar va bilim xaritasini baholaş funksiyalari" },
          },
          {
            title: { en: "Edge Functions · Gemini AI", uz: "Edge Functions · Gemini AI" },
            detail: { en: "Yölçi AI mistake explanations & dynamic practice generation", uz: "Yölçi AI xato tahlili va maqsadli maşqlar generatsiyasi" },
          },
        ],
      },
      workflow: [
        {
          step: "01",
          title: { en: "Diagnostic Check", uz: "Diagnostika" },
          detail: { en: "Pinpoints current mastery and foundational gaps.", uz: "Joriy bilim darajasi va böşliqlarni aniqlaydi." },
        },
        {
          step: "02",
          title: { en: "Personal Skill Map", uz: "Shaxsiy Xarita" },
          detail: { en: "Builds a visual sequence of next topics to unlock.", uz: "Örganilişi kerak bölgan mavzular ketma-ketligini tuzadi." },
        },
        {
          step: "03",
          title: { en: "Yölçi AI Guidance", uz: "Yölçi AI Yordami" },
          detail: { en: "Explains errors and generates targeted follow-up drills.", uz: "Xatolarni tuşuntiradi va mos maşqlarni taqdim etadi." },
        },
        {
          step: "04",
          title: { en: "Mastery & Tracking", uz: "Natija va Nazorat" },
          detail: { en: "Updates student, parent, and teacher dashboards.", uz: "Öquvçi, ota-ona va öqituvçi panellarida natijani yangilaydi." },
        },
      ],
    },
  },
  {
    slug: "lexhub",
    title: "LexHub",
    category: { en: "LegalTech · Mobile, web & AI", uz: "LegalTech · Mobil, veb va AI" },
    summary: {
      en: "A legal guidance app for Uzbekistan that helps people find relevant sources and start drafting documents.",
      uz: "Özbekiston uçun huquqiy yordam ilovasi. Tegişli manbalarni topiş va hujjat loyihasini tayyorlaşga yordam beradi.",
    },
    role: {
      en: "Flutter development and AI integration",
      uz: "Flutter’da dasturlaş va AI integratsiyasi",
    },
    contributions: [
      {
        en: "Implemented the Flutter interface for browsing legal sources and drafting formal documents.",
        uz: "Huquqiy manbalarni köriş va rasmiy hujjat loyihalarini yaratiş uçun Flutter interfeysini işlab çiqdim.",
      },
      {
        en: "Integrated authentication, statutory reference lookup, and database access with Supabase.",
        uz: "Autentifikatsiya, qonun moddalari qidiruvi va maʼlumotlar bazasiga ulanişni Supabase orqali integratsiya qildim.",
      },
    ],
    technologies: ["Flutter", "Dart", "Supabase", "PostgreSQL", "LLM"],
    liveUrl: "https://lexhub-theta.vercel.app",
    githubUrl: "https://github.com/PirimovUktam/LexHub",
    featured: true,
    cover: {
      tone: "orchid",
      image: {
        src: "/images/projects/lexhub-mobile.webp",
        width: 640,
        height: 953,
        variants: [{ src: "/images/projects/lexhub-mobile-320.webp", width: 320 }],
        alt: {
          en: "LexHub’s mobile start screen with legal assistance and document tools",
          uz: "Huquqiy yordam va hujjat vositalari körsatilgan LexHub mobil boş ekrani",
        },
      },
    },
    caseStudy: {
      problem: {
        en: "Finding relevant Uzbekistan legislation and drafting standard petitions, complaints, or claims often requires hours of searching across scattered legal texts.",
        uz: "Özbekiston qonunçiligidan tegişli moddalarni topiş hamda ariza, şikoyat yoki daʼvo hujjatlarini töğri şakllantiriş fuqarolar uçun köp vaqt va murakkablik tuğdiradi.",
      },
      solution: {
        en: "A focused mobile & web assistant where users describe their issue, review grounded statutory references, and generate structured document drafts.",
        uz: "Foydalanuvçi muammosini tasvirlab, qonun moddalariga tayangan maslahat oladigan hamda tayyor hujjat loyihasini şakllantiradigan mobil va veb platforma.",
      },
      audience: {
        en: "Citizens, entrepreneurs, and legal practitioners in Uzbekistan seeking fast statutory lookup and document templates.",
        uz: "Tezkor huquqiy manba va hujjat loyihasiga ehtiyoj sezuvçi fuqarolar hamda tadbirkorlar.",
      },
      architecture: {
        summary: {
          en: "Cross-platform Flutter client backed by Supabase authentication, PostgreSQL statutory storage, and LLM document drafting workflows.",
          uz: "Supabase autentifikatsiyasi, PostgreSQL bazasi va LLM hujjat generatsiyasiga ulangan kross-platforma Flutter ilovasi.",
        },
        clients: [
          {
            title: { en: "Flutter Mobile & Web Client", uz: "Flutter Mobil va Veb Ilova" },
            detail: { en: "Flutter · Dart · Material 3 legal workspace", uz: "Flutter · Dart · Material 3 huquqiy interfeys" },
          },
        ],
        platform: {
          title: { en: "Supabase Backend", uz: "Supabase Backend" },
          detail: { en: "User sessions, saved drafts & statutory metadata", uz: "Foydalanuvçi sessiyalari va saqlangan hujjatlar" },
        },
        services: [
          {
            title: { en: "PostgreSQL Legal Store", uz: "PostgreSQL Qonunlar Bazasi" },
            detail: { en: "Structured articles, categories & template schemas", uz: "Tizimlaşgan moddalar va hujjat şablonlari" },
          },
          {
            title: { en: "LLM Guidance Engine", uz: "LLM Maslahat va Hujjat Moduli" },
            detail: { en: "Context-grounded legal guidance & petition generation", uz: "Qonunçilik asosida maslahat va ariza loyihasini yaratiş" },
          },
        ],
      },
      workflow: [
        {
          step: "01",
          title: { en: "Describe Case", uz: "Muammoni Kiritiş" },
          detail: { en: "User enters the legal situation in everyday language.", uz: "Foydalanuvçi vaziyatni oddiy tilda yozadi." },
        },
        {
          step: "02",
          title: { en: "Statutory Match", uz: "Manbalarni Topiş" },
          detail: { en: "Surfaces relevant articles and legal provisions.", uz: "Tegişli qonun moddalari va manbalarni çiqaradi." },
        },
        {
          step: "03",
          title: { en: "Document Draft", uz: "Hujjat Loyihasi" },
          detail: { en: "Generates structured petitions, claims, or complaints.", uz: "Ariza, daʼvo yoki şikoyat loyihasini şakllantiradi." },
        },
        {
          step: "04",
          title: { en: "Review & Export", uz: "Tekşiriş va Yuklaş" },
          detail: { en: "Edit details and save or export the formal draft.", uz: "Tafsilotlarni tahrirlab, hujjatni saqlab oladi." },
        },
      ],
    },
  },
  {
    slug: "cosmoplus",
    title: "CosmoPlus",
    category: { en: "Mobile commerce", uz: "Mobil savdo" },
    summary: {
      en: "A Flutter storefront for discovering perfumes and skincare products.",
      uz: "Atir va parvariş mahsulotlarini körib çiqiş uçun Flutter savdo ilovasi.",
    },
    role: { en: "Mobile development", uz: "Mobil dasturlaş" },
    contributions: [
      {
        en: "Implemented product browsing, category filtering, and responsive shopping screens in Flutter.",
        uz: "Flutter’da mahsulotlarni köriş, toifalar böyiça saralaş va moslaşuvçan savdo ekranlarini yaratdim.",
      },
      {
        en: "Engineered clean cart state management and smooth product detail transitions.",
        uz: "Savatça holatini boşqariş va mahsulot sahifalariga silliq ötiş mantiqini işlab çiqdim.",
      },
    ],
    technologies: ["Flutter", "Dart", "Material Design"],
    caseStudy: {
      problem: {
        en: "Customers browsing specialty perfumes and skincare creams on mobile needed a clean, fast catalog experience instead of cluttered social media feeds.",
        uz: "Atir va parvariş kremlarini mobil qurilmada xarid qiluvçilar uçun tartibsiz ijtimoiy tarmoq sahifalari örniga tezkor va qulay katalog zarur edi.",
      },
      solution: {
        en: "A dedicated Flutter mobile storefront featuring categorized collections, rich product cards, and a streamlined cart checkout flow.",
        uz: "Toifalarga ajratilgan kolleksiyalar, yuqori kontrastli mahsulot kartalari va qulay savatça tizimiga ega Flutter mobil ilovasi.",
      },
      audience: {
        en: "Mobile shoppers exploring fragrance and skincare collections.",
        uz: "Mobil telefon orqali atir va kosmetika mahsulotlarini tanlovçi xaridorlar.",
      },
      architecture: {
        summary: {
          en: "Modular Flutter application architecture separating catalog presentation, product filtering, and cart state.",
          uz: "Katalog körinişi, qidiruv/filtr va savatça holatini alohida qatlamlarga ajratuvçi modulli Flutter arxitekturasi.",
        },
        clients: [
          {
            title: { en: "Flutter iOS & Android App", uz: "Flutter iOS va Android Ilova" },
            detail: { en: "Custom Material 3 storefront widgets & responsive grids", uz: "Maxsus Material 3 savdo komponentlari va moslaşuvçan grid" },
          },
        ],
        platform: {
          title: { en: "State & Navigation Core", uz: "Holat va Navigatsiya Yoli" },
          detail: { en: "Predictable cart management & category routing", uz: "Savatça va toifalar böyiça tezkor navigatsiya" },
        },
        services: [
          {
            title: { en: "Catalog & Order Module", uz: "Katalog va Buyurtma Moduli" },
            detail: { en: "Structured product specs, pricing & order summary", uz: "Mahsulot xususiyatlari, narxlar va buyurtma xulosasi" },
          },
        ],
      },
      workflow: [
        {
          step: "01",
          title: { en: "Browse Collections", uz: "Katalogni Köriş" },
          detail: { en: "Filter between perfumes, creams, and featured items.", uz: "Atirlar, kremlar va tanlangan mahsulotlarni saralaş." },
        },
        {
          step: "02",
          title: { en: "Inspect Details", uz: "Tafsilotlarni Örganiş" },
          detail: { en: "View notes, volume options, and product imagery.", uz: "Hajm variantlari, tavsif va suratlarni köriş." },
        },
        {
          step: "03",
          title: { en: "Manage Cart", uz: "Savatçani Boşqariş" },
          detail: { en: "Adjust quantities with instant total calculation.", uz: "Miqdorni belgilab, umumiy summani darhol hisoblaş." },
        },
        {
          step: "04",
          title: { en: "Order Checkout", uz: "Buyurtmani Tasdiqlaş" },
          detail: { en: "Complete the purchase with a clean summary screen.", uz: "Yakuniy xulosa ekrani orqali buyurtmani rasmiylaştiriş." },
        },
      ],
    },
  },
  {
    slug: "kamoliddin-pharmacy",
    title: "Kamoliddin Pharmacy Bot",
    category: { en: "Telegram automation", uz: "Telegram avtomatizatsiyasi" },
    summary: {
      en: "A multilingual Telegram bot that helps customers find a pharmacy branch by region and district.",
      uz: "Viloyat va tuman böyiça dorixona filialini topişga yordam beradigan köp tilli Telegram bot.",
    },
    role: { en: "Bot development", uz: "Bot yaratiş" },
    contributions: [
      {
        en: "Built a hierarchical branch-finding flow in Uzbek, English and Russian.",
        uz: "Özbek, ingliz va rus tillarida bosqiçma-bosqiç filial qidiriş jarayonini yaratdim.",
      },
      {
        en: "Structured regional and district navigation so customers reach exact branch locations in seconds.",
        uz: "Viloyat va tumanlar böyiça tezkor menyu orqali aniq dorixona manzilini topiş tizimini qurdim.",
      },
    ],
    technologies: ["Telegram Bot API", "Node.js", "Multi-language Flow"],
    caseStudy: {
      problem: {
        en: "Pharmacy customers needed an immediate way to locate open branches in their region and district without installing a separate app.",
        uz: "Dorixona mijozlariga alohida ilova yuklab olmasdan turib, öz viloyati va tumanidagi eng yaqin filialni tezkor topiş imkoniyati kerak edi.",
      },
      solution: {
        en: "An automated Telegram bot with Uzbek, English, and Russian menus that guides users from region → district → branch address and map pin.",
        uz: "Özbek, ingliz va rus tillarida viloyat → tuman → filial manzili va lokatsiyasini taqdim etuvçi avtomatlaşgan Telegram bot.",
      },
      audience: {
        en: "Customers across Uzbekistan searching for nearby Kamoliddin Pharmacy branches on Telegram.",
        uz: "Telegram orqali yaqin atrofdagi dorixona filialini izlayotgan mijozlar.",
      },
      architecture: {
        summary: {
          en: "Stateful Telegram Bot webhook/polling workflow with localized menus and hierarchical location indexing.",
          uz: "Ko‘p tilli menyular va ierarxik hududlar bazasiga ega Telegram Bot arxitekturasi.",
        },
        clients: [
          {
            title: { en: "Telegram Messenger UI", uz: "Telegram Interfeysi" },
            detail: { en: "Inline & reply keyboards in UZ / EN / RU", uz: "UZ / EN / RU tillaridagi qulay tugmalar menyusi" },
          },
        ],
        platform: {
          title: { en: "Bot Routing Controller", uz: "Bot Yo‘naltiriş Moduli" },
          detail: { en: "Language session state & step-by-step location tree", uz: "Tanlangan til holati va bosqiçli hududlar daraxti" },
        },
        services: [
          {
            title: { en: "Branch Directory Store", uz: "Filiallar Bazasi" },
            detail: { en: "Region, district, address & map coordinates lookup", uz: "Viloyat, tuman, manzil va xarita koordinatalari" },
          },
        ],
      },
      workflow: [
        {
          step: "01",
          title: { en: "Select Language", uz: "Tilni Tanlaş" },
          detail: { en: "Choose Uzbek, English, or Russian on start.", uz: "Start bosilganda özbek, ingliz yoki rus tili tanlanadi." },
        },
        {
          step: "02",
          title: { en: "Pick Region", uz: "Viloyatni Tanlaş" },
          detail: { en: "Select the region from the structured menu.", uz: "Menyudan kerakli viloyat tanlanadi." },
        },
        {
          step: "03",
          title: { en: "Pick District", uz: "Tumanni Tanlaş" },
          detail: { en: "Filter down to the specific city or district.", uz: "Tegişli tuman yoki şahar saralanadi." },
        },
        {
          step: "04",
          title: { en: "Get Branch Location", uz: "Manzilni Oliş" },
          detail: { en: "Receive the exact branch address and map link.", uz: "Aniq filial manzili va xarita havolasi taqdim etiladi." },
        },
      ],
    },
  },
];
