import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "./BackBtn";

const ITEMS = [
  { id: "i",   badge: "I",   title: "EDUCATION",  subtitle: "Mastère 1 Informatique / Ynov", rank: 4 },
  { id: "ii",  badge: "II",  title: "SKILLS",     subtitle: "Web / Temps réel / Game dev",  rank: 5 },
  { id: "iii", badge: "III", title: "PROJECTS",   subtitle: "Sélection GitHub",             rank: 5 },
  { id: "iv",  badge: "IV",  title: "EXPERIENCE", subtitle: "Projets / Alternance",         rank: 3 },
];

const PANELS = [
  {
    topIndex: "01", topTitle: "EDUCATION LOG", topRight: "M1",
    rows: [
      { index: "01", title: "Mastère 1",             status: "En cours" },
      { index: "02", title: "Bachelor Informatique", status: "Validé" },
      { index: "03", title: "DevOps / CI-CD",        status: "Validé" },
      { index: "04", title: "Méthodes agiles",       status: "Validé" },
    ],
    bottomTitle: "DETAILS",
    bullets: [
      "- Étudiant en Mastère 1 informatique, spécialisation développement.",
      "- Projets de groupe (Kivro, fil rouge, TechBoard) et projets perso en parallèle.",
      "- À la recherche d'une alternance en développement (Lyon / télétravail).",
    ],
  },
  {
    topIndex: "02", topTitle: "SKILLS LOG", topRight: "5/5",
    rows: [
      { index: "01", title: "Frontend",     status: "Avancé" },
      { index: "02", title: "Backend",      status: "Solide" },
      { index: "03", title: "Temps réel",   status: "Solide" },
      { index: "04", title: "Game dev",     status: "Passion" },
      { index: "05", title: "IA & outils",  status: "Quotidien" },
    ],
    bottomTitle: "STACK",
    bullets: [
      "- Front : TypeScript, React, Vue 3, Nuxt, Pinia, Tailwind, Vite, Framer Motion.",
      "- Back : Node.js, Express, Socket.io, Go, PHP, Python, SQLite / MySQL.",
      "- Jeux : Roblox (Luau, Rojo), Godot, C#, Pygame.",
      "- Outils : Git, GitHub Actions, tests automatisés, Vercel, Claude Code, API LLM.",
    ],
  },
  {
    topIndex: "03", topTitle: "PROJECTS LOG", topRight: "TOP",
    rows: [
      { index: "01", title: "Undercover",       status: "TS / Socket.io" },
      { index: "02", title: "Alternance Bot",   status: "TS / IA" },
      { index: "03", title: "Eclipse Clicker",  status: "Vue 3" },
      { index: "04", title: "osu! Replay",      status: "Python" },
      { index: "05", title: "Eggs & Pet Fusion", status: "Roblox" },
    ],
    bottomTitle: "INFO",
    bullets: [
      "- Détails et liens dans SIDE PROJECTS et ROBLOX GAMES.",
      "- Projets variés : jeux multijoueurs, outils IA, sites, bots.",
      "- Code disponible sur GitHub @Ssnakyx.",
    ],
  },
  {
    topIndex: "04", topTitle: "EXPERIENCE LOG", topRight: "→",
    rows: [
      { index: "01", title: "Projets clients école", status: "Équipe" },
      { index: "02", title: "Jeux Roblox",           status: "En cours" },
      { index: "03", title: "Projets personnels",    status: "Ongoing" },
    ],
    bottomTitle: "DISPONIBILITÉ",
    bullets: [
      "- Ouvert à l'alternance et aux stages en développement.",
      "- Habitué à livrer vite : tests, CI et déploiement sur chaque projet.",
      "- Contact : hamed0405n@gmail.com.",
    ],
  },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive((i) => Math.max(0, (i ?? 1) - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, (i ?? -1) + 1));
      if (e.key === "ArrowLeft") navigate('/');
      if (e.key === "Escape" || e.key === "Backspace") navigate('/');
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          pointer-events: all;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

        .resume-mobile-controls {
          display: none;
        }

        .resume-mobile-btn {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(6, 13, 55, 0.8);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 84px;
        }

        @media (max-width: 768px) {
          .resume-overlay {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            pointer-events: all;
            padding-bottom: 72px;
          }

          .resume-stack {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            padding: 16px 14px 10px !important;
            pointer-events: all !important;
          }

          .resume-list-tag {
            font-size: 56px !important;
            margin: 0 0 8px 8px !important;
          }

          .resume-card { height: 86px !important; }

          .resume-title { font-size: 38px !important; }

          .resume-detail-panel {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            width: calc(100% - 28px) !important;
            min-height: unset !important;
            margin: 8px 14px 16px !important;
            pointer-events: all !important;
          }

          .resume-mobile-controls {
            position: fixed;
            left: 8px;
            right: 8px;
            bottom: max(8px, env(safe-area-inset-bottom));
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            pointer-events: all;
          }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active !== null && (() => {
          const p = PANELS[active];
          return (
            <div className="resume-detail-panel" key={active}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">{p.topIndex}</div>
                <div className="resume-detail-top-title">{p.topTitle}</div>
                <div className="resume-detail-top-progress">{p.topRight}</div>
              </div>
              <div className="resume-detail-list">
                {p.rows.map((row) => (
                  <div className="resume-detail-row" key={row.index}>
                    <div className="resume-detail-row-index">{row.index}</div>
                    <div className="resume-detail-row-title">{row.title}</div>
                    <div className="resume-detail-status">{row.status}</div>
                  </div>
                ))}
              </div>
              <div className="resume-detail-bottom">
                <div className="resume-detail-bottom-title">{p.bottomTitle}</div>
                <div className="resume-detail-bullets">
                  {p.bullets.map((b, i) => (
                    <div className="resume-detail-bullet" key={i}>{b}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      <BackBtn />
      <div className="resume-mobile-controls" aria-label="Resume mobile controls">
        <button className="resume-mobile-btn" type="button" onClick={() => navigate('/')}>
          BACK
        </button>
      </div>
    </div>
  );
}