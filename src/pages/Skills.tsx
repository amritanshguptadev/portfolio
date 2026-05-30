import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useTheme } from "../context/ThemeContext";

/* ── Theme-safe color resolver ──────────────────────────
   In light mode:
   • Pure-white icons (#ffffff) → readable dark slate-indigo
   • Bright yellows that wash out (#F7DF1E, #FCC624) → deep amber
   In dark mode: original vivid color is always returned.
──────────────────────────────────────────────────────── */
const LIGHT_COLOR_MAP: Record<string, string> = {
  "#ffffff": "#334155",  // Next.js / Three.js / Flask / GitHub / Vercel → slate-800
  "#F7DF1E": "#92600A",  // JavaScript bright-yellow → deep amber
  "#FCC624": "#7A5200",  // Linux yellow → dark amber-brown
};

function useDisplayColor(rawColor: string): string {
  const { theme } = useTheme();
  if (theme === "dark") return rawColor;
  return LIGHT_COLOR_MAP[rawColor] ?? rawColor;
}

/* ── Tech icon map (devicons CDN) ───────────────────── */
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

type Skill = {
  name: string;
  cat: string;
  icon: string;
  color: string;
};

const SKILLS: Skill[] = [
  /* Frontend */
  { name: "React",      cat: "Frontend",  icon: `${CDN}/react/react-original.svg`,           color: "#61DAFB" },
  { name: "TypeScript", cat: "Frontend",  icon: `${CDN}/typescript/typescript-original.svg`,  color: "#3178C6" },
  { name: "HTML5",      cat: "Frontend",  icon: `${CDN}/html5/html5-original.svg`,            color: "#E34F26" },
  { name: "CSS3",       cat: "Frontend",  icon: `${CDN}/css3/css3-original.svg`,              color: "#264DE4" },
  { name: "Tailwind",   cat: "Frontend",  icon: `${CDN}/tailwindcss/tailwindcss-original.svg`,color: "#38BDF8" },
  /* Languages */
  { name: "JavaScript", cat: "Language",  icon: `${CDN}/javascript/javascript-original.svg`,  color: "#F7DF1E" },
  { name: "C++",        cat: "Language",  icon: `${CDN}/cplusplus/cplusplus-original.svg`,    color: "#00599C" },
  { name: "Python",     cat: "Language",  icon: `${CDN}/python/python-original.svg`,          color: "#3776AB" },
  /* Frameworks */
  { name: "Astro",      cat: "Framework", icon: `${CDN}/astro/astro-original.svg`,            color: "#FF5D01" },
  { name: "Next.js",    cat: "Framework", icon: `${CDN}/nextjs/nextjs-original.svg`,          color: "#ffffff"  },
  { name: "Vite",       cat: "Framework", icon: `${CDN}/vite/vite-original.svg`,              color: "#646CFF" },
  { name: "Three.js",   cat: "Framework", icon: `${CDN}/threejs/threejs-original.svg`,        color: "#ffffff"  },
  { name: "Flask",      cat: "Framework", icon: `${CDN}/flask/flask-original.svg`,            color: "#ffffff"  },
  /* Backend & Tools */
  { name: "Node.js",    cat: "Backend",   icon: `${CDN}/nodejs/nodejs-original.svg`,          color: "#339933" },
  { name: "Git",        cat: "Tools",     icon: `${CDN}/git/git-original.svg`,                color: "#F05032" },
  { name: "GitHub",     cat: "Tools",     icon: `${CDN}/github/github-original.svg`,          color: "#ffffff"  },
  { name: "VS Code",    cat: "Tools",     icon: `${CDN}/vscode/vscode-original.svg`,          color: "#007ACC" },
  { name: "Docker",     cat: "Tools",     icon: `${CDN}/docker/docker-original.svg`,          color: "#2496ED" },
  { name: "Linux",      cat: "Tools",     icon: `${CDN}/linux/linux-original.svg`,            color: "#FCC624" },
  { name: "Vercel",     cat: "Tools",     icon: `${CDN}/vercel/vercel-original.svg`,          color: "#ffffff"  },
  /* Design */
  { name: "Canva",      cat: "Design",    icon: `${CDN}/canva/canva-original.svg`,            color: "#00C4CC" },
  { name: "Photoshop",  cat: "Design",    icon: `${CDN}/photoshop/photoshop-original.svg`,    color: "#31A8FF" },
  { name: "Figma",      cat: "Design",    icon: `${CDN}/figma/figma-original.svg`,            color: "#F24E1E" },
  /* AI & Cloud */
  { name: "AWS",        cat: "AI & Cloud",icon: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, color: "#FF9900" },
];

const CATEGORIES = ["All", "Frontend", "Language", "Framework", "Backend", "Tools", "Design", "AI & Cloud"];

const CAT_COLOR: Record<string, string> = {
  All:          "#E8A045",
  Frontend:     "#61DAFB",
  Language:     "#E8A045",
  Framework:    "#646CFF",
  Backend:      "#339933",
  Tools:        "#F05032",
  Design:       "#F24E1E",
  "AI & Cloud": "#FF9900",
};

/* ── Vibe-Coding Terminal ─────────────────────────── */
const CODE_LINES = [
  { text: "const amritansh = new Developer({", color: "#E8A045" },
  { text: '  name: "Amritansh Gupta",', color: "#61DAFB" },
  { text: '  stack: ["React", "TypeScript", "Node.js"],', color: "#86efac" },
  { text: '  passion: "Building things that matter",', color: "#c4b5fd" },
  { text: "  available: true,  // ✅ Open to Internship", color: "#6ee7b7" },
  { text: "});", color: "#E8A045" },
  { text: "", color: "" },
  { text: "amritansh.buildProject({", color: "#f9a8d4" },
  { text: '  idea: "✨ something beautiful",', color: "#fcd34d" },
  { text: '  tools: ["Vite", "Framer Motion", "AI"],', color: "#7dd3fc" },
  { text: '  deployTo: "vercel.app",', color: "#6ee7b7" },
  { text: "});", color: "#f9a8d4" },
  { text: "", color: "" },
  { text: "// 🚀 Shipped 6+ live projects", color: "#94a3b8" },
  { text: "// 🏆 2x Hackathon Winner", color: "#94a3b8" },
  { text: "// 🎓 CGPA: 8.26 | BCA Hons", color: "#94a3b8" },
];

const VibeTerminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const currentLine = CODE_LINES[visibleLines];
    if (charCount < currentLine.text.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setCharCount(0);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines, charCount]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [visibleLines, charCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(107,72,255,0.3)",
        boxShadow: "0 0 40px rgba(107,72,255,0.12), 0 0 80px rgba(232,160,69,0.06)",
        background: "#0d0d14",
        flex: "1 1 480px",
        maxWidth: 580,
      }}
    >
      {/* Window chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.85rem 1.25rem",
        background: "#161623",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56", display: "block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E", display: "block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F", display: "block" }} />
        <span style={{ flex: 1, textAlign: "center", fontFamily: "monospace", fontSize: "0.72rem", color: "#555", letterSpacing: "0.08em" }}>
          amritansh.dev — vscode
        </span>
      </div>

      {/* Code area */}
      <div
        ref={termRef}
        style={{
          padding: "1.5rem 1.75rem",
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
          fontSize: "0.82rem",
          lineHeight: 1.9,
          minHeight: 320,
          maxHeight: 380,
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {/* Line numbers + completed lines */}
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ color: "#444", minWidth: 20, userSelect: "none", textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ color: line.color || "#e2e8f0" }}>{line.text}</span>
          </div>
        ))}
        {/* Currently typing line */}
        {visibleLines < CODE_LINES.length && (
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ color: "#444", minWidth: 20, userSelect: "none", textAlign: "right", flexShrink: 0 }}>{visibleLines + 1}</span>
            <span style={{ color: CODE_LINES[visibleLines].color || "#e2e8f0" }}>
              {CODE_LINES[visibleLines].text.slice(0, charCount)}
              <span style={{
                display: "inline-block", width: 2, height: "1em",
                background: "#6B48FF", marginLeft: 1, verticalAlign: "text-bottom",
                animation: "cursorBlink 1s step-end infinite",
              }} />
            </span>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "1.5rem",
        padding: "0.45rem 1.25rem",
        background: "#6B48FF",
        fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)",
      }}>
        <span>⎇ main</span>
        <span>TypeScript</span>
        <span style={{ marginLeft: "auto" }}>Ln {Math.min(visibleLines + 1, CODE_LINES.length)}, Col {charCount + 1}</span>
        <span>UTF-8</span>
      </div>

      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </motion.div>
  );
};



/* ── Skill card (grid) ────────────────────────────── */
const SkillCard = ({ skill, i }: { skill: Skill; i: number }) => {
  // displayColor is theme-safe: white/yellow map to readable dark equivalents in light mode
  const displayColor = useDisplayColor(skill.color);
  // rawColor is still used for icon filter logic (the CSS var handles inversion)
  const isWhiteIcon = skill.color === "#ffffff";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: i * 0.04, duration: 0.4 }}
      layout
    >
      <Tilt
        tiltMaxAngleX={14}
        tiltMaxAngleY={14}
        glareEnable
        glareMaxOpacity={0.15}
        glareColor={displayColor}
        glarePosition="all"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          style={{
            padding: "1.75rem 1.25rem 1.5rem",
            borderRadius: 20,
            background: "var(--color-card)",
            border: `1px solid ${displayColor}28`,
            textAlign: "center",
            cursor: "default",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            height: "100%",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${displayColor}60`;
            el.style.boxShadow = `0 0 28px ${displayColor}28`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${displayColor}28`;
            el.style.boxShadow = "none";
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${displayColor}99, transparent)`,
          }} />
          {/* Radial glow behind icon */}
          <div style={{
            position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
            width: 90, height: 90, borderRadius: "50%",
            background: `radial-gradient(circle, ${displayColor}18 0%, transparent 70%)`,
            filter: "blur(14px)", pointerEvents: "none",
          }} />

          {/* Icon — white-icon skills get a tinted dark bg in light mode so the icon is visible */}
          <div style={{
            width: 58, height: 58, margin: "0 auto 1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 16,
            background: isWhiteIcon
              ? "var(--white-icon-bg, rgba(0,0,0,0.08))"
              : `${displayColor}14`,
            border: `1px solid ${displayColor}30`,
            padding: "0.65rem",
            position: "relative", zIndex: 1,
          }}>
            <img
              src={skill.icon}
              alt={skill.name}
              style={{
                width: 34, height: 34, objectFit: "contain",
                filter: isWhiteIcon ? "var(--white-icon-filter, brightness(0.75))" : "none",
              }}
              loading="lazy"
            />
          </div>

          {/* Skill name — always uses CSS var, already theme-correct */}
          <p style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "0.88rem", color: "var(--color-heading)", marginBottom: "0.5rem",
            position: "relative", zIndex: 1,
          }}>
            {skill.name}
          </p>

          {/* Category badge — uses displayColor, readable on both themes */}
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "0.64rem", fontWeight: 600,
            color: displayColor,
            textTransform: "uppercase", letterSpacing: "0.08em",
            background: `${displayColor}14`,
            border: `1px solid ${displayColor}30`,
            borderRadius: 9999, padding: "0.15rem 0.55rem",
            display: "inline-block", position: "relative", zIndex: 1,
          }}>
            {skill.cat}
          </span>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Skills = () => {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? SKILLS : SKILLS.filter((s) => s.cat === active);

  return (
    <main className="page-content" id="page-skills">

      {/* Background glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "15%", right: 0,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-orb-violet) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: 0,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,160,69,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <section style={{ padding: "5rem 0 6rem", position: "relative", zIndex: 1 }}>
        <div className="section-wrapper">

          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}
          >
            What I work with
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}
          >
            My <span className="violet-text-gradient">Tech Stack</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-muted)", maxWidth: 520, lineHeight: 1.75, marginBottom: "4rem" }}
          >
            Technologies I use to ship fast, beautiful, scalable products. Hover cards for 3D effect.
          </motion.p>

          {/* ── VIBE CODING SECTION ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ marginBottom: "5rem" }}
          >
            <VibeTerminal />
          </motion.div>

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                id={`skills-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: 9999,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem", fontWeight: 500,
                  cursor: "pointer",
                  border: active === cat ? `1px solid ${CAT_COLOR[cat]}55` : "1px solid var(--color-border)",
                  background: active === cat ? `${CAT_COLOR[cat]}14` : "var(--color-card)",
                  color: active === cat ? CAT_COLOR[cat] : "var(--color-body-muted)",
                  transition: "all 0.22s ease",
                  boxShadow: active === cat ? `0 0 14px ${CAT_COLOR[cat]}22` : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Skill card grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {shown.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom highlight row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: "5rem" }}
          >
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "1.5rem",
              padding: "2.5rem", borderRadius: 24,
              background: "var(--color-card)", border: "1px solid var(--color-border)",
            }}>
              {[
                { title: "Frontend Focus",  body: "Building pixel-perfect UIs with React, TypeScript and modern CSS frameworks — from landing pages to complex dashboards." },
                { title: "AI Integration",  body: "Connecting Groq, Claude, and Gemini APIs into real products. Prompt engineering is a skill I practice every day." },
                { title: "Ship Fast",       body: "Vite, Vercel CI/CD, and Git workflows let me go from idea to deployed product in days, not weeks." },
              ].map((item) => (
                <div key={item.title} style={{ flex: "1 1 220px" }}>
                  <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, marginBottom: "0.9rem" }} />
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-heading)", marginBottom: "0.5rem" }}>{item.title}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", lineHeight: 1.75 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE 1 — RPG SKILL UNLOCK BOARD
          Each tech shown as a game achievement with XP bar
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(107,72,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Progress Report
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            Skill <span className="saffron-text-gradient">Unlocked</span> 🎮
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3rem", maxWidth: 520, lineHeight: 1.75 }}>
            Honest self-assessed XP levels — not a recruiter-friendly lie, but where I genuinely stand today.
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {[
              { name: "HTML5",       xp: 950, maxXp: 1000, level: 9,  badge: "🌐", color: "#E34F26", tag: "Architect" },
              { name: "CSS3",        xp: 870, maxXp: 1000, level: 8,  badge: "🎨", color: "#264DE4", tag: "Stylist"   },
              { name: "JavaScript",  xp: 820, maxXp: 1000, level: 8,  badge: "⚡", color: "#F7DF1E", tag: "Builder"  },
              { name: "React",       xp: 760, maxXp: 1000, level: 7,  badge: "⚛️", color: "#61DAFB", tag: "Explorer" },
              { name: "TypeScript",  xp: 680, maxXp: 1000, level: 6,  badge: "🔷", color: "#3178C6", tag: "Learner"  },
              { name: "Tailwind",    xp: 790, maxXp: 1000, level: 7,  badge: "💨", color: "#38BDF8", tag: "Builder"  },
              { name: "Python",      xp: 610, maxXp: 1000, level: 6,  badge: "🐍", color: "#3776AB", tag: "Learner"  },
              { name: "Git",         xp: 840, maxXp: 1000, level: 8,  badge: "🔱", color: "#F05032", tag: "Master"   },
              { name: "Figma",       xp: 550, maxXp: 1000, level: 5,  badge: "✏️", color: "#F24E1E", tag: "Learner"  },
              { name: "Framer Motion",xp: 700, maxXp: 1000, level: 7, badge: "🎭", color: "#646CFF", tag: "Builder"  },
              { name: "Vite",        xp: 750, maxXp: 1000, level: 7,  badge: "⚡", color: "#646CFF", tag: "Builder"  },
              { name: "Node.js",     xp: 520, maxXp: 1000, level: 5,  badge: "🟢", color: "#339933", tag: "Learner"  },
            ].map((skill, i) => (
              <motion.div key={skill.name}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div style={{
                  padding: "1.1rem 1.4rem", borderRadius: 14,
                  background: "var(--color-card)", border: `1px solid ${skill.color}22`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${skill.color}50`; el.style.boxShadow = `0 8px 30px ${skill.color}14`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${skill.color}22`; el.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{skill.badge}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "var(--color-heading)" }}>{skill.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: skill.color,
                        background: `${skill.color}15`, border: `1px solid ${skill.color}30`, borderRadius: 9999, padding: "0.12rem 0.5rem", textTransform: "uppercase" }}>
                        {skill.tag}
                      </span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.85rem", color: skill.color }}>
                        Lv.{skill.level}
                      </span>
                    </div>
                  </div>
                  {/* XP bar */}
                  <div style={{ height: 6, borderRadius: 999, background: "var(--color-border)", overflow: "hidden", marginBottom: "0.35rem" }}>
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 + 0.3, duration: 0.9, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "var(--color-body-faint)" }}>XP: {skill.xp} / {skill.maxXp}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: skill.color, fontWeight: 700 }}>{Math.round((skill.xp / skill.maxXp) * 100)}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE 2 — "HOW I ACTUALLY USE THIS" 
          Honest real examples — not just "I know X"
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Proof, not claims
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            How I <span className="violet-text-gradient">Actually</span> Use These
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3rem", maxWidth: 560, lineHeight: 1.75 }}>
            "Knows React" means nothing. Here's what I actually built with each tool — specific, real, shipped.
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            {[
              {
                tech: "React + Framer Motion",
                color: "#61DAFB",
                real: "Built this portfolio — multi-page SPA with page transitions, scroll-triggered animations, and 3D tilt cards. Framer Motion handles every micro-interaction.",
                proof: "You're looking at it right now.",
                emoji: "⚛️",
              },
              {
                tech: "Groq API + JavaScript",
                color: "#E8A045",
                real: "Integrated Groq's LLaMA model into MindMetric to generate personalized psychological insights from Big Five scores — all client-side, no backend.",
                proof: "mindmetric-orpin.vercel.app",
                emoji: "🧠",
              },
              {
                tech: "Canvas API (vanilla JS)",
                color: "#F7DF1E",
                real: "Built animated language charts in GitGlow — donut charts, bar graphs, contribution streaks — zero dependencies, pure Canvas 2D context.",
                proof: "gitglow-inky.vercel.app",
                emoji: "📊",
              },
              {
                tech: "Astro v5 + React 19",
                color: "#FF5D01",
                real: "YogaFlow Pro — full-stack session booking with island architecture. Static shell rendered by Astro, interactive booking UI hydrated by React 19.",
                proof: "yogaflow-pro.vercel.app",
                emoji: "🧘",
              },
              {
                tech: "Python + Flask",
                color: "#3776AB",
                real: "FakeBuster — an AI misinformation detector. Flask serves a REST API, Python handles NLP + confidence scoring, HTML/CSS frontend consumes it.",
                proof: "github.com/amritanshguptadev/FakeBuster",
                emoji: "🔍",
              },
              {
                tech: "Git + Vercel CI/CD",
                color: "#F05032",
                real: "Every project in my portfolio auto-deploys on git push. Preview URLs for every branch. Zero manual deployment for 6+ live projects.",
                proof: "Consistent across all projects",
                emoji: "🚀",
              },
            ].map((item, i) => (
              <motion.div key={item.tech}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{
                  display: "flex", gap: "1.5rem", alignItems: "flex-start",
                  padding: "1.6rem 2rem",
                  background: "var(--color-card)",
                  borderBottom: "1px solid var(--color-border)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${item.color}06`}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--color-card)"}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: item.color }}>{item.tech}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", fontStyle: "italic" }}>→ {item.proof}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-muted)", lineHeight: 1.75 }}>{item.real}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE 3 — STACK COMBO RECIPE CARDS
          Which tools I combine for which type of project
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(232,160,69,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            My Recipes
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            Stack <span className="saffron-text-gradient">Combos</span> 🧩
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3rem", maxWidth: 520, lineHeight: 1.75 }}>
            The exact tool combinations I reach for when building different types of projects.
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                type: "AI Web App",
                emoji: "🧠",
                color: "#6B48FF",
                time: "~3 days",
                ingredients: ["React", "TypeScript", "Groq API", "Vite", "Framer Motion", "Vercel"],
                steps: "Bootstrap with Vite → build UI in React → wire Groq for AI layer → animate with Framer → push to GitHub → auto-deploy on Vercel.",
              },
              {
                type: "Static Portfolio / Landing",
                emoji: "🌐",
                color: "#E8A045",
                time: "~1–2 days",
                ingredients: ["HTML5", "CSS3 (vanilla)", "JavaScript", "Vercel"],
                steps: "Write semantic HTML → style with custom properties & grid → add vanilla JS interactions → deploy to Vercel in one command.",
              },
              {
                type: "Full-Stack Booking Platform",
                emoji: "📅",
                color: "#00CEA8",
                time: "~1–2 weeks",
                ingredients: ["Astro v5", "React 19", "Tailwind CSS", "Node.js", "GitHub Actions", "Vercel"],
                steps: "Astro for static shell + SEO → React islands for dynamic UI → Tailwind for responsive layout → GitHub Actions for CI → Vercel for CD.",
              },
              {
                type: "AI Detection / NLP Tool",
                emoji: "🔍",
                color: "#F472B6",
                time: "~4–5 days",
                ingredients: ["Python", "Flask", "HTML5", "CSS3", "REST API"],
                steps: "Flask REST API → Python NLP backend → HTML/CSS frontend → fetch from client → deploy Flask on Render or Railway.",
              },
              {
                type: "Analytics Dashboard",
                emoji: "📊",
                color: "#38BDF8",
                time: "~2–3 days",
                ingredients: ["Vanilla JS", "Canvas API", "REST API", "CSS3", "Vercel"],
                steps: "Fetch from public API → parse JSON data → draw charts with Canvas 2D → style with CSS variables → no framework overhead.",
              },
              {
                type: "Creative / Storytelling Site",
                emoji: "✨",
                color: "#E8A045",
                time: "~2–4 days",
                ingredients: ["React", "Framer Motion", "Three.js", "Tailwind", "Vite"],
                steps: "React for component structure → Three.js for 3D canvas → Framer for scroll animations → Tailwind for rapid styling → deploy instantly.",
              },
            ].map((recipe, i) => (
              <motion.div key={recipe.type}
                initial={{ opacity: 0, y: 30, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div style={{
                  borderRadius: 20, height: "100%", overflow: "hidden",
                  background: "var(--color-card)", border: `1px solid ${recipe.color}25`,
                  boxShadow: `0 4px 24px ${recipe.color}08`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${recipe.color}50`; el.style.boxShadow = `0 16px 50px ${recipe.color}18`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${recipe.color}25`; el.style.boxShadow = `0 4px 24px ${recipe.color}08`; }}>
                  {/* Header */}
                  <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: `1px solid ${recipe.color}18`,
                    background: `linear-gradient(135deg, ${recipe.color}08, transparent)` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "2rem" }}>{recipe.emoji}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, color: recipe.color,
                        background: `${recipe.color}14`, border: `1px solid ${recipe.color}28`, borderRadius: 9999, padding: "0.15rem 0.6rem" }}>
                        ⏱ {recipe.time}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--color-heading)" }}>{recipe.type}</h3>
                  </div>
                  {/* Ingredients */}
                  <div style={{ padding: "1rem 1.5rem 0.8rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: "var(--color-body-faint)",
                      textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Ingredients</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                      {recipe.ingredients.map(ing => (
                        <span key={ing} style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600,
                          padding: "0.15rem 0.6rem", borderRadius: 9999,
                          background: `${recipe.color}12`, border: `1px solid ${recipe.color}28`, color: recipe.color }}>
                          {ing}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: "var(--color-body-faint)",
                      textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Method</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-body-muted)", lineHeight: 1.7 }}>{recipe.steps}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE 4 — LEARNING ORIGIN TIMELINE
          When & how I picked up each major skill
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0 8rem", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            The Journey
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            How I <span className="violet-text-gradient">Learned</span> Each Stack
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3.5rem", maxWidth: 520, lineHeight: 1.75 }}>
            No bootcamp. No college curriculum. Just YouTube, docs, and shipping things until they worked.
          </motion.p>

          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2,
              background: "linear-gradient(180deg, var(--color-accent-violet), var(--color-accent-gold), transparent)", opacity: 0.25 }} />

            {[
              { year: "2020", skill: "HTML5 & CSS3", how: "Saved a .txt as .html in Notepad. Stared at 'Hello World' for 60 seconds. Never looked back.", color: "#E34F26", emoji: "🌐" },
              { year: "2021", skill: "JavaScript (ES6+)", how: "Wanted to make the HTML 'do things'. MDN docs + countless broken CodePens. Learned what a closure actually is at 1 AM.", color: "#F7DF1E", emoji: "⚡" },
              { year: "2022", skill: "Git & GitHub", how: "Pushed my first repo and accidentally committed my API key. Learned .gitignore the hard way. Classic.", color: "#F05032", emoji: "🔱" },
              { year: "2023", skill: "React & Vite", how: "Spent a week confused by useEffect. Then built something in 2 hours that would've taken 2 days in vanilla JS. Never looked back.", color: "#61DAFB", emoji: "⚛️" },
              { year: "2024", skill: "TypeScript + Tailwind", how: "TypeScript errors were frustrating until I realized they were telling me exactly where my logic was wrong. Tailwind clicked in day 3.", color: "#3178C6", emoji: "🔷" },
              { year: "2024", skill: "Groq / AI APIs", how: "Integrated Groq into MindMetric. Reading API docs + prompt engineering experiments in the browser console until the response made sense.", color: "#6B48FF", emoji: "🤖" },
              { year: "2025", skill: "Astro v5 + Python/Flask", how: "YogaFlow Pro forced Astro. FakeBuster forced Flask. Both taught me that the right tool for the job is always better than the one you know.", color: "#FF5D01", emoji: "🚀" },
              { year: "2026", skill: "Framer Motion + Three.js", how: "This portfolio. Diving into motion.div and OrbitControls simultaneously. The browser DevTools became my best friend.", color: "#646CFF", emoji: "🎭" },
            ].map((item, i) => (
              <motion.div key={`${item.year}-${item.skill}`}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1.2rem", alignItems: "flex-start" }}>
                {/* Timeline dot */}
                <div style={{ flexShrink: 0, width: 58, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color,
                    boxShadow: `0 0 12px ${item.color}88`, marginTop: 18, zIndex: 1 }} />
                </div>
                {/* Card */}
                <div style={{
                  flex: 1, padding: "1.2rem 1.5rem", borderRadius: 14,
                  background: "var(--color-card)", border: `1px solid ${item.color}22`,
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}45`; el.style.boxShadow = `0 6px 24px ${item.color}12`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}22`; el.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: item.color }}>{item.skill}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", marginLeft: "auto" }}>{item.year}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-body-muted)", lineHeight: 1.7, fontStyle: "italic" }}>"{item.how}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing note */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            style={{ textAlign: "center", marginTop: "3rem" }}>
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "var(--color-heading)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              "I didn't learn these to put them on a resume.<br/>I learned them because I had something to build."
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-gold)", marginTop: "0.75rem" }}>— Amritansh Gupta</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Skills;
