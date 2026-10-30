import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "./BackBtn";
const bgVideo = 'https://res.cloudinary.com/dgjkpams2/video/upload/v1777239696/main1_r0c9zc.mp4'

const PROJECTS = [
  {
    id: "undercover",
    badge: "01",
    title: "UNDERCOVER",
    subtitle: "Jeu multijoueur temps réel",
    lang: "TS",
    description: "Le jeu d'ambiance Undercover version gaming, de 3 à 12 joueurs, un téléphone chacun. Quatre univers (LoL, Smash, Pokémon, jeux vidéo), rôles spéciaux et votes en direct. Moteur de jeu testé côté serveur.",
    tags: ["TypeScript", "React", "Socket.io", "Express", "Tests"],
    url: "https://github.com/Ssnakyx/Undercover",
    demo: "https://undercover-xi-five.vercel.app",
  },
  {
    id: "alternance-bot",
    badge: "02",
    title: "ALTERNANCE BOT",
    subtitle: "Outil IA / Dashboard",
    lang: "TS",
    description: "Récupère chaque matin les offres d'alternance, les note selon le CV grâce à l'IA et prépare lettre, CV adapté et email. Tableau de bord de suivi des candidatures. Rien n'est envoyé sans validation.",
    tags: ["TypeScript", "IA / LLM", "Dashboard", "Automatisation"],
    url: "https://github.com/Ssnakyx/Alternance-Bot",
    demo: "https://alternance-bot.vercel.app",
  },
  {
    id: "eclipse",
    badge: "03",
    title: "ECLIPSE",
    subtitle: "Clicker narratif pixel art",
    lang: "VUE",
    description: "Idle game narratif en pixel art : quatre chapitres de l'Aube à la Nuit, améliorations, synergies, thèmes et musique qui évoluent avec la progression. Sauvegarde automatique et CI.",
    tags: ["Vue 3", "TypeScript", "Pinia", "Tailwind", "CI"],
    url: "https://github.com/Ssnakyx/Clicker",
  },
  {
    id: "osu",
    badge: "04",
    title: "OSU! REPLAY VIEWER",
    subtitle: "Python / Web + Desktop",
    lang: "PY",
    description: "Lecteur de replays osu! dans le navigateur ou en fenêtre native. On dépose un ou deux .osr, la beatmap est téléchargée automatiquement, avec score, précision, combo, skins et comparaison de deux joueurs.",
    tags: ["Python", "Pygame", "Web", "Parsing binaire"],
    url: "https://github.com/Ssnakyx/OsuProjects",
  },
  {
    id: "aliamnt",
    badge: "05",
    title: "ALIAMNT",
    subtitle: "Site d'ONG santé",
    lang: "VUE",
    description: "Site d'une ONG (démo) de jeunes d'Afrique de l'Ouest engagés contre les maladies non transmissibles : campagnes, antennes, actions de prévention. Entièrement en français, déployé sur Vercel.",
    tags: ["Vue", "Vite", "Responsive", "Tests"],
    url: "https://github.com/Ssnakyx/aliamnt",
    demo: "https://aliamnt.vercel.app",
  },
  {
    id: "minigames",
    badge: "06",
    title: "MINI-GAMES ONLINE",
    subtitle: "Go / WebSocket",
    lang: "GO",
    description: "Plateforme de mini-jeux multijoueurs en temps réel : morpion, puissance 4, pendu, dots & boxes. Salles avec code, hôte/invité, reconnexion automatique.",
    tags: ["Go", "WebSocket", "JavaScript", "Temps réel"],
    url: "https://github.com/Ssnakyx/DEV",
  },
  {
    id: "loldashboard",
    badge: "07",
    title: "LOL DASHBOARD",
    subtitle: "Nuxt 4 / TypeScript",
    lang: "TS",
    description: "Tableau de bord League of Legends : exploration et comparaison de champions, statistiques, profil d'invocateur, authentification et interface bilingue FR / EN.",
    tags: ["Nuxt 4", "Nuxt UI", "TypeScript", "i18n"],
    url: "https://github.com/Ssnakyx/LolDashboard",
  },
  {
    id: "challenge48h",
    badge: "08",
    title: "CHALLENGE 48H",
    subtitle: "PHP / Travail d'équipe",
    lang: "PHP",
    description: "Application web complète réalisée en 48h en groupe dans le cadre d'un challenge étudiant. Conception, développement et livraison sous contrainte de temps.",
    tags: ["PHP", "HTML", "CSS", "Équipe"],
    url: "https://github.com/Ssnakyx/Challenge48h-G9",
  },
  {
    id: "pokehamed",
    badge: "09",
    title: "POKEHAMED",
    subtitle: "C# / Jeu au tour par tour",
    lang: "C#",
    description: "Jeu inspiré de Pokémon en C# : combats au tour par tour, collection de créatures, statistiques et progression du joueur.",
    tags: ["C#", ".NET", "POO", "Game Dev"],
    url: "https://github.com/Ssnakyx/PokeHamed",
  },
];

export default function SideProjPage({ projects = PROJECTS, heading = "PROJECTS", linkLabel = "GITHUB" }) {
  const PROJECTS = projects;
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")    setActive((i) => Math.max(0, (i ?? 0) - 1));
      if (e.key === "ArrowDown")  setActive((i) => Math.min(PROJECTS.length - 1, (i ?? -1) + 1));
      if (e.key === "Enter" && active !== null && PROJECTS[active].url) window.open(PROJECTS[active].url, "_blank");
      if (e.key === "ArrowLeft")  navigate('/');
      if (e.key === "Escape" || e.key === "Backspace") navigate('/');
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, PROJECTS]);

  const proj = active !== null ? PROJECTS[active] : null;

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
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }
        .sp-github-btn {
          display: inline-block;
          text-decoration: none;
        }
        .sp-github-btn.alt {
          background: transparent;
          color: #8ef5ff;
          box-shadow: inset 0 0 0 2px #8ef5ff;
        }
        .sp-github-btn.disabled {
          cursor: default;
          opacity: 0.55;
        }
        .sp-stack-scroll {
          max-height: calc((91vh - 190px) / 0.9);
          overflow-y: auto;
          overflow-x: hidden;
          padding: 4px 18px 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: all;
          scrollbar-width: thin;
          scrollbar-color: #85f4ff transparent;
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
          text-decoration: none;
          text-align: center;
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
          .sp-stack-scroll {
            max-height: none;
            overflow: visible;
            padding: 0;
          }
          .sp-overlay {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            pointer-events: all;
            padding-bottom: 72px;
          }

          .sp-stack {
            position: relative !important;
            transform: none !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            padding: 16px 14px 10px !important;
            pointer-events: all !important;
          }

          .sp-list-tag {
            font-size: 56px !important;
            margin: 0 0 8px 8px !important;
          }

          .sp-card { height: 80px !important; }

          .sp-title { font-size: 28px !important; }

          .sp-detail-panel {
            position: relative !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: calc(100% - 28px) !important;
            min-height: unset !important;
            margin: 8px 14px 16px !important;
            pointer-events: all !important;
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
          <div className={`sp-list-tag${mounted ? " mounted" : ""}`}>{heading}</div>
          <div className="sp-stack-scroll">
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
        </div>

        {proj && <div className="sp-detail-panel" key={proj.id}>
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
            {proj.demo && (
              <a className="sp-github-btn" href={proj.demo} target="_blank" rel="noopener noreferrer">
                {proj.demoLabel ?? "VOIR LA DÉMO"} →
              </a>
            )}
            {proj.url ? (
              <a className="sp-github-btn alt" href={proj.url} target="_blank" rel="noopener noreferrer">
                {linkLabel} →
              </a>
            ) : (
              !proj.demo && <span className="sp-github-btn disabled">BIENTÔT EN LIGNE</span>
            )}
          </div>
        </div>}
      </div>

      <div className={`sp-footer${mounted ? " mounted" : ""}`}>
        <div className="sp-footer-row"><span className="sp-footer-key">CLICK / ↑↓</span><span>SELECT</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">↵</span><span>OPEN</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <BackBtn />
      <div className="sp-mobile-controls" aria-label="Side projects mobile controls">
        <button className="sp-mobile-btn" type="button" onClick={() => navigate('/')}>
          BACK
        </button>
        {proj && (proj.demo || proj.url) && (
          <a
            className="sp-mobile-btn"
            href={proj.demo ?? proj.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            OPEN
          </a>
        )}
      </div>
    </div>
  );
}
