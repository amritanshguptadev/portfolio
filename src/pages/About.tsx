import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Personality Radar SVG ────────────────────────────────────────────────────
   Draws an animated spider/radar chart of 8 personal trait scores.
   Pure SVG — no library, no canvas — renders perfectly at any DPI.
────────────────────────────────────────────────────────────────────────────── */
const RADAR_TRAITS = [
  { label: "Curiosity",     score: 0.95 },
  { label: "Discipline",    score: 0.88 },
  { label: "Creativity",    score: 0.90 },
  { label: "Communication", score: 0.84 },
  { label: "Resilience",    score: 0.92 },
  { label: "Ownership",     score: 0.93 },
  { label: "Teamwork",      score: 0.80 },
  { label: "Speed",         score: 0.87 },
];

const polarToXY = (angle: number, r: number, cx: number, cy: number) => ({
  x: cx + r * Math.sin(angle),
  y: cy - r * Math.cos(angle),
});

const PersonalityRadar = () => {
  const n   = RADAR_TRAITS.length;
  const cx  = 200;
  const cy  = 200;
  const R   = 150;
  const ref = useRef<SVGPolygonElement>(null);

  // Build polygon points for a given scale factor
  const buildPoints = (scale: number) =>
    RADAR_TRAITS.map((t, i) => {
      const angle  = (2 * Math.PI * i) / n;
      const pt     = polarToXY(angle, t.score * R * scale, cx, cy);
      return `${pt.x},${pt.y}`;
    }).join(" ");

  // Animate from 0 → full on mount-in-view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let frame = 0;
      const total = 50;
      const tick = () => {
        frame++;
        const t = frame / total;
        const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
        el.setAttribute("points", buildPoints(ease));
        if (frame < total) requestAnimationFrame(tick);
      };
      el.setAttribute("points", buildPoints(0));
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <section style={{ position: "relative", padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(107,72,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="section-wrapper">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
          Self-Assessment
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
          My <span className="violet-text-gradient">Personality</span> Radar
        </motion.h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center", justifyContent: "center" }}>

          {/* SVG Radar */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 400 400" width={360} height={360} style={{ overflow: "visible" }}>
              {/* Grid rings */}
              {rings.map((r, ri) => (
                <polygon key={ri}
                  points={RADAR_TRAITS.map((_, i) => {
                    const a  = (2 * Math.PI * i) / n;
                    const pt = polarToXY(a, r * R, cx, cy);
                    return `${pt.x},${pt.y}`;
                  }).join(" ")}
                  fill="none" stroke="rgba(107,72,255,0.15)" strokeWidth={1} />
              ))}

              {/* Axis lines */}
              {RADAR_TRAITS.map((_, i) => {
                const a   = (2 * Math.PI * i) / n;
                const tip = polarToXY(a, R, cx, cy);
                return <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="rgba(107,72,255,0.12)" strokeWidth={1} />;
              })}

              {/* Data polygon — animated via ref */}
              <polygon
                ref={ref}
                points={buildPoints(0)}
                fill="rgba(107,72,255,0.18)"
                stroke="url(#radarGrad)"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />

              {/* Gradient def */}
              <defs>
                <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#6B48FF" />
                  <stop offset="100%" stopColor="#E8A045" />
                </linearGradient>
              </defs>

              {/* Data point dots + labels */}
              {RADAR_TRAITS.map((t, i) => {
                const a    = (2 * Math.PI * i) / n;
                const dot  = polarToXY(a, t.score * R, cx, cy);
                const lbl  = polarToXY(a, R + 24, cx, cy);
                const pct  = polarToXY(a, R + 42, cx, cy);
                return (
                  <g key={t.label}>
                    <circle cx={dot.x} cy={dot.y} r={4} fill="#6B48FF" stroke="#E8A045" strokeWidth={1.5} />
                    <text x={lbl.x} y={lbl.y} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "var(--font-body)", fontSize: 11, fill: "var(--color-body-muted)", fontWeight: 600 }}>
                      {t.label}
                    </text>
                    <text x={pct.x} y={pct.y} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "var(--font-body)", fontSize: 9.5, fill: "var(--color-accent-gold)", fontWeight: 700 }}>
                      {Math.round(t.score * 100)}%
                    </text>
                  </g>
                );
              })}

              {/* Center label */}
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                style={{ fontFamily: "var(--font-heading)", fontSize: 12, fill: "rgba(107,72,255,0.6)", fontWeight: 700 }}>
                ME
              </text>
            </svg>
          </motion.div>

          {/* Legend & caption */}
          <div style={{ flex: "1 1 280px", maxWidth: 400 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-faint)",
              textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "1.5rem" }}>
              Self-rated · Not a standardized test
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {RADAR_TRAITS.map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", width: 120, flexShrink: 0 }}>{t.label}</span>
                  <div style={{ flex: 1, height: 5, borderRadius: 999, background: "var(--color-border)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.score * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                      style={{ height: "100%", borderRadius: 999,
                        background: "linear-gradient(90deg, #6B48FF, #E8A045)" }}
                    />
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-accent-gold)", fontWeight: 700, width: 34, textAlign: "right", flexShrink: 0 }}>
                    {Math.round(t.score * 100)}%
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)", marginTop: "2rem", lineHeight: 1.7 }}>
              These scores reflect how I honestly see myself today — not a boast, but a baseline I'm actively working to improve.
              Curiosity and Resilience are the ones I'm proudest of. Teamwork is the one I'm working hardest on.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TRAITS = [
  {
    title: "Web Development",
    desc: "Building fast, beautiful web apps with React, Astro, TypeScript and modern tooling. From pixel-perfect UI to robust backends.",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    color: "#E8A045",
  },
  {
    title: "AI & Prototyping",
    desc: "Prompt engineering with Claude, Gemini, Groq API. Turning AI capabilities into usable products that feel magical.",
    iconPath: "M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm0 14a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2zm10-7a2 2 0 012 2 2 2 0 01-2 2h-2a2 2 0 01-2-2 2 2 0 012-2h2zM4 9a2 2 0 012 2 2 2 0 01-2 2H2a2 2 0 01-2-2 2 2 0 012-2h2z",
    color: "#6B48FF",
  },
  {
    title: "Creative Design",
    desc: "Canva, Photoshop, Premiere Pro, DaVinci Resolve. I believe great software must also be beautifully designed.",
    iconPath: "M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586 M11 11a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2z",
    color: "#E8A045",
  },
  {
    title: "NCC & Leadership",
    desc: "31 UK BN NCC Cadet. Debate speaker at IIT Roorkee, hackathon winner. I lead both in code and in life.",
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    color: "#6B48FF",
  },
];

const QUICK_FACTS = [
  { label: "Location",  value: "Haridwar, Uttarakhand, India",      href: undefined },
  { label: "Degree",    value: "B.C.A. (Hons) — DSVV, Haridwar",   href: undefined },
  { label: "CGPA",      value: "8.26 / 10",                         href: undefined },
  { label: "Email",     value: "amritansh.gupta.dev@gmail.com",     href: undefined },
  { label: "Phone",     value: "+91 8707368632",                    href: undefined },
  { label: "GitHub",    value: "github.com/amritanshguptadev",      href: "https://github.com/amritanshguptadev",            hoverColor: "#E8A045" },
  { label: "LinkedIn",  value: "/in/amritanshguptadev",             href: "https://www.linkedin.com/in/amritanshguptadev/",  hoverColor: "#E8A045" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => (
  <main className="page-content" id="page-about">

    {/* ── Hero ── */}
    <section style={{ padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "20%", right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,72,255,0.08) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />

      <div className="section-wrapper">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          Introduction
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "2.5rem" }}
        >
          About <span className="saffron-text-gradient">Me</span>
        </motion.h1>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: "5rem", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            style={{ flex: "0 0 auto", position: "relative" }}
          >
            <div style={{ position: "relative", width: 300 }}>
              {/* Outer glow frame */}
              <div style={{
                position: "absolute", inset: -2,
                borderRadius: 28,
                background: "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-violet))",
                zIndex: 0,
              }} />
              <div style={{
                position: "relative", zIndex: 1,
                width: 300, height: 380,
                borderRadius: 26,
                overflow: "hidden",
                background: "var(--color-photo-bg)",
                border: "3px solid var(--color-photo-border)",
              }}>
                <img
                  src="/src/assets/amritansh.png"
                  alt="Amritansh Gupta — CS Student, Developer, NCC Cadet"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://avatars.githubusercontent.com/u/269774892?v=4"; }}
                />
                {/* Gloss overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 55%)", pointerEvents: "none" }} />
              </div>

              {/* Corner accent top-left */}
              <div style={{ position: "absolute", top: -10, left: -10, width: 28, height: 28, borderTop: "3px solid var(--color-accent-gold)", borderLeft: "3px solid var(--color-accent-gold)", borderRadius: "6px 0 0 0", zIndex: 2 }} />
              {/* Corner accent bottom-right */}
              <div style={{ position: "absolute", bottom: -10, right: -10, width: 28, height: 28, borderBottom: "3px solid var(--color-accent-violet)", borderRight: "3px solid var(--color-accent-violet)", borderRadius: "0 0 6px 0", zIndex: 2 }} />

              {/* Status badge */}
              <div style={{
                position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", zIndex: 3,
                background: "var(--color-nav-bg-mobile)", border: "1px solid rgba(232,160,69,0.3)",
                borderRadius: 9999, padding: "0.45rem 1.4rem",
                fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)",
                fontWeight: 600, whiteSpace: "nowrap", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", gap: "0.45rem",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0, boxShadow: "0 0 8px #22C55E" }} />
                Open to Opportunities
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <div style={{ flex: "1 1 360px", paddingTop: "0.5rem" }}>
            {[
              "I'm Amritansh Gupta, a Computer Science student from Haridwar, Uttarakhand, who genuinely enjoys solving problems and turning ideas into things that actually work.",
              "I care about building software that feels good to use — not just software that runs. I learn fast, take ownership of what I build, and I'm just as comfortable figuring something out on my own as I am collaborating with a team.",
              "Beyond code, I'm an NCC Cadet, a debate speaker, and someone who participated in Chhatra Sansad at IIT Roorkee. I believe in building both — technology and character.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body)", lineHeight: 1.85, marginBottom: "1.35rem" }}
              >
                {para}
              </motion.p>
            ))}

            {/* Quick facts grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "0.75rem", marginTop: "1.75rem" }}
            >
              {QUICK_FACTS.map((f) => {
                const inner = (
                  <div key={f.label} className="glass-card" style={{ padding: "0.75rem 1rem", borderRadius: 12, transition: "border-color 0.2s, box-shadow 0.2s" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--color-body-faint)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {f.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: f.href ? (f as { hoverColor?: string }).hoverColor ?? "var(--color-accent-gold)" : "var(--color-accent-gold)", fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {f.value}
                    </p>
                  </div>
                );
                return f.href ? (
                  <a key={f.label} href={f.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    {inner}
                  </a>
                ) : (
                  <div key={f.label}>{inner}</div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ marginTop: "2.25rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a href="https://mail.google.com/mail/?view=cm&to=amritansh.gupta.dev@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-primary" id="about-cta-email">
                Send Me an Email
              </a>
              <a href="https://github.com/amritanshguptadev/resume/blob/main/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="about-cta-resume">
                View Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Strengths ── */}
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-wrapper">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          What I bring
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-heading)", marginBottom: "3rem" }}
        >
          My <span className="violet-text-gradient">Strengths</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}
        >
          {TRAITS.map((t) => (
            <motion.div
              key={t.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card"
              style={{ padding: "2rem 1.75rem", borderRadius: 20, cursor: "default", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `${t.color}12`,
                border: `1px solid ${t.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={t.iconPath} />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--color-heading)", marginBottom: "0.65rem" }}>
                {t.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-muted)", lineHeight: 1.75 }}>
                {t.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ════════════════════════════════════════════════════
        ✦ CREATIVE 1 — MAGAZINE STORY NARRATIVE
        The real story, told like a long-read article
        ════════════════════════════════════════════════════ */}
    <section style={{ position: "relative", padding: "5rem 0", borderTop: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(232,160,69,0.05) 0%, transparent 70%)" }} />
      <div className="section-wrapper" style={{ maxWidth: 820, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "2rem" }}>
          — Origin Story —
        </motion.p>

        {/* Pull quote 1 */}
        <motion.blockquote initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ borderLeft: "3px solid var(--color-accent-gold)", paddingLeft: "1.5rem", margin: "0 0 2.5rem", fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", color: "var(--color-heading)", lineHeight: 1.4 }}>
          "I didn't start with React or TypeScript. I started with Notepad and a question: <em style={{ color: "var(--color-accent-gold)" }}>how does a website actually work?"</em>
        </motion.blockquote>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.8rem" }}>
          It was 2020. I was in class 9, sitting in front of a slow desktop in Raebareli. I'd saved a .txt file as .html just to see
          what happened. The browser opened it. It said "Hello World". I remember staring at it for a full minute — this invisible bridge
          between a file and something a human could see. That moment planted something permanent.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
          Haridwar wasn't a tech hub. I didn't have a mentor or a bootcamp. I had YouTube, MDN docs, and too much curiosity.
          I broke things constantly — which, I later learned, is exactly how you build an intuition for how systems work.
          Every bug I couldn't fix at 11 PM became a lesson I kept at 2 AM.
        </motion.p>

        {/* Pull quote 2 */}
        <motion.blockquote initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ borderLeft: "3px solid var(--color-accent-violet)", paddingLeft: "1.5rem", margin: "0 0 2.5rem",
            fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            color: "var(--color-heading)", lineHeight: 1.4 }}>
          "Joining NCC wasn't a decision for a certificate.<br />
          <em style={{ color: "var(--color-accent-violet-light)" }}>It was a decision to become someone who doesn't quit.</em>"
        </motion.blockquote>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.8rem" }}>
          2023. Dev Sanskriti Vishwavidyalaya. BCA Honours began. I also enrolled in 31 UK BN NCC. The early mornings were brutal.
          Drills at 5 AM. Marching in Haridwar heat. But the discipline rewired how I approached everything — including code.
          You stop treating difficulty as a signal to stop. You treat it as part of the job.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
          February 2026. International AI Conference at DSVV. I entered the Short Film competition, the Website Hackathon, and the Debate — three
          events in one weekend. 1st place. 3rd place. Participation. Three certificates. More importantly — proof that a single weekend
          can collapse years of self-doubt.
        </motion.p>

        {/* Magazine-style stat row */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", margin: "3rem 0", padding: "1.5rem 0" }}>
          {[
            { n: "2020", label: "Year I wrote my first HTML" },
            { n: "3",    label: "Competitions won in one weekend" },
            { n: "∞",    label: "Bugs debugged at midnight" },
            { n: "1",    label: "PM letter received" },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: "1 1 140px", textAlign: "center", padding: "0.5rem 1rem",
              borderRight: i < 3 ? "1px solid var(--color-border)" : "none" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2.2rem", color: "var(--color-accent-gold)", lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-body-faint)", marginTop: "0.4rem" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9 }}>
          April 2026. IIT Roorkee. I sat in a room full of delegates from the country's best institutions — IITs, NITs, central universities —
          and represented Dev Sanskriti Vishwavidyalaya in a simulated Parliament. I spoke. I argued. I held my position.
          That day I understood: the best builders are the ones who can also communicate why their work matters.
        </motion.p>
      </div>
    </section>

    {/* ════════════════════════════════════════════════════
        ✦ CREATIVE 2 — DAY IN MY LIFE TIMELINE ARC
        Hour-by-hour visual — unique, personal, alive
        ════════════════════════════════════════════════════ */}
    <section style={{ position: "relative", padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
      <div className="section-wrapper">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
          A Typical Day
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
          24 Hours in My <span className="saffron-text-gradient">World</span>
        </motion.h2>

        <div style={{ position: "relative" }}>
          {/* Central horizontal line */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, var(--color-accent-violet), var(--color-accent-gold), transparent)",
            opacity: 0.3, transform: "translateY(-50%)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { time: "05:30", label: "NCC PT / Morning Yoga", icon: "🌅", color: "#22C55E",  above: true },
              { time: "07:00", label: "Chai + reading something", icon: "☕", color: "#E8A045", above: false },
              { time: "09:00", label: "Classes at DSVV", icon: "🎓", color: "#6B48FF",       above: true },
              { time: "12:00", label: "Lunch break + GitHub scroll", icon: "🍽️", color: "#00CEA8", above: false },
              { time: "14:00", label: "Project work / assignments", icon: "💻", color: "#E8A045", above: true },
              { time: "17:00", label: "NCC drill or free time", icon: "🎖️", color: "#22C55E",  above: false },
              { time: "19:00", label: "Deep work — no interruptions", icon: "🔥", color: "#6B48FF", above: true },
              { time: "22:00", label: "Lo-fi music + debugging", icon: "🎧", color: "#F472B6",  above: false },
              { time: "00:30", label: "Best ideas hit. Write them down.", icon: "💡", color: "#E8A045", above: true },
              { time: "01:30", label: "Sleep (eventually)", icon: "🌙", color: "#6B48FF",    above: false },
            ].map((item, i) => (
              <motion.div key={item.time}
                initial={{ opacity: 0, y: item.above ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem", position: "relative" }}>

                {/* Left side — shown on "above" items */}
                <div style={{ flex: 1, textAlign: "right", paddingRight: "1.5rem", opacity: item.above ? 1 : 0, pointerEvents: item.above ? "auto" : "none" }}>
                  <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end",
                    padding: "0.7rem 1.1rem", borderRadius: 14, background: "var(--color-card)",
                    border: `1px solid ${item.color}28`, maxWidth: 220 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{item.time}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", textAlign: "right" }}>{item.icon} {item.label}</span>
                  </div>
                </div>

                {/* Center dot */}
                <div style={{ flexShrink: 0, width: 12, height: 12, borderRadius: "50%", background: item.color, boxShadow: `0 0 10px ${item.color}88`, zIndex: 1 }} />

                {/* Right side — shown on "below" items */}
                <div style={{ flex: 1, paddingLeft: "1.5rem", opacity: item.above ? 0 : 1, pointerEvents: item.above ? "none" : "auto" }}>
                  <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start",
                    padding: "0.7rem 1.1rem", borderRadius: 14, background: "var(--color-card)",
                    border: `1px solid ${item.color}28`, maxWidth: 220 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{item.time}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)" }}>{item.icon} {item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════════════════
        ✦ CREATIVE 3 — PERSONALITY RADAR (SVG)
        An animated radar/spider chart of personal traits
        ════════════════════════════════════════════════════ */}
    <PersonalityRadar />

    {/* ════════════════════════════════════════════════════
        ✦ CREATIVE 4 — LETTER TO FUTURE SELF
        Raw, personal, styled like a handwritten card
        ════════════════════════════════════════════════════ */}
    <section style={{ position: "relative", padding: "5rem 0 7rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(107,72,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="section-wrapper" style={{ maxWidth: 720, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "2rem", textAlign: "center" }}>
          — Written on 29 May 2026 —
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 40, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{
            padding: "3rem 3.5rem",
            borderRadius: 24,
            background: "rgba(232,160,69,0.04)",
            border: "1px solid rgba(232,160,69,0.18)",
            boxShadow: "0 20px 80px rgba(107,72,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative",
          }}>

          {/* Corner stamps */}
          <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>
            PRIVATE · MAY 2026
          </div>

          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.05rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            Dear Amritansh — 5 years from now,
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            I hope you're reading this from somewhere you worked hard to reach. An office, maybe, or a studio of your own.
            I hope you shipped something this week that made someone's life slightly better — because that was always the point, wasn't it?
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            Right now it's 2026. I'm a second-year BCA student in Haridwar with 8.26 CGPA, a laptop that occasionally freezes, and more
            side-projects than sleep hours. I have a personal letter from the Prime Minister in a folder I've opened eleven times.
            I have an NCC 'B' Certificate with Grade A that took three years of 5 AM mornings to earn.
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            The thing I want you to remember: you were never waiting to "be ready." Every project you shipped, you shipped before you felt ready.
            That was the whole strategy. <em style={{ color: "var(--color-accent-gold)" }}>Ship first. Learn while it's live.</em>
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "2rem" }}>
            Don't forget the cadet drills. Don't forget the midnight debugging sessions. Don't forget what it felt like to walk into IIT Roorkee
            and speak without hesitation. That version of you — who showed up even when the outcome wasn't guaranteed —
            <em style={{ color: "var(--color-accent-violet-light)" }}> he's the reason you have whatever you have now.</em>
          </p>

          {/* Signature */}
          <div style={{ borderTop: "1px solid rgba(232,160,69,0.15)", paddingTop: "1.5rem" }}>
            <p style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "1rem", color: "var(--color-body-faint)", marginBottom: "0.3rem" }}>
              With belief in you,
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem",
              background: "var(--grad-name)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Amritansh, 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default About;
