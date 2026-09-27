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

export interface Project {
  slug: string;
  title: string;
  icon: IconName;
  category: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  image?: PortfolioImage;
  screenshots?: PortfolioImage[];
  visual: {
    kind: "editorial" | "flow";
    wordmark: string;
    caption: LocalizedText;
    steps?: LocalizedText[];
  };
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
    myContribution: LocalizedText;
    technologies: LocalizedText;
    nextProject: LocalizedText;
    contactLabel: LocalizedText;
    backToTop: LocalizedText;
    projectIndex: LocalizedText;
    focus: LocalizedText;
    emailAction: LocalizedText;
    notFound: {
      title: LocalizedText;
      description: LocalizedText;
      backHome: LocalizedText;
    };
  };
  sections: Record<
    "work" | "about" | "expertise" | "services" | "journey" | "contact",
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
  projects: Project[];
  socials: { name: string; url: string; icon: "github" | "send" }[];
  footer: { note: LocalizedText };
}

const notFound = {
  title: {
    en: "This page is off the map.",
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
      en: "Pirimov O'ktam — Mobile, Web & AI",
      uz: "Pirimov O'ktam — Mobil, Veb va AI",
    },
    description: {
      en: "Pirimov O'ktam is a Mobile & Full-Stack Developer and AI Engineer in Qarshi, Uzbekistan, building practical digital products with Flutter, web technologies and AI.",
      uz: "Pirimov O'ktam — Qarshidagi mobil va Full-Stack dasturchi, AI muhandisi. Flutter, veb texnologiyalar va AI yordamida amaliy raqamli mahsulotlar yarataman.",
    },
    // Add your real production URL here when a domain is connected.
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
    name: "Pirimov O'ktam",
    role: {
      en: "Mobile & Full-Stack Developer | AI Engineer",
      uz: "Mobil va Full-Stack dasturchi | AI muhandisi",
    },
    bio: {
      en: "I build modern digital products that solve real problems using Flutter, full-stack development and AI. My focus is on clean architecture, thoughtful user experience, and mobile and web products with practical value.",
      uz: "Men Flutter, Full-Stack development va AI texnologiyalari yordamida real muammolarni hal qiladigan zamonaviy raqamli mahsulotlar yarataman. Asosiy e’tiborim — clean architecture, yaxshi user experience va amaliy qiymatga ega mobil va veb mahsulotlar yaratish.",
    },
    shortBio: {
      en: "Practical digital products. Clear experiences. Purposeful code.",
      uz: "Amaliy raqamli mahsulotlar. Qulay tajriba. Maqsadli kod.",
    },
    location: { en: "Qarshi, Uzbekistan", uz: "Qarshi, O‘zbekiston" },
    image: {
      src: "/images/profile/oktam-pirimov.webp",
      alt: {
        en: "Portrait of Pirimov O'ktam",
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
      en: "Turning ideas into products that solve real problems.",
      uz: "G‘oyadan real muammoni hal qiladigan mahsulotgacha.",
    },
    primaryAction: { en: "Explore my work", uz: "Loyihalarimni ko‘rish" },
    secondaryAction: { en: "Get in touch", uz: "Bog‘lanish" },
    scrollHint: { en: "Scroll to explore", uz: "Pastga aylantiring" },
  },
  nav: [
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
    liveDemo: { en: "Live demo", uz: "Jonli demo" },
    sourceCode: { en: "Source code", uz: "Manba kodi" },
    backToProjects: { en: "Back to projects", uz: "Loyihalarga qaytish" },
    projectOverview: { en: "Project overview", uz: "Loyiha haqida" },
    myContribution: { en: "My contribution", uz: "Mening hissam" },
    technologies: { en: "Technologies", uz: "Texnologiyalar" },
    nextProject: { en: "Next project", uz: "Keyingi loyiha" },
    contactLabel: { en: "Get in touch", uz: "Bog‘lanish" },
    backToTop: { en: "Back to top", uz: "Yuqoriga qaytish" },
    projectIndex: { en: "Project index", uz: "Loyihalar ro‘yxati" },
    focus: { en: "Focus", uz: "Yo‘nalish" },
    emailAction: { en: "Start a conversation", uz: "Suhbat boshlash" },
    notFound,
  },
  sections: {
    work: {
      eyebrow: { en: "Selected work", uz: "Tanlangan loyihalar" },
      heading: { en: "Ideas into products.", uz: "G‘oyadan mahsulotgacha." },
      intro: {
        en: "Legal guidance, mobile commerce and a practical location finder. Different problems, a shared focus on useful experiences.",
        uz: "Huquqiy yordam, mobil savdo va dorixona manzilini izlash. Turli muammolar, yagona maqsad — foydali va qulay tajriba.",
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
        { en: "Prompt Engineering", uz: "Promptlarni ishlab chiqish" },
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
        uz: "Flutter yordamida Android va iOS uchun qulay interfeys hamda tushunarli arxitekturaga ega cross-platform ilovalar yaratish.",
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
        en: "Bachelor’s Degree · Computer Engineer",
        uz: "Bakalavr · Kompyuter muhandisi",
      },
      description: {
        en: "Bachelor’s education in Information Systems and Technologies, with a Computer Engineer specialty.",
        uz: "Axborot tizimlari va texnologiyalari yo‘nalishi bo‘yicha bakalavr ta’limi. Mutaxassislik — Kompyuter muhandisi.",
      },
    },
  ],
  projects: [
    {
      slug: "lexhub",
      title: "LexHub",
      icon: "scale",
      category: { en: "LegalTech / Mobile & AI", uz: "LegalTech / Mobil va AI" },
      summary: {
        en: "Making legal problems easier to understand—with relevant legislation, clear guidance and document drafts.",
        uz: "Huquqiy muammolarni tushunishni osonlashtirish: tegishli qonunchilik, tushunarli yo‘l-yo‘riq va hujjat loyihalari.",
      },
      description: {
        en: "LexHub is a LegalTech platform for people in Uzbekistan to describe legal problems and explore understandable guidance based on legislation. It brings together legal sources and articles, document drafts, and an AI-supported experience.",
        uz: "LexHub — O‘zbekiston fuqarolari huquqiy muammolarini bayon qilishi va qonunchilikka asoslangan tushunarli yechimlar bilan tanishishi uchun LegalTech platforma. U huquqiy manbalar va moddalar, hujjat loyihalari hamda AI imkoniyatlarini birlashtiradi.",
      },
      contributions: [
        { en: "Mobile application architecture", uz: "Mobil ilova arxitekturasi" },
        { en: "Flutter development", uz: "Flutter dasturlash" },
        { en: "UI / UX implementation", uz: "UI / UX dizaynini amalga oshirish" },
        { en: "Supabase integration", uz: "Supabase integratsiyasi" },
        { en: "Authentication", uz: "Autentifikatsiya" },
        { en: "Database integration", uz: "Ma’lumotlar bazasi integratsiyasi" },
        { en: "AI functionality", uz: "AI funksionalligi" },
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
      category: { en: "Telegram / Location Finder", uz: "Telegram / Manzil izlash" },
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
        { en: "User flow", uz: "Foydalanuvchi jarayoni" },
        { en: "Multilingual flow", uz: "Ko‘p tilli ishlash jarayoni" },
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
      en: "Built with purpose. Made with code.",
      uz: "Maqsad bilan yaratilgan. Kod bilan qurilgan.",
    },
  },
};
