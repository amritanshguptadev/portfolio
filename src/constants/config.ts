// ─────────────────────────────────────────────────────────────────────────────
// constants/config.ts
// Single source of truth for personal info, contact links, and site metadata.
// Import this anywhere — never hardcode these values inside components.
// ─────────────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  /** Full display name */
  name: string;
  /** One-line professional tagline shown in the hero */
  tagline: string;
  /** Short bio for the hero / meta description (~2 sentences) */
  bio_short: string;
  /** Extended bio for the About page */
  bio_long: string;
  /** Contact email */
  email: string;
  /** Contact phone (E.164 format) */
  phone: string;
  /** Physical location */
  location: string;
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** Path / URL to downloadable résumé */
  resume_url: string;
  /** Current CGPA string */
  cgpa: string;
  /** HTML <title> tag string */
  html: { title: string };
}

export const config: SiteConfig = {
  name:       "Amritansh Gupta",
  tagline:    "Frontend Developer · AI Builder · BCA Student",
  bio_short:
    "I build software that feels good to use. Computer Science student at Dev Sanskriti Vishwavidyalaya, Haridwar. Currently open to remote internships worldwide.",
  bio_long:
    "I started building for the web because I wanted to make things people could actually use. MindMetric came from a real question — can psychological tools be genuinely private and still feel polished? GitGlow proved I could build without relying on frameworks. I learn fast, take ownership of what I build, and I am just as comfortable figuring something out alone as I am collaborating with a team.",
  email:      "amritansh.gupta.dev@gmail.com",
  phone:      "+91 8707368632",
  location:   "Haridwar, Uttarakhand, India",
  github:     "https://github.com/amritanshguptadev",
  linkedin:   "https://www.linkedin.com/in/amritanshguptadev",
  resume_url: "/resume.pdf",
  cgpa:       "8.26",
  html: {
    title: "Amritansh Gupta | Portfolio",
  },
};
