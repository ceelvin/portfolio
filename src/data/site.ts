export const siteConfig = {
  name: "Celvin Kuhn",
  title: "Full Stack Developer & UI/UX Designer",
  tagline:
    "Building elegant, user-centered applications that solve real problems and scale with purpose.",
  email: "contact@celvin.dev",
  location: "Mannheim, Germany",
  github: "https://github.com/ceelvin",
  linkedin: "https://linkedin.com/in/celvin-kuhn/",
  available: true,
  siteUrl: "https://celvin.dev",
  languages: ["German (native)", "English (fluent)"],
  timezone: "Europe/Berlin (CET/CEST)",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

type SkillProficiency = "core" | "learning";

type Skill = {
  name: string;
  category: "Frontend" | "Backend" | "Tools";
  proficiency: SkillProficiency;
};

export const skills: Skill[] = [
  { name: "Angular", category: "Frontend", proficiency: "core" },
  { name: "TypeScript", category: "Frontend", proficiency: "core" },
  { name: "JavaScript", category: "Frontend", proficiency: "core" },
  { name: "HTML/CSS", category: "Frontend", proficiency: "core" },
  { name: "Tailwind CSS", category: "Frontend", proficiency: "core" },
  { name: "Next.js", category: "Frontend", proficiency: "core" },
  { name: "React", category: "Frontend", proficiency: "core" },
  { name: "G6 Graph", category: "Frontend", proficiency: "core" },
  { name: "Framer Motion", category: "Frontend", proficiency: "learning" },
  { name: "shadcn/ui", category: "Frontend", proficiency: "learning" },
  { name: "Node.js", category: "Backend", proficiency: "core" },
  { name: "Python", category: "Backend", proficiency: "learning" },
  { name: "AWS", category: "Backend", proficiency: "learning" },
  { name: "LLMs", category: "Backend", proficiency: "learning" },
  { name: "Prompt Engineering", category: "Backend", proficiency: "learning" },
  { name: "RAG", category: "Backend", proficiency: "learning" },
  { name: "AI Agents", category: "Backend", proficiency: "learning" },
  { name: "LangChain", category: "Backend", proficiency: "learning" },
  { name: "Docker", category: "Backend", proficiency: "core" },
  { name: "Git", category: "Tools", proficiency: "core" },
  { name: "GitHub", category: "Tools", proficiency: "core" },
  { name: "CI/CD", category: "Tools", proficiency: "core" },
];

export const journey = [
  {
    year: "2025 – Present",
    title: "Full Stack Developer",
    company: "Accenture",
    description:
      "Building full-stack applications for client projects — consulting on customer needs and delivering tailored solutions.",
    bullets: [
      "Developing a client-facing app end to end",
      "Translating business requirements into scalable solutions",
      "Collaborating with cross-functional teams on delivery",
    ],
  },
  {
    year: "2024 – 2025",
    title: "Software Developer",
    company: "Camelot ITLab",
    description:
      "Developed new features, resolved critical bugs, and maintained cross-platform applications.",
    bullets: [
      "Shipped features across frontend and backend stacks",
      "Fixed production-critical bugs under tight timelines",
      "Maintained and improved existing application modules",
    ],
  },
  {
    year: "2023 – 2024",
    title: "Junior Developer",
    company: "Camelot ITLab",
    description:
      "Contributed to SCM application frontend development, optimizing UI/UX for supply chain management.",
    bullets: [
      "Built and refined SCM dashboard UI components",
      "Improved usability for supply chain workflows",
      "Worked within an established Angular codebase",
    ],
  },
  {
    year: "2020 – 2023",
    title: "Trainee",
    company: "Camelot ITLab",
    description:
      "Built data model visualization tools and version control features for collaborative app management.",
    bullets: [
      "Created DataModel UI with interactive G6 graph visualizations",
      "Developed version control features for collaborative editing",
      "Learned full-stack development in a product team setting",
    ],
  },
];

export type ProjectBadge = "trainee" | "hackathon" | "private";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  gradient: string;
  badge: ProjectBadge;
  /** Personal / hackathon work — excludes e.g. trainee or employer projects */
  isPrivate: boolean;
};

export const projects: Project[] = [
  {
    title: "DataModel UI",
    description:
      "Camelot ITLab trainee project (2020–2023) — web app for designing and visualizing data models with interactive node-edge graph visualizations powered by AntV G6.",
    technologies: ["Angular", "Node.js", "TypeScript", "G6 Graph"],
    image: "/images/projects/datamodel-ui.svg",
    liveUrl: null,
    githubUrl: null,
    gradient: "from-cyan-500/20 to-blue-600/30",
    badge: "trainee",
    isPrivate: false,
  },
  {
    title: "MediMind",
    description:
      "Medical Valley EMN Healthcare Hackathon 2025 — app delivering personalized meal plans and coaching for patients recovering from illness.",
    technologies: ["React", "TypeScript", "Python", "AWS"],
    image: "/images/projects/medimind.svg",
    liveUrl: null,
    githubUrl: "https://github.com/perryrh0dan/healthcare_hackathon_2025",
    gradient: "from-emerald-500/20 to-cyan-600/30",
    badge: "hackathon",
    isPrivate: true,
  },
  {
    title: "Voidlights",
    description:
      "Encode Club London hackathon 2026 — a neon-lit 2D roguelite survival shooter in deep space. Survive escalating waves, stack mid-run upgrades from supply drops, and unlock fighters between runs. Solo with save/continue or Steam co-op for up to six players via GodotSteam.",
    technologies: ["Godot 4.6", "GDScript", "GodotSteam", "Steam API"],
    image: "/images/projects/voidlights.png",
    liveUrl: null,
    githubUrl: null,
    gradient: "from-fuchsia-500/20 to-violet-600/30",
    badge: "hackathon",
    isPrivate: true,
  },
];

export const projectBadgeLabels: Record<ProjectBadge, string> = {
  trainee: "Trainee",
  hackathon: "Hackathon",
  private: "Private",
};

export const projectBadgeStyles: Record<ProjectBadge, string> = {
  trainee: "border-blue-400/40 bg-blue-400/10 text-blue-300",
  hackathon: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300",
  private: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

export const bio = {
  summary:
    "I'm a full-stack developer who loves building apps and websites that make life easier for people. What drives me? Figuring out tough problems by creating simple, user-friendly designs. I get excited about working with teams to try new things and build stuff that really helps and connects with folks.",
  highlights: ["Problem Solver", "Team Player", "Innovation Driver"],
  stats: [
    { value: "5+", label: "Years Coding" },
    { value: "22", label: "Technologies" },
    { value: String(projects.length), label: "Projects" },
    {
      value: String(projects.filter((p) => p.isPrivate).length),
      label: "Private Projects",
    },
  ],
};