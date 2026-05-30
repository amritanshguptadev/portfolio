// ─────────────────────────────────────────────────────────────────────────────
// constants/skills.ts
// All skill data grouped into categories with full TypeScript types.
// ─────────────────────────────────────────────────────────────────────────────

export interface SkillCategory {
  /** Display title for the category group */
  title: string;
  /** Emoji icon representing the category */
  icon: string;
  /** Ordered list of skill / tool names */
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title:  "Frontend & Frameworks",
    icon:   "🖥️",
    skills: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Astro",
      "Flask",
      "React",
    ],
  },
  {
    title:  "Languages",
    icon:   "📝",
    skills: [
      "C++",
      "Python",
    ],
  },
  {
    title:  "AI & Prototyping",
    icon:   "🤖",
    skills: [
      "Claude API",
      "Groq API",
      "ChatGPT",
      "Cursor",
      "v0 by Vercel",
      "Bolt.new",
      "Lovable",
      "Gemini",
      "AWS",
    ],
  },
  {
    title:  "DevOps & Tooling",
    icon:   "🛠️",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "VS Code",
      "Antigravity",
    ],
  },
  {
    title:  "Creative & Office",
    icon:   "🎨",
    skills: [
      "Canva",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Microsoft Office",
      "Google Workspace",
    ],
  },
];
