import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";

const PROJECTS = [
  {
    id: "i",
    badge: "01",
    title: "CHALLENGE 48H",
    subtitle: "PHP / Web Challenge",
    lang: "PHP",
    rank: 4,
    description: "Application web complète réalisée en 48h en groupe dans le cadre d'un challenge étudiant. Conception, développement et livraison sous contrainte de temps.",
    tags: ["PHP", "HTML", "CSS", "Team"],
    url: "https://github.com/Ssnakyx/Challenge48h-G9",
  },
  {
    id: "ii",
    badge: "02",
    title: "LOL DASHBOARD",
    subtitle: "TypeScript / Riot API",
    lang: "TS",
    rank: 5,
    description: "Dashboard League of Legends utilisant l'API Riot Games pour afficher les statistiques de joueurs en temps réel : rang, winrate, historique de parties.",
    tags: ["TypeScript", "Riot API", "Dashboard", "API REST"],
    url: "https://github.com/Ssnakyx/LolDashboard",
  },
  {
    id: "iii",
    badge: "03",
    title: "RAPPORT STAGE V2",
    subtitle: "Web App / Report",
    lang: "WEB",
    rank: 3,
    description: "Version 2 d'une application de rapport de stage. Refonte complète de l'interface pour améliorer l'expérience utilisateur et moderniser l'architecture.",
    tags: ["Vue.js", "Web", "Refonte", "UI/UX"],
    url: "https://github.com/Ssnakyx/RapportStageV2",
  },
  {
    id: "iv",
    badge: "04",
    title: "DISCORD BOT",
    subtitle: "JavaScript / Bot",
    lang: "JS",
    rank: 4,
    description: "Bot Discord personnalisé avec commandes automatisées, modération, réponses contextuelles et intégrations serveur pour améliorer l'expérience communautaire.",
    tags: ["JavaScript", "Discord.js", "Bot", "Node.js"],
    url: "https://github.com/Ssnakyx/Discord-bot",
  },
  {
    id: "v",
    badge: "05",
    title: "BREAKOUT GAME",
    subtitle: "Python / Pygame",
    lang: "PY",
    rank: 3,
    description: "Jeu Breakout classique développé en Python avec Pygame. Mécaniques de balle, briques destructibles, niveaux progressifs et système de score.",
    tags: ["Python", "Pygame", "Game Dev", "OOP"],
    url: "https://github.com/Ssnakyx/BreakOut_Game",
  },
  {
    id: "vi",
    badge: "06",
    title: "POKEHAMED",
    subtitle: "C# / Game",
    lang: "C#",
    rank: 4,
    description: "Jeu inspiré de Pokémon développé en C#. Système de combat au tour par tour, collection de créatures, statistiques et progression du joueur.",
    tags: ["C#", "Game Dev", "OOP", ".NET"],
    url: "https://github.com/Ssnakyx/PokeHamed",
  },
];

export default function SideProjPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")    setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown")  setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === "Enter")      window.open(PROJECTS[active].url, "_blank");
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const proj = PROJECTS[active];

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className="sp-entry-mask" aria-hidden="true">
        <video className="sp-entry-video" src={bgVideo} autoPlay loop muted playsInline />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .sp-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #c4001a;
          clip-path: circle(0 at 50% 50%);
          animation: sp-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        .sp-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @keyframes sp-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        .sp-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        /* ── Left stack ── */
        .sp-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .sp-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 4px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sp-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .sp-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .sp-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .sp-card {
          position: relative;
          height: 88px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .sp-card-wrap.active .sp-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .sp-card-inner {
          position: absolute;
          inset: 0;
          padding: 10px 22px 10px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .sp-badge {
          position: absolute;
          top: 8px;
          left: -10px;
          width: 56px;
          height: 62px;
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
        .sp-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .sp-card-wrap.active .sp-badge {
          background: #000;
          border-color: #000;
        }
        .sp-card-wrap.active .sp-badge-text {
          color: #fff;
        }

        .sp-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .sp-card-wrap.active .sp-title {
          color: #000;
        }

        .sp-lang-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          padding: 4px 10px;
          background: rgba(133, 244, 255, 0.15);
          color: #9ffbff;
          border: 1px solid rgba(133, 244, 255, 0.3);
          align-self: center;
          flex-shrink: 0;
          transition: background 0.22s ease, color 0.22s ease;
        }
        .sp-card-wrap.active .sp-lang-badge {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .sp-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 10px;
          height: 28px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .sp-card-wrap.active .sp-subtitle-bar {
          background: #000;
        }
        .sp-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .sp-card-wrap.active .sp-subtitle {
          color: #fff;
        }

        /* ── Right detail panel ── */
        .sp-detail-panel {
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
        .sp-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }

        .sp-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 84px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .sp-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .sp-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .sp-detail-top-lang {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px;
          letter-spacing: 2px;
          line-height: 1;
        }

        .sp-detail-desc {
          position: relative;
          margin-top: 18px;
          padding: 16px 18px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
        }
        .sp-detail-desc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }
        .sp-detail-desc-text {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          line-height: 1.25;
          color: #edfaff;
        }

        .sp-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }
        .sp-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 1.5px;
          color: #06133b;
          background: #8df6ff;
          padding: 5px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .sp-detail-github {
          display: flex;
          margin-top: 22px;
        }
        .sp-github-btn {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: #08153f;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          border: none;
          padding: 12px 28px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .sp-github-btn:hover {
          opacity: 0.85;
        }

        /* ── Footer hints ── */
        .sp-footer {
          position: fixed;
          bottom: 20px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sp-footer.mounted { opacity: 1; }
        .sp-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sp-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        /* ── Mobile ── */
        .sp-mobile-controls {
          display: none;
        }
        .sp-mobile-btn {
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
          .sp-stack {
            transform: scale(0.78);
            top: 4vh;
            left: 1vw;
            width: 96vw;
          }
          .sp-list-tag {
            font-size: 64px;
          }
          .sp-card { height: 72px; }
          .sp-title { font-size: 30px; }
          .sp-detail-panel {
            top: auto;
            bottom: 70px;
            left: 8px;
            right: 8px;
            width: auto;
            min-height: unset;
          }
          .sp-footer { display: none; }
          .sp-mobile-controls {
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

        @media (min-width: 769px) and (max-width: 1200px) {
          .sp-stack {
            transform: scale(0.82);
          }
          .sp-detail-panel {
            right: 2vw;
            width: min(42vw, 560px);
          }
        }
      `}</style>

      <div className="sp-overlay">
        <div className="sp-stack">
          <div className={`sp-list-tag${mounted ? " mounted" : ""}`}>PROJECTS</div>
          {PROJECTS.map((proj, index) => (
            <div
              key={proj.id}
              className={`sp-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 45}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="sp-card">
                <div className="sp-badge">
                  <div className="sp-badge-text">{proj.badge}</div>
                </div>
                <div className="sp-card-inner">
                  <div className="sp-title">{proj.title}</div>
                  <div className="sp-lang-badge">{proj.lang}</div>
                </div>
                <div className="sp-subtitle-bar">
                  <div className="sp-subtitle">{proj.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sp-detail-panel" key={proj.id}>
          <div className="sp-detail-top">
            <div className="sp-detail-top-index">{proj.badge}</div>
            <div className="sp-detail-top-title">{proj.title}</div>
            <div className="sp-detail-top-lang">{proj.lang}</div>
          </div>

          <div className="sp-detail-desc">
            <div className="sp-detail-desc-label">DESCRIPTION</div>
            <div className="sp-detail-desc-text">{proj.description}</div>
          </div>

          <div className="sp-detail-tags">
            {proj.tags.map((tag) => (
              <span className="sp-tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="sp-detail-github">
            <button
              className="sp-github-btn"
              onClick={() => window.open(proj.url, "_blank")}
            >
              OPEN ON GITHUB →
            </button>
          </div>
        </div>
      </div>

      <div className={`sp-footer${mounted ? " mounted" : ""}`}>
        <div className="sp-footer-row"><span className="sp-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">↵</span><span>OPEN</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="sp-mobile-controls" aria-label="Side projects mobile controls">
        <button className="sp-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button
          className="sp-mobile-btn"
          type="button"
          onClick={() => window.open(proj.url, "_blank")}
        >
          GITHUB
        </button>
      </div>
    </div>
  );
}
