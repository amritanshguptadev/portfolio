// ─────────────────────────────────────────────────────────────────────────────
// constants/projects.ts
// All portfolio project data — using real screenshots from /public.
// ─────────────────────────────────────────────────────────────────────────────

export type TProject = {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCodeLink: string;
  liveLink?: string;
};

export const projects: TProject[] = [
  {
    name: "MindMetric",
    description:
      "A privacy-first psychological assessment platform with five peer-reviewed instruments: Big Five, PHQ-9, GAD-7, RSES, and ECR-R. Features AI-powered insights via Groq API, downloadable PDF reports, and a personal dashboard. Fully client-side — zero backend, no accounts, no data transmitted.",
    tags: [
      { name: "Groq API",    color: "blue-text-gradient"   },
      { name: "HTML5",       color: "green-text-gradient"  },
      { name: "JavaScript",  color: "pink-text-gradient"   },
    ],
    image:          "/project_mindmetric.png",
    sourceCodeLink: "https://github.com/amritanshguptadev/mindmetric",
    liveLink:       "https://mindmetric-orpin.vercel.app",
  },
  {
    name: "GitGlow",
    description:
      "A zero-dependency GitHub analytics dashboard consuming the GitHub Public REST API. Features animated language charts, star rankings, and contribution streaks built with vanilla JavaScript Canvas. Fully responsive and deployed on Vercel.",
    tags: [
      { name: "Vanilla JS",      color: "blue-text-gradient"   },
      { name: "Canvas API",      color: "green-text-gradient"  },
      { name: "GitHub REST API", color: "pink-text-gradient"   },
    ],
    image:          "/project_gitglow.png",
    sourceCodeLink: "https://github.com/amritanshguptadev/gitglow",
    liveLink:       "https://gitglow-inky.vercel.app",
  },
  {
    name: "YogaFlow Pro",
    description:
      "A full-stack session booking platform built with Astro v5, React 19, and Tailwind CSS. Features session scheduling, Indian localization, responsive mobile-first UI, and a CI/CD pipeline that auto-deploys to Vercel on every GitHub push.",
    tags: [
      { name: "Astro v5",       color: "blue-text-gradient"   },
      { name: "React 19",       color: "green-text-gradient"  },
      { name: "Tailwind CSS",   color: "pink-text-gradient"   },
    ],
    image:          "/project_yogaflow.png",
    sourceCodeLink: "https://github.com/amritanshguptadev/yogaflow-pro",
    liveLink:       "https://yogaflow-pro.vercel.app",
  },
  {
    name: "FakeBuster",
    description:
      "An AI-assisted misinformation detection tool that lets users paste any claim, headline, or WhatsApp forward and get an instant verdict with evidence, a confidence score, and shareable proof. Built with Python, Flask, HTML5, and CSS3.",
    tags: [
      { name: "Python",  color: "blue-text-gradient"   },
      { name: "Flask",   color: "green-text-gradient"  },
      { name: "HTML5",   color: "pink-text-gradient"   },
    ],
    image:          "/project_fakebuster.png",
    sourceCodeLink: "https://github.com/amritanshguptadev/FakeBuster",
  },
  {
    name: "Incredible India",
    description:
      "A visually immersive web experience showcasing the cultural and geographical diversity of India. Built with modern web technologies and a focus on visual storytelling, featuring 36+ states, 3000+ years of history, and 1.4B stories.",
    tags: [
      { name: "HTML5",      color: "blue-text-gradient"   },
      { name: "CSS3",       color: "green-text-gradient"  },
      { name: "JavaScript", color: "pink-text-gradient"   },
    ],
    image:          "/project_incredible_india.png",
    sourceCodeLink: "https://github.com/amritanshguptadev/incredible-india",
  },
  {
    name: "3D Portfolio",
    description:
      "This very portfolio — built with React 18, TypeScript, Framer Motion, and Vite. Multi-page routing, dark/light theme, Google Sheets contact form, responsive design, and animated particle background. Deployed on Vercel.",
    tags: [
      { name: "React 18",      color: "blue-text-gradient"  },
      { name: "TypeScript",    color: "green-text-gradient" },
      { name: "Framer Motion", color: "pink-text-gradient"  },
    ],
    image:          "/project_portfolio3d.png",
    sourceCodeLink: "https://github.com/amritanshguptadev",
  },
];
