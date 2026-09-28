// CONTENT FILE
// Update portfolio content here.
// Add skills, projects, images, social links and translations here.
// UI components should not contain portfolio-specific content.

export type Locale = "en" | "uz";

export type IconName =
  | "smartphone"
  | "code"
  | "database"
  | "brain"
  | "wrench"
  | "rocket"
  | "graduation"
  | "briefcase"
  | "scale"
  | "shopping"
  | "map";

export interface LocalizedText {
  en: string;
  uz: string;
}

export interface PortfolioImage {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
}

export interface CaseStudyPoint {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectCaseStudy {
  audience: LocalizedText;
  problem: CaseStudyPoint;
  solution: CaseStudyPoint;
  roleSummary: LocalizedText;
  architecture: {
    title: LocalizedText;
    description: LocalizedText;
    clients: CaseStudyPoint[];
    platform: CaseStudyPoint;
    services: CaseStudyPoint[];
    principle: CaseStudyPoint;
  };
  learningLoop: {
    title: LocalizedText;
    description: LocalizedText;
    phases: {
      title: LocalizedText;
      steps: LocalizedText[];
      description: LocalizedText;
    }[];
    note: LocalizedText;
  };
  status: CaseStudyPoint;
  nextStep: LocalizedText;
}

export interface Project {
  slug: string;
  title: string;
  icon: IconName;
  category: LocalizedText;
  role?: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  image?: PortfolioImage;
  screenshots?: PortfolioImage[];
  caseStudy?: ProjectCaseStudy;
  visual: {
    kind: "editorial" | "flow";
    wordmark: string;
    caption: LocalizedText;
    steps?: LocalizedText[];
  };
}

export interface Recognition {
  id: string;
  title: LocalizedText;
  distinction: LocalizedText;
  description: LocalizedText;
  projectSlug?: string;
  image?: PortfolioImage;
  evidenceUrl?: string;
}

export interface SectionContent {
  heading: LocalizedText;
  eyebrow: LocalizedText;
  intro: LocalizedText;
}

export interface Portfolio {
  site: {
    title: LocalizedText;
    description: LocalizedText;
    url?: string;
    socialImage?: PortfolioImage;
  };
  background: {
    desktop: PortfolioImage;
    mobile: PortfolioImage;
  };
  profile: {
    name: string;
    role: LocalizedText;
    bio: LocalizedText;
    shortBio: LocalizedText;
    location: LocalizedText;
    image: PortfolioImage;
    email: string;
  };
  hero: {
    lines: LocalizedText[];
    disciplines: { label: LocalizedText; icon: IconName }[];
    intro: LocalizedText;
    primaryAction: LocalizedText;
    secondaryAction: LocalizedText;
    scrollHint: LocalizedText;
  };
  nav: { id: string; label: LocalizedText }[];
  ui: {
    skipToContent: LocalizedText;
    menu: LocalizedText;
    closeMenu: LocalizedText;
    languageLabel: LocalizedText;
    imageUnavailable: LocalizedText;
    caseStudy: LocalizedText;
    liveDemo: LocalizedText;
    sourceCode: LocalizedText;
    backToProjects: LocalizedText;
    projectOverview: LocalizedText;
    myRole: LocalizedText;
    myContribution: LocalizedText;
    technologies: LocalizedText;
    nextProject: LocalizedText;
    contactLabel: LocalizedText;
    backToTop: LocalizedText;
    projectIndex: LocalizedText;
    focus: LocalizedText;
    emailAction: LocalizedText;
    viewCertificate: LocalizedText;
    problem: LocalizedText;
    solution: LocalizedText;
    audience: LocalizedText;
    architecture: LocalizedText;
    howItWorks: LocalizedText;
    currentStatus: LocalizedText;
    nextStep: LocalizedText;
    notFound: {
      title: LocalizedText;
      description: LocalizedText;
      backHome: LocalizedText;
    };
  };
  sections: Record<
    "work" | "recognition" | "about" | "expertise" | "services" | "journey" | "contact",
    SectionContent
  >;
  about: {
    statement: LocalizedText;
    principles: LocalizedText[];
  };
  skills: { category: LocalizedText; icon: IconName; items: (string | LocalizedText)[] }[];
  services: { title: LocalizedText; icon: IconName; description: LocalizedText }[];
  journey: {
    label: LocalizedText;
    icon: IconName;
    title: LocalizedText;
    description: LocalizedText;
  }[];
  recognitions: Recognition[];
  projects: Project[];
  socials: { name: string; url: string; icon: "github" | "send" }[];
  footer: { note: LocalizedText };
}

const notFound = {
  title: {
    en: "Page not found.",
    uz: "Bu sahifa topilmadi.",
  },
  description: {
    en: "The page you are looking for does not exist. Explore the portfolio from the beginning.",
    uz: "Siz izlayotgan sahifa mavjud emas. Portfolio bilan bosh sahifadan tanishing.",
  },
  backHome: { en: "Back to home", uz: "Bosh sahifaga qaytish" },
} satisfies Portfolio["ui"]["notFound"];

export const portfolio: Portfolio = {
  site: {
    title: {
      en: "Pirimov O‘ktam — Mobile, Full-Stack & AI",
      uz: "Pirimov O‘ktam — Mobil, Full-Stack va AI",
    },
    description: {
      en: "Mobile Developer, Full-Stack Developer and AI Engineer in Qarshi, Uzbekistan. Explore Pirimov O‘ktam’s mobile, web and AI projects.",
      uz: "Qarshilik mobil va Full-Stack dasturchi, AI muhandisi Pirimov O‘ktamning mobil, veb va sun’iy intellekt loyihalari bilan tanishing.",
    },
    url: "https://pirimov-portfolio.vercel.app",
    socialImage: {
      src: "/images/social/portfolio-share.jpg",
      width: 1200,
      height: 630,
      alt: {
        en: "Pirimov O‘ktam’s portrait beside his name and Flutter, React and AI specialties.",
        uz: "Pirimov O‘ktam portreti, ismi hamda Flutter, React va AI yo‘nalishlari.",
      },
    },
  },
  background: {
    desktop: {
      src: "/images/backgrounds/developer-universe.webp",
      alt: {
        en: "A developer at a desk beneath a planet and holographic Flutter and GitHub symbols, overlooking a city at sunset.",
        uz: "Sayyora, Flutter va GitHub gologrammalari ostida, quyosh botayotgan shahar manzarasi qarshisidagi stolda ishlayotgan dasturchi.",
      },
      width: 1672,
      height: 941,
    },
    mobile: {
      src: "/images/backgrounds/developer-universe-mobile.webp",
      alt: {
        en: "A developer at a desk beneath a planet and holographic Flutter and GitHub symbols, overlooking a city at sunset.",
        uz: "Sayyora, Flutter va GitHub gologrammalari ostida, quyosh botayotgan shahar manzarasi qarshisidagi stolda ishlayotgan dasturchi.",
      },
      width: 1000,
      height: 563,
    },
  },
  profile: {
    name: "Pirimov O‘ktam",
    role: {
      en: "Mobile & Full-Stack Developer | AI Engineer",
      uz: "Mobil va Full-Stack dasturchi | AI muhandisi",
    },
    bio: {
      en: "I build mobile apps, full-stack products and AI-powered solutions. My work spans product decisions, architecture, development, integration and deployment, with a focus on clear interfaces and maintainable code.",
      uz: "Mobil ilovalar, Full-Stack mahsulotlar va AI yechimlarini yarataman. G‘oyani aniqlashtirishdan arxitektura, dasturlash, integratsiya va ishga tushirishgacha bo‘lgan jarayon ustida ishlayman. Qulay interfeys va rivojlantirish oson bo‘lgan kodga e’tibor beraman.",
    },
    shortBio: {
      en: "From a product idea to a working mobile, web or AI solution.",
      uz: "Mahsulot g‘oyasidan ishlaydigan mobil, veb yoki AI yechimigacha.",
    },
    location: { en: "Qarshi, Uzbekistan", uz: "Qarshi, O‘zbekiston" },
    image: {
      src: "/images/profile/oktam-pirimov.webp",
      alt: {
        en: "Portrait of Pirimov O‘ktam",
        uz: "Pirimov O‘ktam portreti",
      },
      width: 1000,
      height: 1000,
    },
    email: "oktamnuu@gmail.com",
  },
  hero: {
    lines: [
      { en: "MOBILE. WEB.", uz: "MOBIL. VEB." },
      { en: "APPLIED AI.", uz: "AMALIY AI." },
    ],
    disciplines: [
      { label: { en: "Mobile", uz: "Mobil" }, icon: "smartphone" },
      { label: { en: "Web", uz: "Veb" }, icon: "code" },
      { label: { en: "Applied AI", uz: "Amaliy AI" }, icon: "brain" },
    ],
    intro: {
      en: "I build mobile apps, full-stack products and AI-powered solutions.",
      uz: "Mobil ilovalar, Full-Stack mahsulotlar va AI yechimlarini yarataman.",
    },
    primaryAction: { en: "Explore my work", uz: "Loyihalarimni ko‘rish" },
    secondaryAction: { en: "Get in touch", uz: "Bog‘lanish" },
    scrollHint: { en: "Scroll to explore", uz: "Pastga aylantiring" },
  },
  nav: [
    { id: "top", label: { en: "Home", uz: "Bosh sahifa" } },
    { id: "work", label: { en: "Work", uz: "Loyihalar" } },
    { id: "about", label: { en: "About", uz: "Men haqimda" } },
    { id: "expertise", label: { en: "Expertise", uz: "Ko‘nikmalar" } },
    { id: "contact", label: { en: "Contact", uz: "Bog‘lanish" } },
  ],
  ui: {
    skipToContent: {
      en: "Skip to main content",
      uz: "Asosiy mazmunga o‘tish",
    },
    menu: { en: "Open menu", uz: "Menyuni ochish" },
    closeMenu: { en: "Close menu", uz: "Menyuni yopish" },
    languageLabel: { en: "Choose language", uz: "Tilni tanlash" },
    imageUnavailable: { en: "Image unavailable", uz: "Rasm mavjud emas" },
    caseStudy: { en: "View project", uz: "Loyihani ko‘rish" },
    liveDemo: { en: "Open demo", uz: "Demoni ochish" },
    sourceCode: { en: "Source code", uz: "Manba kodi" },
    backToProjects: { en: "Back to projects", uz: "Loyihalarga qaytish" },
    projectOverview: { en: "Project overview", uz: "Loyiha haqida" },
    myRole: { en: "My role", uz: "Mening rolim" },
    myContribution: { en: "My contribution", uz: "Mening hissam" },
    technologies: { en: "Technologies", uz: "Texnologiyalar" },
    nextProject: { en: "Next project", uz: "Keyingi loyiha" },
    contactLabel: { en: "Get in touch", uz: "Bog‘lanish" },
    backToTop: { en: "Back to top", uz: "Yuqoriga qaytish" },
    projectIndex: { en: "Project index", uz: "Loyihalar ro‘yxati" },
    focus: { en: "Focus", uz: "Yo‘nalish" },
    emailAction: { en: "Start a conversation", uz: "Suhbat boshlash" },
    viewCertificate: { en: "View certificate", uz: "Sertifikatni ko‘rish" },
    problem: { en: "The problem", uz: "Muammo" },
    solution: { en: "The solution", uz: "Yechim" },
    audience: { en: "Designed for", uz: "Kim uchun" },
    architecture: { en: "Technology & architecture", uz: "Texnologiya va arxitektura" },
    howItWorks: { en: "How it works", uz: "Qanday ishlaydi" },
    currentStatus: { en: "Current status", uz: "Hozirgi holat" },
    nextStep: { en: "Next development priority", uz: "Keyingi asosiy vazifa" },
    notFound,
  },
  sections: {
    work: {
      eyebrow: { en: "Selected work", uz: "Tanlangan loyihalar" },
      heading: { en: "Ideas into products.", uz: "G‘oyadan mahsulotgacha." },
      intro: {
        en: "Selected projects across personalized education, legal guidance, mobile commerce and business automation.",
        uz: "Shaxsiylashtirilgan ta’lim, huquqiy yordam, mobil savdo va biznes jarayonlarini avtomatlashtirish bo‘yicha loyihalar.",
      },
    },
    recognition: {
      eyebrow: { en: "Recognition", uz: "E’tirof" },
      heading: { en: "Hackathon experience.", uz: "Xakaton tajribasi." },
      intro: {
        en: "I presented BilimYo‘l Smart Edu at the National AI Hackathon’s Qarshi stage, held on 15–18 August 2026.",
        uz: "BilimYo‘l Smart Edu bilan 2026-yil 15–18-avgust kunlari Milliy AI xakatonining Qarshi bosqichida qatnashdim.",
      },
    },
    about: {
      eyebrow: { en: "About me", uz: "Men haqimda" },
      heading: { en: "Purpose before code.", uz: "Avval maqsad. Keyin kod." },
      intro: {
        en: "A developer’s perspective, shaped around people and the problems they need to solve.",
        uz: "Dasturchi sifatidagi yondashuvim markazida — insonlar va ular hal qilishi kerak bo‘lgan muammolar.",
      },
    },
    expertise: {
      eyebrow: { en: "Expertise", uz: "Ko‘nikmalar" },
      heading: { en: "Tools with a purpose.", uz: "Maqsadga mos vositalar." },
      intro: {
        en: "A practical toolkit across mobile, web, backend and AI—from the interface to the data behind it.",
        uz: "Mobil, veb, backend va AI yo‘nalishlaridagi amaliy ko‘nikmalar — interfeysdan uning ortidagi ma’lumotlargacha.",
      },
    },
    services: {
      eyebrow: { en: "What I do", uz: "Xizmatlar" },
      heading: { en: "From problem to product.", uz: "Muammodan mahsulotgacha." },
      intro: {
        en: "Focused development for a clear outcome: a useful application, a working integration or a practical first version.",
        uz: "Aniq natijaga yo‘naltirilgan ishlab chiqish: foydali ilova, ishlaydigan integratsiya yoki amaliy dastlabki versiya.",
      },
    },
    journey: {
      eyebrow: { en: "Journey", uz: "Faoliyat" },
      heading: { en: "Always building.", uz: "Izlanish va yaratish." },
      intro: {
        en: "Computer engineering foundations and independent product development.",
        uz: "Kompyuter muhandisligi asoslari va mustaqil mahsulot ishlab chiqish.",
      },
    },
    contact: {
      eyebrow: { en: "Contact", uz: "Bog‘lanish" },
      heading: {
        en: "Let’s build\nsomething useful.",
        uz: "Birga foydali\nmahsulot yaratamiz.",
      },
      intro: {
        en: "Have a product in mind or a development opportunity? Tell me about the problem you want to solve.",
        uz: "Mahsulot g‘oyangiz yoki dasturlash bo‘yicha taklifingiz bormi? Hal qilmoqchi bo‘lgan muammoingiz haqida yozing.",
      },
    },
  },
  about: {
    statement: {
      en: "Good software starts with a problem worth solving.",
      uz: "Yaxshi dastur hal qilishga arziydigan muammodan boshlanadi.",
    },
    principles: [
      { en: "Clean architecture", uz: "Toza arxitektura" },
      { en: "Thoughtful user experience", uz: "Qulay foydalanuvchi tajribasi" },
      { en: "Practical product value", uz: "Mahsulotning amaliy qiymati" },
    ],
  },
  skills: [
    {
      category: { en: "Mobile", uz: "Mobil dasturlash" },
      icon: "smartphone",
      items: [
        "Flutter",
        "Dart",
        "Android",
        {
          en: "Cross-platform mobile development",
          uz: "Ko‘p platformali mobil dasturlash",
        },
        "Material Design 3",
      ],
    },
    {
      category: { en: "Full-Stack", uz: "Full-Stack" },
      icon: "code",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "REST API",
        { en: "Web application development", uz: "Veb ilovalar yaratish" },
      ],
    },
    {
      category: { en: "Backend / Database", uz: "Backend / Ma’lumotlar bazasi" },
      icon: "database",
      items: [
        "Supabase",
        "PostgreSQL",
        { en: "Authentication", uz: "Autentifikatsiya" },
        { en: "Storage", uz: "Fayllarni saqlash" },
      ],
    },
    {
      category: { en: "AI", uz: "Sun’iy intellekt" },
      icon: "brain",
      items: [
        { en: "AI application development", uz: "AI ilovalar yaratish" },
        { en: "AI integration", uz: "AI integratsiyasi" },
        { en: "LLM-based applications", uz: "LLM asosidagi ilovalar" },
        { en: "Prompt engineering", uz: "Promptlarni ishlab chiqish" },
        {
          en: "AI-assisted software development",
          uz: "AI yordamida dasturiy ta’minot yaratish",
        },
      ],
    },
    {
      category: { en: "Tools", uz: "Vositalar" },
      icon: "wrench",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "Android Studio",
        "Vercel",
        "Cursor",
        "Codex",
        "Claude Code",
      ],
    },
  ],
  services: [
    {
      title: { en: "Mobile App Development", uz: "Mobil ilovalar yaratish" },
      icon: "smartphone",
      description: {
        en: "Cross-platform Android and iOS applications with Flutter, built around a clear interface and maintainable architecture.",
        uz: "Flutter yordamida Android va iOS uchun bitta kod bazasiga, qulay interfeys va tushunarli arxitekturaga ega ilovalar yaratish.",
      },
    },
    {
      title: { en: "Full-Stack Web Development", uz: "Full-Stack veb dasturlash" },
      icon: "code",
      description: {
        en: "Modern web applications that connect frontend experiences with the backend and data they need.",
        uz: "Zamonaviy frontend, backend va ma’lumotlar bilan ishlashni birlashtiradigan veb ilovalar yaratish.",
      },
    },
    {
      title: { en: "AI Integration", uz: "AI integratsiyasi" },
      icon: "brain",
      description: {
        en: "AI and LLM capabilities integrated into real products to support useful, focused user journeys.",
        uz: "AI va LLM imkoniyatlarini amaliy vazifalarni hal qiladigan haqiqiy mahsulotlarga integratsiya qilish.",
      },
    },
    {
      title: { en: "MVP / Product Development", uz: "MVP / Mahsulot yaratish" },
      icon: "rocket",
      description: {
        en: "Turning an idea into a practical first version, with a proportionate architecture and a clear development process.",
        uz: "G‘oyani amaliy dastlabki mahsulotga aylantirish: vazifaga mos arxitektura va aniq ishlab chiqish jarayoni bilan.",
      },
    },
  ],
  journey: [
    {
      label: { en: "Independent work", uz: "Mustaqil faoliyat" },
      icon: "briefcase",
      title: {
        en: "Freelance / Independent Developer",
        uz: "Frilanser / Mustaqil dasturchi",
      },
      description: {
        en: "Mobile, full-stack and AI-powered products, from MVPs to personal and client projects.",
        uz: "Mobil, Full-Stack va AI mahsulotlari ustida ishlash: MVP, shaxsiy loyihalar va buyurtma loyihalar.",
      },
    },
    {
      label: { en: "Education", uz: "Ta’lim" },
      icon: "graduation",
      title: {
        en: "Bachelor’s degree · Information Systems and Technologies",
        uz: "Bakalavr · Axborot tizimlari va texnologiyalari",
      },
      description: {
        en: "Specialization in Computer Engineering.",
        uz: "Mutaxassislik: kompyuter muhandisi.",
      },
    },
  ],
  recognitions: [
    {
      id: "national-ai-hackathon-qarshi",
      title: { en: "National AI Hackathon", uz: "Milliy AI xakatoni" },
      distinction: { en: "Qarshi stage · Finalist", uz: "Qarshi bosqichi · Finalchi" },
      description: {
        en: "Reached the final in Qarshi with BilimYo‘l Smart Edu. My contribution covered the product concept, architecture, MVP development and AI integration. Participation certificate available.",
        uz: "BilimYo‘l Smart Edu bilan Qarshidagi final bosqichigacha bordim. Mahsulot konsepsiyasi, arxitektura, MVP yaratish va AI integratsiyasi ustida ishladim. Ishtirok sertifikati mavjud.",
      },
      projectSlug: "bilimyol-smart-edu",
      image: {
        src: "/images/recognition/oktam-pirimov-national-ai-hackathon-qarshi.webp",
        alt: {
          en: "National AI Hackathon: Qarshi participation certificate issued to Pirimov Uktam, 15–18 August 2026.",
          uz: "Pirimov Uktam nomiga berilgan Milliy AI xakatoni: Qarshi bosqichida ishtirok etganlik sertifikati, 2026-yil 15–18-avgust.",
        },
        width: 1191,
        height: 1684,
      },
      evidenceUrl: "/images/recognition/oktam-pirimov-national-ai-hackathon-qarshi.pdf",
    },
  ],
  projects: [
    {
      slug: "bilimyol-smart-edu",
      title: "BilimYo‘l Smart Edu",
      icon: "graduation",
      category: { en: "EdTech / Web, Mobile & AI", uz: "EdTech / Veb, mobil va AI" },
      role: {
        en: "Product Manager / Full-Stack Developer",
        uz: "Mahsulot menejeri / Full-Stack dasturchi",
      },
      summary: {
        en: "A personal learning path built around knowledge gaps, targeted practice and guidance from Yo‘lchi AI. Developed as a web and mobile MVP.",
        uz: "Darslik emas — shaxsiy ta’lim yo‘li. Bilimdagi bo‘shliqlar, maqsadli mashqlar va Yo‘lchi AI yordamiga asoslangan veb va mobil MVP.",
      },
      description: {
        en: "BilimYo‘l Smart Edu is a personalized education MVP for mathematics and English. It connects assessment, a skill map, adaptive roadmaps, lessons and reinforcement, with Yo‘lchi AI providing explanations and practice content. React and Flutter clients use a shared Supabase backend, and the web app includes parent, teacher and admin views.",
        uz: "BilimYo‘l Smart Edu — matematika va ingliz tili uchun shaxsiylashtirilgan ta’lim platformasining MVP talqini. U diagnostika, bilim xaritasi, moslashuvchan o‘quv yo‘li, dars va mustahkamlash mashqlarini birlashtiradi. Yo‘lchi AI xatolarni tushuntiradi va mashq mazmunini yaratadi. React va Flutter ilovalari umumiy Supabase backend bilan ishlaydi. Veb ilovada ota-ona, o‘qituvchi va administrator panellari ham mavjud.",
      },
      contributions: [
        { en: "Product concept", uz: "Mahsulot konsepsiyasi" },
        { en: "Application architecture", uz: "Ilova arxitekturasi" },
        { en: "MVP development", uz: "MVP ishlab chiqish" },
        { en: "AI integration", uz: "AI integratsiyasi" },
      ],
      technologies: [
        "React",
        "TypeScript",
        "Flutter",
        "Dart",
        "Supabase",
        "PostgreSQL",
        "Gemini",
      ],
      featured: true,
      githubUrl: "https://github.com/PirimovUktam/bilimyol-smart-edu",
      caseStudy: {
        audience: {
          en: "Learners studying mathematics and English, with progress views for parents and teachers.",
          uz: "Matematika va ingliz tilini o‘rganayotgan o‘quvchilar, ularning natijalarini kuzatuvchi ota-onalar va o‘qituvchilar.",
        },
        problem: {
          title: {
            en: "The same course. Different starting points.",
            uz: "Kurs bitta. Bilim darajasi har xil.",
          },
          description: {
            en: "A fixed lesson sequence can ask one learner to repeat what they already know while moving another past a topic they have not understood. A test result alone does not explain the mistake or show what to study next.",
            uz: "Darslar hamma uchun bir xil tartibda berilsa, bir o‘quvchi bilganini qayta o‘qiydi, boshqasi esa tushunmagan mavzusini ortda qoldiradi. Test natijasining o‘zi xato sababini yoki keyin nimani o‘rganish kerakligini ko‘rsatmaydi.",
          },
        },
        solution: {
          title: {
            en: "A personal learning path, beyond the textbook.",
            uz: "Darslik emas — shaxsiy ta’lim yo‘li.",
          },
          description: {
            en: "Start with an assessment, make knowledge gaps visible, then connect them to lessons and targeted practice. BilimYo‘l’s product model uses each new result to adjust the next step, with Yo‘lchi AI explaining mistakes along the way.",
            uz: "Avval diagnostika orqali bilimdagi bo‘shliqlar aniqlanadi, keyin ularga mos dars va mashqlar tanlanadi. BilimYo‘l modelida har bir yangi natija keyingi qadamni moslashtirishga xizmat qiladi. Yo‘lchi AI esa xato sababini tushuntirib boradi.",
          },
        },
        roleSummary: {
          en: "I worked across the product concept, application architecture, MVP implementation and AI integration, connecting the learning journey with its web, mobile and backend components.",
          uz: "Mahsulot konsepsiyasi, ilova arxitekturasi, MVP yaratish va AI integratsiyasi ustida ishladim. O‘quv jarayonini veb, mobil va backend qismlari bilan bog‘ladim.",
        },
        architecture: {
          title: {
            en: "Web and mobile, connected by one backend.",
            uz: "Veb va mobil ilova, umumiy backend.",
          },
          description: {
            en: "Separate interfaces share learner accounts and progress data. Repository and service contracts keep the learning logic separate from screens and external integrations.",
            uz: "Alohida interfeyslar umumiy foydalanuvchi hisoblari va o‘quv natijalari bilan ishlaydi. Repository va service interfeyslari o‘quv mantiqini ekranlar hamda tashqi integratsiyalardan ajratadi.",
          },
          clients: [
            {
              title: { en: "Web application", uz: "Veb ilova" },
              description: { en: "React · TypeScript · Vite", uz: "React · TypeScript · Vite" },
            },
            {
              title: { en: "Mobile application", uz: "Mobil ilova" },
              description: { en: "Flutter · Dart · Riverpod", uz: "Flutter · Dart · Riverpod" },
            },
          ],
          platform: {
            title: { en: "Supabase", uz: "Supabase" },
            description: {
              en: "Shared authentication and learner data",
              uz: "Umumiy autentifikatsiya va o‘quvchi ma’lumotlari",
            },
          },
          services: [
            {
              title: { en: "PostgreSQL · RLS · RPC", uz: "PostgreSQL · RLS · RPC" },
              description: {
                en: "Progress records, role-based data access and rule-based assessment functions.",
                uz: "O‘quv natijalari, rolga mos ma’lumot ruxsatlari va aniq qoidalarga asoslangan baholash funksiyalari.",
              },
            },
            {
              title: { en: "Edge Functions · Gemini", uz: "Edge Functions · Gemini" },
              description: {
                en: "Lesson generation and tutoring through a server-side AI service. API credentials stay on the server.",
                uz: "Dars yaratish va tushuntirish uchun serverdagi AI xizmati. API kaliti serverda saqlanadi.",
              },
            },
          ],
          principle: {
            title: { en: "Yo‘lchi AI’s role", uz: "Yo‘lchi AI vazifasi" },
            description: {
              en: "Explain mistakes, generate lessons and practice, and provide educational feedback. The model does not assign scores, roles or permissions; those belong to application and backend rules.",
              uz: "Xatolarni tushuntirish, dars va mashqlar yaratish hamda o‘rganishga yordam beruvchi fikr bildirish. Model ball, rol yoki ruxsatlarni belgilamaydi — ular ilova va backend qoidalariga tegishli.",
            },
          },
        },
        learningLoop: {
          title: {
            en: "Each result shapes the next step.",
            uz: "Har bir natija keyingi qadamni belgilaydi.",
          },
          description: {
            en: "The learning model connects diagnosis, practice and feedback in a repeating cycle. A weak topic leads to reinforcement before the learner moves on.",
            uz: "O‘quv modeli diagnostika, mashq va tushuntirishni takrorlanuvchi jarayonga birlashtiradi. O‘quvchi keyingi mavzuga o‘tishdan oldin qiynalgan mavzusini mustahkamlaydi.",
          },
          phases: [
            {
              title: { en: "Understand", uz: "Aniqlash" },
              steps: [{ en: "Diagnosis", uz: "Diagnostika" }, { en: "Skill map", uz: "Bilim xaritasi" }],
              description: {
                en: "Identify strengths and knowledge gaps.",
                uz: "Kuchli tomonlar va bilimdagi bo‘shliqlar aniqlanadi.",
              },
            },
            {
              title: { en: "Learn", uz: "O‘rganish" },
              steps: [{ en: "Personalized roadmap", uz: "Shaxsiy o‘quv yo‘li" }, { en: "Lesson", uz: "Dars" }],
              description: {
                en: "Choose the next topic and work through it.",
                uz: "Keyingi mavzu tanlanadi va dars o‘tiladi.",
              },
            },
            {
              title: { en: "Assess", uz: "Baholash" },
              steps: [{ en: "Answer", uz: "Javob" }, { en: "Rule-based server scoring", uz: "Qoidalar asosida serverda baholash" }],
              description: {
                en: "Check the response against an answer key and update the skill score.",
                uz: "Javob to‘g‘ri javob bilan solishtirilib, ko‘nikma natijasi yangilanadi.",
              },
            },
            {
              title: { en: "Reinforce", uz: "Mustahkamlash" },
              steps: [{ en: "Yo‘lchi AI", uz: "Yo‘lchi AI" }, { en: "Targeted practice", uz: "Maqsadli mashq" }],
              description: {
                en: "Explain the mistake and practice the missing concept.",
                uz: "Xato tushuntiriladi va qiyin bo‘lgan tushuncha mashq qilinadi.",
              },
            },
            {
              title: { en: "Adapt", uz: "Moslashtirish" },
              steps: [{ en: "Route update", uz: "O‘quv yo‘lini yangilash" }, { en: "Reward & dashboard", uz: "Rag‘bat va natijalar paneli" }],
              description: {
                en: "Reflect the new result in the roadmap and progress view.",
                uz: "Yangi natija o‘quv yo‘li va natijalar panelida aks etadi.",
              },
            },
          ],
          note: {
            en: "This diagram describes the intended learning loop. The MVP’s generated-lesson interface is still being aligned with backend scoring.",
            uz: "Sxema ko‘zlangan o‘quv jarayonini ko‘rsatadi. MVP’da yaratilgan dars interfeysini backend baholashi bilan to‘liq bog‘lash davom etmoqda.",
          },
        },
        status: {
          title: { en: "An adaptive learning MVP.", uz: "Moslashuvchan ta’lim MVP talqini." },
          description: {
            en: "The MVP includes React and Flutter learning flows, Supabase integration, Yo‘lchi AI and parent, teacher and admin views on the web. The project was presented at the National AI Hackathon in Qarshi.",
            uz: "MVP tarkibida React va Flutter o‘quv jarayonlari, Supabase integratsiyasi, Yo‘lchi AI hamda veb ilovadagi ota-ona, o‘qituvchi va administrator panellari mavjud. Loyiha Qarshidagi Milliy AI xakatonida taqdim etilgan.",
          },
        },
        nextStep: {
          en: "Complete generated-lesson answer validation and verify the full learning journey across web and mobile.",
          uz: "Yaratilgan darslarda javoblarni tekshirish jarayonini yakunlash va o‘quv yo‘lini veb hamda mobil ilovada boshidan oxirigacha tekshirish.",
        },
      },
      visual: {
        kind: "flow",
        wordmark: "BILIMYO‘L",
        caption: {
          en: "Learning model / From diagnosis to targeted practice",
          uz: "O‘quv modeli / Diagnostikadan maqsadli mashqqacha",
        },
        steps: [
          { en: "Assessment", uz: "Diagnostika" },
          { en: "Learning path", uz: "O‘quv yo‘li" },
          { en: "Practice", uz: "Mashq" },
        ],
      },
    },
    {
      slug: "lexhub",
      title: "LexHub",
      icon: "scale",
      category: { en: "LegalTech / Mobile, Web & AI", uz: "LegalTech / Mobil, veb va AI" },
      summary: {
        en: "Making legal problems easier to understand through relevant legislation, clear guidance and document drafts.",
        uz: "Huquqiy muammolarni tushunishni osonlashtirish: tegishli qonunchilik, tushunarli yo‘l-yo‘riq va hujjat loyihalari.",
      },
      description: {
        en: "LexHub is a LegalTech platform for people in Uzbekistan to describe legal problems and explore understandable guidance based on legislation. It brings together legal sources and articles, document drafts, and an AI-supported experience.",
        uz: "LexHub — O‘zbekiston fuqarolari huquqiy muammolarini bayon qilishi va qonunchilikka asoslangan tushunarli yechimlar bilan tanishishi uchun LegalTech platforma. U huquqiy manbalar va moddalar, hujjat loyihalari hamda AI imkoniyatlarini birlashtiradi.",
      },
      contributions: [
        { en: "Mobile application architecture", uz: "Mobil ilova arxitekturasi" },
        { en: "Flutter development", uz: "Flutter bilan dasturlash" },
        { en: "UI / UX implementation", uz: "UI / UX dizaynini amalga oshirish" },
        { en: "Supabase integration", uz: "Supabase integratsiyasi" },
        { en: "Authentication", uz: "Autentifikatsiya" },
        { en: "Database integration", uz: "Ma’lumotlar bazasi integratsiyasi" },
        { en: "AI features", uz: "AI imkoniyatlari" },
        {
          en: "Legal document and source presentation flow",
          uz: "Huquqiy hujjatlar va manbalarni taqdim etish jarayoni",
        },
        { en: "Product development", uz: "Mahsulotni ishlab chiqish" },
      ],
      technologies: [
        "Flutter",
        "Dart",
        "Material Design 3",
        "Supabase",
        "PostgreSQL",
        "AI / LLM",
        "Vercel",
      ],
      featured: true,
      liveUrl: "https://lexhub-theta.vercel.app",
      visual: {
        kind: "editorial",
        wordmark: "LEXHUB",
        caption: {
          en: "Project cover / Legal guidance",
          uz: "Loyiha muqovasi / Huquqiy yordam",
        },
        steps: [
          { en: "Problem", uz: "Muammo" },
          { en: "Sources", uz: "Manbalar" },
          { en: "Guidance", uz: "Yo‘l-yo‘riq" },
        ],
      },
    },
    {
      slug: "cosmoplus",
      title: "CosmoPlus",
      icon: "shopping",
      category: { en: "Mobile Commerce", uz: "Mobil savdo" },
      summary: {
        en: "A mobile commerce experience for discovering perfumes and creams.",
        uz: "Atirlar va kremlarni ko‘rib chiqish uchun mobil savdo ilovasi.",
      },
      description: {
        en: "CosmoPlus is a mobile commerce application for perfumes and creams. The product focuses on browsing products through a clear shopping interface and responsive mobile layouts built with Flutter.",
        uz: "CosmoPlus — atirlar va kremlar uchun mobil savdo ilovasi. Unda mahsulotlarni qulay savdo interfeysi orqali ko‘rib chiqish va Flutter yordamida moslashuvchan mobil ekranlar yaratishga e’tibor qaratilgan.",
      },
      contributions: [
        { en: "Mobile development", uz: "Mobil dasturlash" },
        { en: "Flutter UI implementation", uz: "Flutter interfeysini yaratish" },
        { en: "E-commerce interface", uz: "Elektron savdo interfeysi" },
        { en: "Product browsing", uz: "Mahsulotlarni ko‘rib chiqish" },
        { en: "Application architecture", uz: "Ilova arxitekturasi" },
        { en: "Responsive mobile UI", uz: "Moslashuvchan mobil interfeys" },
      ],
      technologies: ["Flutter", "Dart", "Material Design 3"],
      visual: {
        kind: "editorial",
        wordmark: "COSMOPLUS",
        caption: {
          en: "Project cover / Mobile commerce",
          uz: "Loyiha muqovasi / Mobil savdo",
        },
      },
    },
    {
      slug: "kamoliddin-pharmacy",
      title: "Kamoliddin Pharmacy Telegram Bot",
      icon: "map",
      category: { en: "Telegram / Business automation", uz: "Telegram / Biznesni avtomatlashtirish" },
      summary: {
        en: "A multilingual Telegram flow that helps customers find pharmacy branches by region and district.",
        uz: "Hudud va tuman orqali dorixona filiallarini topishga yordam beradigan ko‘p tilli Telegram bot.",
      },
      description: {
        en: "The Kamoliddin Pharmacy Telegram Bot helps a pharmacy chain’s customers find relevant branches by area. In Uzbek, English or Russian, customers select a region and district, then find a pharmacy branch and its location.",
        uz: "Kamoliddin Pharmacy Telegram Bot dorixonalar tarmog‘i mijozlariga hudud bo‘yicha tegishli filialni topishga yordam beradi. Foydalanuvchi o‘zbek, ingliz yoki rus tilini tanlab, viloyat va tuman orqali dorixona filiali hamda uning manzilini topadi.",
      },
      contributions: [
        { en: "Bot architecture", uz: "Bot arxitekturasi" },
        { en: "User journey", uz: "Foydalanish jarayoni" },
        { en: "Multilingual navigation", uz: "Ko‘p tilli navigatsiya" },
        {
          en: "Region and district selection",
          uz: "Viloyat va tumanni tanlash",
        },
        {
          en: "Pharmacy location flow",
          uz: "Dorixona manzilini topish jarayoni",
        },
        { en: "Telegram bot development", uz: "Telegram bot yaratish" },
      ],
      technologies: [],
      visual: {
        kind: "flow",
        wordmark: "KAMOLIDDIN",
        caption: {
          en: "Product flow / Find a pharmacy",
          uz: "Ishlash jarayoni / Dorixonani topish",
        },
        steps: [
          { en: "Language", uz: "Til" },
          { en: "Region", uz: "Viloyat" },
          { en: "District", uz: "Tuman" },
          { en: "Branch", uz: "Filial" },
          { en: "Location", uz: "Manzil" },
        ],
      },
    },
  ],
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/PirimovUktam",
      icon: "github",
    },
    {
      name: "Telegram",
      url: "https://t.me/Pirimov_Uktam",
      icon: "send",
    },
  ],
  footer: {
    note: {
      en: "Mobile, full-stack and AI development.",
      uz: "Mobil, Full-Stack va AI dasturlash.",
    },
  },
};
