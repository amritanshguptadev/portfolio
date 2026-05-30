import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
type Achievement = {
  date: string;
  /** Numeric sort key: YYYYMM — higher = more recent */
  sortKey: number;
  title: string;
  org: string;
  story: string;
  badge: string;
  type: "education" | "achievement" | "activity" | "cert" | "honor";
  image?: string;
  position?: string;
  color: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    date: "May 2026",
    sortKey: 202605,
    type: "cert",
    color: "#22C55E",
    badge: "🎖️",
    title: "NCC 'B' Certificate — Grade A",
    org: "31 UK BN NCC · NCC Gp HQ Roorkee",
    position: "Grade A",
    image: "/ncc.jpeg",
    story:
      "Finally. It's here. Holding this certificate in my hands feels surreal. The early mornings, the drills, the discipline, the days when I wanted to quit but didn't — this NCC 'B' Certificate carries all of that. Grade A. I'll take it. There's something about wearing that uniform that changes you from the inside. It teaches you that showing up consistently matters more than talent. That your unit is only as strong as your weakest moment — so you make sure you have fewer of those. Standing with these cadets in that photo, all of us holding up what we worked for — that picture says more than I ever could. Grateful to 31 UK BN NCC, the NCC Gp HQ Roorkee, and everyone who pushed us harder than we thought we needed. To anyone who ever told me the NCC is 'just extracurricular' — respectfully, come do it first. This one's for everyone who believed in me before I believed in myself. Jai Hind 🇮🇳",
  },
  {
    date: "May 2026",
    sortKey: 202605,
    type: "cert",
    color: "#F472B6",
    badge: "🛡️",
    title: "Basic Cyber Course — NIELIT",
    org: "Ministry of Electronics & IT · NCC Directorate Uttarakhand",
    position: "Certificate of Completion",
    image: "/cert_nielit_cyber_course.png",
    story:
      "15 hours. NDU.DIGITAL platform. Completed under NCC Directorate Uttarakhand with a government-issued NIELIT Certificate from the Ministry of Electronics & Information Technology, Govt. of India. Cybersecurity isn't optional anymore — it's a survival skill. From basic cyber hygiene to understanding encryption fundamentals, this course built the foundation that every developer must have before writing a single line of production code.",
  },
  {
    date: "Apr 2026",
    sortKey: 202604,
    type: "achievement",
    color: "#6B48FF",
    badge: "🏛️",
    title: "Chhatra Sansad 4.0",
    org: "Think India · IIT Roorkee",
    position: "Participant",
    image: "/cert_iit_roorkee_chhatra_sansad.jpeg",
    story:
      "IIT Roorkee. 19 April 2026. A room full of the country's sharpest student minds — and me, representing Dev Sanskriti Vishwavidyalaya. Chhatra Sansad 4.0 by Think India was a simulated Parliament — motions, amendments, live debates. I didn't just participate. I spoke. I argued. I held my ground. That day I realized — developers who can think and communicate in a room full of leaders are the ones who actually change things.",
  },
  {
    date: "Feb 2026",
    sortKey: 202602,
    type: "achievement",
    color: "#E8A045",
    badge: "🎬",
    title: "1st Place — AI Short Film Reel",
    org: "AI for Sanskriti · DSVV International Conference",
    position: "1st Position",
    image: "/cert_ai_sanskriti_shortfilm.jpeg",
    story:
      "An international AI conference. A short film competition. And 1st position. This was at AI for Sanskriti — organized by the Dept. of Computer Science and Institute of AI at Dev Sanskriti Vishwavidyalaya, 21 February 2026. The brief was to capture the essence of AI through a short reel. I created something visual, emotional, and technically grounded. Walking away with 1st place felt like proof — creativity and technology are not opposites.",
  },
  {
    date: "Feb 2026",
    sortKey: 202602,
    type: "achievement",
    color: "#E8A045",
    badge: "💻",
    title: "3rd Place — Website & Hackathon Track",
    org: "AI for Sanskriti · DSVV International Conference",
    position: "3rd Position",
    image: "/cert_ai_sanskriti_hackathon.jpeg",
    story:
      "Same conference. Different event. Different skill. I participated in the Website & Hackathon track alongside the film competition — building under pressure, debugging in real-time, and presenting with confidence. Secured 3rd position. Also participated as a Debate speaker on digital privacy themes at the same event. Three events. Three certificates. That weekend shaped who I am as a builder.",
  },
  {
    date: "Feb 2026",
    sortKey: 202602,
    type: "activity",
    color: "#00CEA8",
    badge: "🎤",
    title: "Debate Participation",
    org: "AI for Sanskriti · DSVV",
    position: "Participant",
    image: "/cert_ai_sanskriti_debate.jpeg",
    story:
      "The motion: 'What if the most dangerous weapon in the 21st century is not a gun — but a click?' I stood up and argued about phishing, identity theft, data harvesting, and the digital illiteracy that makes all of it possible. Participating in this debate at AI for Sanskriti 2026 made me realize — if developers don't speak about ethics, who will?",
  },
  {
    date: "Feb–Apr 2025",
    sortKey: 202504,
    type: "cert",
    color: "#F472B6",
    badge: "🌍",
    title: "Polish Language — Certificate of Merit",
    org: "DSVV International Relations Office",
    position: "Certificate of Merit",
    image: "/cert_dsvv_polish_language.jpeg",
    story:
      "February to April 2025. I spent two months learning Polish — not because I had to, but because language is how you understand a people's soul. Organized by the Centre for Baltic Culture and Studies at Dev Sanskriti Vishwavidyalaya. Received a Certificate of Merit. It might seem disconnected from code — but it taught me patience, pattern recognition, and the humility of being a complete beginner again. Skills every programmer needs.",
  },
  {
    date: "Nov 2024",
    sortKey: 202411,
    type: "activity",
    color: "#00CEA8",
    badge: "🩸",
    title: "Voluntary Blood Donation",
    org: "MAA Gange Blood Centre · S.R. Medicity, Haridwar",
    position: "Donor Certificate",
    image: "/cert_blood_donation.png",
    story:
      "24 November 2024. S.R. Medicity Hospital, Haridwar. I donated blood voluntarily. Not for a certificate. Not for a trophy. Because I could. MAA Gange Blood Centre documented it. I keep this certificate not as an achievement but as a reminder — that service beyond technology is where character lives. Every builder should give back in ways that have nothing to do with building.",
  },
  {
    date: "Oct 2024",
    sortKey: 202410,
    type: "achievement",
    color: "#E8A045",
    badge: "🔒",
    title: "3rd Place — Cybersecurity Awareness Quiz",
    org: "Dev Sanskriti Vishwavidyalaya · DSVV Students' Club",
    position: "3rd Position",
    image: "/cert_dsvv_cybersec_quiz.jpeg",
    story:
      "October 5–6, 2024. Theme: 'Secure Our World: Protecting Data and Safeguarding Digital Lives.' I competed in the Cyber Security Awareness Month Quiz at DSVV and secured 3rd position. Questions on firewalls, encryption, social engineering, and digital threats — all under pressure, all from memory. 3rd place. But the real win is the awareness. The fire to do better next time is burning.",
  },
  {
    date: "Oct 2024",
    sortKey: 202410,
    type: "activity",
    color: "#00CEA8",
    badge: "🗣️",
    title: "Cybersecurity Debate — Participation",
    org: "Dev Sanskriti Vishwavidyalaya · DSVV Students' Club",
    position: "Participant",
    image: "/cert_dsvv_cybersec_debate.jpeg",
    story:
      "Same event. Different stage. I also participated in the Debate competition at Cyber Security Awareness Month 2024 — arguing about why digital illiteracy is the real security threat. The audience was my peers. The topic was their daily lives. Speaking about data protection to people who underestimate it — that's the most important kind of communication a developer can do.",
  },
  {
    date: "Apr 2023",
    sortKey: 202304,
    type: "honor",
    color: "#FF6B35",
    badge: "🇮🇳",
    title: "Personal Letter from PM Narendra Modi",
    org: "Pariksha Pe Charcha 2023 · Government of India",
    position: "National Recognition",
    image: "/cert_pm_pariksha_pe_charcha.jpeg",
    story:
      "20 April 2023. A personal letter addressed to me — Amritansh Gupta — from the Prime Minister of India, Shri Narendra Modi, for my participation in Pariksha Pe Charcha 2023. He wrote about the promise of India's youth, the Amrit Kaal, and the role we play in building the nation. I have read this letter many times. Each time, it reminds me that the work I do — every project I build, every line of code I write — is part of something much larger than a resume.",
  },
  {
    date: "2022",
    sortKey: 202201,
    type: "achievement",
    color: "#E8A045",
    badge: "🏆",
    title: "SOF ISSSO — Zonal Rank 21",
    org: "Science Olympiad Foundation · UP & Uttarakhand Zone",
    position: "Medal of Distinction",
    image: "/cert_sof_issso_2022.png",
    story:
      "Class 10. 2021–22. The Science Olympiad Foundation International Social Studies Olympiad. I achieved Zonal Rank 21 in the UP and Uttarakhand Zone — earning a Certificate of Distinction and Medal of Distinction. Social Studies. History. Geography. Civics. Subjects most students call boring — but they're the most important. They teach you where you come from and how the world works. Rank 21 across two entire states. I still smile when I think about it.",
  },
  {
    date: "2019",
    sortKey: 201901,
    type: "achievement",
    color: "#E8A045",
    badge: "🥇",
    title: "1st Position — Inter-School Event (NSBVM)",
    org: "New Standard Public School, Raebareli",
    position: "1st Position",
    image: "/cert_bss_kalam_tech_mart.jpeg",
    story:
      "2019. An inter-school event at NSBVM, Raebareli. I participated as a student of New Standard Public School and walked away with 1st Position — awarded with 'utmost qualifying spirit.' School stages are small. But the habits they build are not. Prepare like it matters. Perform like someone is watching. Carry yourself the same whether you win or don't.",
  },
  {
    date: "Dec 2016",
    sortKey: 201612,
    type: "activity",
    color: "#00CEA8",
    badge: "📜",
    title: "Hindi Poem Recitation — Appreciation Letter",
    org: "B.S.S. Public School, Raebareli",
    position: "Appreciation Letter",
    image: "/cert_bss_poem_hindi_2016.jpeg.png",
    story:
      "December 15, 2016. Morning assembly at B.S.S. Public School. I recited a Hindi poem in front of the entire school — and my Principal sent home an Appreciation Letter to my parents. Somewhere between English thoughts and Hindi poems, I discovered that language is emotion, culture, and identity. I am grateful for every stage, every mic, and every verse that shaped the person writing this today. To my family — you are the reason I stand on any stage with confidence.",
  },
  {
    date: "2016",
    sortKey: 201601,
    type: "activity",
    color: "#00CEA8",
    badge: "🎤",
    title: "English Thought Recitation — Appreciation Letter",
    org: "B.S.S. Public School, Raebareli",
    position: "Appreciation Letter",
    image: "/cert_bss_appreciation_english.jpeg",
    story:
      "Class 5-A. Morning assembly. Every eye in the school ground watching — and me, a small kid from Class 5-A, reciting a thought in English. I don't remember what the thought was. But I remember the feeling after. The silence that turned into appreciation. My Principal calling it 'very good and interactive.' A letter sent home to my parents. That was the first time I realized — I am not afraid of a crowd. I actually like it. That one moment in a school assembly quietly planted something in me that I'm still growing.",
  },
];

/* ─── type labels ─── */
const TYPE_LABEL: Record<string, string> = {
  education:   "Education",
  achievement: "Achievement",
  activity:    "Activity",
  cert:        "Certification",
  honor:       "National Honor",
};

const FILTERS = ["All", "Achievement", "Education", "Certification", "Activity", "National Honor"];

/* ─────────────────────────────────────────────────────────
   Certificate Card
───────────────────────────────────────────────────────── */
const CertCard = ({ item, i }: { item: Achievement; i: number }) => {
  const [expanded, setExpanded] = useState(false);
  const color = item.color;

  const openImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.image) window.open(item.image, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareMaxOpacity={0.1}
        glareColor={color}
        glarePosition="all"
        style={{ transformStyle: "preserve-3d", height: "100%" }}
      >
        <div
          style={{
            borderRadius: 20,
            background: "var(--color-card)",
            border: `1px solid ${color}28`,
            overflow: "hidden",
            boxShadow: `0 8px 40px ${color}12, 0 2px 8px rgba(0,0,0,0.25)`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${color}55`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 60px ${color}22, 0 4px 16px rgba(0,0,0,0.3)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${color}28`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${color}12, 0 2px 8px rgba(0,0,0,0.25)`;
          }}
        >
          {/* Top accent line */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}44)`, flexShrink: 0 }} />

          {/* Card body */}
          <div style={{ padding: "1.4rem 1.5rem 1.2rem", display: "flex", flexDirection: "column", flex: 1 }}>

            {/* Row 1: badge + date + position */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>{item.badge}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "flex-end" }}>
                {item.position && (
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700,
                    color, background: `${color}14`, border: `1px solid ${color}35`,
                    borderRadius: 9999, padding: "0.15rem 0.6rem",
                    textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap",
                  }}>
                    {item.position}
                  </span>
                )}
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.65rem",
                  color: "var(--color-body-faint)", whiteSpace: "nowrap", paddingTop: "0.1rem",
                }}>
                  {item.date}
                </span>
              </div>
            </div>

            {/* Type badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: `${color}10`, border: `1px solid ${color}25`,
              borderRadius: 9999, padding: "0.12rem 0.65rem", marginBottom: "0.8rem",
              alignSelf: "flex-start",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}` }} />
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700,
                color, textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                {TYPE_LABEL[item.type]}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "1rem", color: "var(--color-heading)",
              marginBottom: "0.3rem", lineHeight: 1.3,
            }}>
              {item.title}
            </h3>

            {/* Org */}
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.72rem",
              color, fontWeight: 600, marginBottom: "0.9rem", opacity: 0.9,
            }}>
              {item.org}
            </p>

            {/* Divider */}
            <div style={{ width: "100%", height: 1, background: `${color}18`, marginBottom: "0.9rem", flexShrink: 0 }} />

            {/* Full story — with expand/collapse */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.82rem",
                color: "var(--color-body-muted)", lineHeight: 1.8,
                ...(expanded ? {} : {
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }),
              }}>
                {item.story}
              </p>

              {/* Read more / less toggle */}
              <button
                onClick={() => setExpanded((e) => !e)}
                style={{
                  marginTop: "0.55rem",
                  fontFamily: "var(--font-body)", fontSize: "0.73rem", fontWeight: 600,
                  color, background: "none", border: "none", cursor: "pointer",
                  padding: 0, display: "flex", alignItems: "center", gap: "0.3rem",
                  opacity: 0.9, transition: "opacity 0.2s",
                }}
              >
                {expanded ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
                    Show less
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                    Read more
                  </>
                )}
              </button>
            </div>

            {/* Certificate image */}
            {item.image && (
              <div style={{ marginTop: "1.1rem" }}>
                <div style={{ width: "100%", height: 1, background: `${color}18`, marginBottom: "1rem" }} />
                <div
                  onClick={openImage}
                  title="Click to open certificate in full size"
                  style={{
                    position: "relative", borderRadius: 12,
                    overflow: "hidden", cursor: "zoom-in",
                    border: `1px solid ${color}22`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} certificate`}
                    loading="lazy"
                    style={{
                      width: "100%", height: 180,
                      objectFit: "cover", objectPosition: "top",
                      display: "block",
                      filter: "saturate(0.9) contrast(1.05)",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                  />
                  {/* Hover overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)`,
                    display: "flex", alignItems: "flex-end", justifyContent: "center",
                    padding: "0.6rem",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    pointerEvents: "none",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                  />
                  {/* Static label */}
                  <div style={{
                    position: "absolute", bottom: 8, right: 8,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 9999, padding: "0.18rem 0.6rem",
                    display: "flex", alignItems: "center", gap: "0.3rem",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "#fff", fontWeight: 600 }}>
                      Open certificate
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* No image note */}
            {!item.image && (
              <div style={{
                marginTop: "1rem",
                padding: "0.6rem 0.85rem",
                borderRadius: 10,
                background: `${color}08`,
                border: `1px dashed ${color}22`,
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)" }}>
                  Physical certificate — photo not available
                </span>
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────── */
const Journey = () => {
  const [filter, setFilter] = useState("All");

  const filtered = (filter === "All"
    ? [...ACHIEVEMENTS]
    : ACHIEVEMENTS.filter((a) => TYPE_LABEL[a.type] === filter)
  ).sort((a, b) => b.sortKey - a.sortKey);

  const totalAwards = ACHIEVEMENTS.filter((a) => a.type === "achievement" || a.type === "honor").length;
  const totalCerts  = ACHIEVEMENTS.filter((a) => a.type === "cert").length;
  const withImages  = ACHIEVEMENTS.filter((a) => a.image).length;

  return (
    <main className="page-content" id="page-journey">
      {/* Background glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", right: 0, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, var(--color-orb-violet) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,69,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <section style={{ padding: "5rem 0 7rem", position: "relative", zIndex: 1 }}>
        <div className="section-wrapper">

          {/* Header */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Every certificate has a story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "1rem" }}>
            Journey &amp; <span className="saffron-text-gradient">Achievements</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-muted)", maxWidth: 560, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Not just certificates — these are the moments that actually changed me. Click any certificate image to open it full size.
          </motion.p>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            {[
              { n: `${ACHIEVEMENTS.length}`, label: "Total Milestones" },
              { n: `${totalAwards}`,         label: "Awards & Honours" },
              { n: `${totalCerts}`,          label: "Certifications" },
              { n: `${withImages}`,          label: "Verified Certificates" },
            ].map((s) => (
              <div key={s.label} className="glass-card"
                style={{ padding: "0.85rem 1.4rem", borderRadius: 14, textAlign: "center", minWidth: 110 }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "var(--color-accent-gold)", marginBottom: "0.1rem" }}>{s.n}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Filter pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                id={`journey-filter-${f.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  padding: "0.38rem 1rem", borderRadius: 9999,
                  fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500,
                  cursor: "pointer", transition: "all 0.22s ease",
                  border: filter === f ? "1px solid var(--color-accent-gold)55" : "1px solid var(--color-border)",
                  background: filter === f ? "rgba(232,160,69,0.12)" : "var(--color-card)",
                  color: filter === f ? "var(--color-accent-gold)" : "var(--color-body-muted)",
                  boxShadow: filter === f ? "0 0 14px rgba(232,160,69,0.2)" : "none",
                }}>
                {f}
              </button>
            ))}
          </motion.div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
                alignItems: "start",
              }}
            >
              {filtered.map((item, i) => (
                <CertCard key={item.title} item={item} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--color-body-faint)", textAlign: "center", padding: "3rem 0" }}>
              No items in this category yet.
            </p>
          )}

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: "5rem", textAlign: "center" }}
          >
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "var(--color-heading)", maxWidth: 680, margin: "0 auto", lineHeight: 1.55 }}>
              "Every stage was small. Every habit it built — was not."
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-gold)", marginTop: "0.75rem" }}>
              — Amritansh Gupta
            </p>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default Journey;
