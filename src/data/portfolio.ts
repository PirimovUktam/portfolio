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

type Experience = {
  title: LocalizedText;
  detail: LocalizedText;
  evidence?: { url: string; label: LocalizedText };
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
    role: { en: "Mobile & full-stack engineer", uz: "Mobil va Full-Stack dasturçi" },
    location: { en: "Qarshi, Uzbekistan", uz: "Qarşi, Özbekiston" },
    intro: {
      en: "I build mobile and web products and bring AI into the workflows where it helps.",
      uz: "Mobil va veb mahsulotlar yarataman, AI’ni foyda beradigan jarayonlarga qöşaman.",
    },
    bio: {
      en: "I work across the product, from figuring out what someone needs to designing the interface, building the backend and getting it online.",
      uz: "Odamlarga nima kerakligini aniqlaşdan boşlab, interfeysni loyihalaş, backend yaratiş va mahsulotni işga tuşirişgaça işlayman.",
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
    next: { en: "Scroll down", uz: "Pastga" },
    index: { en: "Developer portfolio", uz: "Dasturçi portfoliosi" },
  },
  nav: [
    { id: "work", label: { en: "Work", uz: "Loyihalar" } },
    { id: "about", label: { en: "About", uz: "Men haqimda" } },
    { id: "contact", label: { en: "Contact", uz: "Aloqa" } },
  ],
  ui: {
    navigation: { en: "Main navigation", uz: "Asosiy navigatsiya" },
    languages: { en: "Site language", uz: "Sayt tili" },
    skip: { en: "Skip to content", uz: "Asosiy mazmunga ötiş" },
    viewProject: { en: "View project", uz: "Loyihani köriş" },
    demo: { en: "Open live demo", uz: "Jonli demoni oçiş" },
    source: { en: "Source code", uz: "Manba kodi" },
    back: { en: "All projects", uz: "Barça loyihalar" },
    moreWork: { en: "More projects", uz: "Boşqa loyihalar" },
    role: { en: "My role", uz: "Mening rolim" },
    contributions: { en: "What I built", uz: "Nima yaratdim" },
    tech: { en: "Technology", uz: "Texnologiyalar" },
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
        en: "A closer look at what I’ve built for learning, legal guidance and everyday tasks.",
        uz: "Taʼlim, huquqiy yordam va kundalik vazifalar uçun yaratgan işlarim.",
      },
    },
    about: {
      label: { en: "02 / Profile", uz: "02 / Profil" },
      title: { en: "A little about me.", uz: "Qisqaça men haqimda." },
    },
    contact: {
      label: { en: "03 / Contact", uz: "03 / Aloqa" },
      title: { en: "Have a project in mind?", uz: "Loyiha ğoyangiz bormi?" },
      intro: {
        en: "Tell me what you’re building and where you’d like help.",
        uz: "Nima yaratayotganingiz va qayerda yordam kerakligini yozing.",
      },
    },
  },
  skills: [
    { label: { en: "Mobile", uz: "Mobil" }, tools: ["Flutter", "Dart"] },
    { label: { en: "Full-stack", uz: "Full-Stack" }, tools: ["React", "TypeScript", "Supabase", "PostgreSQL"] },
    { label: { en: "Applied AI", uz: "Amaliy AI" }, tools: ["Gemini", "LLM integration"] },
  ],
  experience: [
    {
      title: { en: "National AI Hackathon", uz: "Milliy AI xakatoni" },
      detail: {
        en: "Qarshi stage finalist with BilimYöl Smart Edu",
        uz: "BilimYöl Smart Edu bilan Qarşi bosqiçi finalçisi",
      },
      evidence: {
        url: "/images/recognition/oktam-pirimov-national-ai-hackathon-qarshi.pdf",
        label: { en: "View certificate", uz: "Sertifikatni köriş" },
      },
    },
    {
      title: { en: "Education", uz: "Taʼlim" },
      detail: {
        en: "Information Systems and Technologies · Computer Engineering",
        uz: "Axborot tizimlari va texnologiyalari · Kompyuter muhandisligi",
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
        en: "Built web and mobile MVPs with a shared Supabase backend.",
        uz: "Umumiy Supabase backend’iga ulangan veb va mobil MVP’larni yaratdim.",
      },
      {
        en: "Integrated Yölçi AI for explanations and follow-up practice.",
        uz: "Tuşuntiriş va qöşimça maşqlar uçun Yölçi AI’ni integratsiya qildim.",
      },
    ],
    technologies: ["React", "TypeScript", "Flutter", "Supabase", "PostgreSQL", "Gemini"],
    liveUrl: "https://bilimyol-smart-edu.vercel.app",
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
        en: "Implemented the Flutter interface for browsing legal sources and drafting documents.",
        uz: "Huquqiy manbalarni köriş va hujjat loyihalarini yaratiş uçun Flutter interfeysini işlab çiqdim.",
      },
      {
        en: "Integrated authentication and database access with Supabase.",
        uz: "Autentifikatsiya va maʼlumotlar bazasiga ulanişni Supabase orqali integratsiya qildim.",
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
        en: "Implemented product browsing and responsive shopping screens in Flutter.",
        uz: "Flutter’da mahsulotlarni köriş uçun moslaşuvçan savdo ekranlarini yaratdim.",
      },
    ],
    technologies: ["Flutter", "Dart", "Material Design"],
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
        en: "Built a branch-finding flow in Uzbek, English and Russian.",
        uz: "Özbek, ingliz va rus tillarida filial qidiriş jarayonini yaratdim.",
      },
    ],
    technologies: ["Telegram Bot API"],
  },
];
