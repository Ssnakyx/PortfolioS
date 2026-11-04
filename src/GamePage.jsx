import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GAMES } from "./gamesData";
import { GAME_MEDIA } from "./gameMedia";
import { useLang } from "./i18n";

const ModelViewer = lazy(() => import("./ModelViewer"));

const TEST_LABEL = { fr: "TESTER LE JEU", en: "PLAY THE GAME" };

function Section({ title, children }) {
  return (
    <section className="gp-section">
      <h2 className="gp-heading">{title}</h2>
      {children}
    </section>
  );
}

// Le viewer et three.js ne se chargent qu'à l'approche de la section.
function ModelSection({ models }) {
  const { t } = useLang();
  const hostRef = useRef(null);
  const [near, setNear] = useState(false);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  const item = models[index];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNear(true);
    }, { rootMargin: "300px" });
    observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section title="3D MODELS">
      <div className="gp-stage" ref={hostRef}>
        {near && (
          <Suspense fallback={null}>
            <ModelViewer url={item.src} onStatus={setStatus} />
          </Suspense>
        )}
        {status === "loading" && <div className="gp-status">LOADING...</div>}
        {status === "error" && (
          <div className="gp-status">
            {t({ fr: "Impossible d'afficher ce modèle sur cet appareil.", en: "This model can't be displayed on this device." })}
          </div>
        )}
        {status === "ready" && (
          <div className="gp-hint">{t({ fr: "Glisse pour faire tourner", en: "Drag to rotate" })}</div>
        )}
      </div>
      <div className="gp-caption">{t(item.name)}</div>
      <div className="gp-strip">
        {models.map((m, i) => (
          <button
            key={m.src}
            type="button"
            className={`gp-thumb${i === index ? " active" : ""}`}
            aria-label={t(m.name)}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            <img src={m.thumb} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </Section>
  );
}

function Gallery({ title, items, onOpen }) {
  const { t } = useLang();
  return (
    <Section title={title}>
      <div className="gp-grid">
        {items.map((item, i) => (
          <button key={item.src} type="button" className="gp-shot" onClick={() => onOpen(items, i)}>
            <img src={item.thumb} alt={t(item.name)} loading="lazy" />
            <span>{t(item.name)}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Lightbox({ items, start, onClose }) {
  const { t } = useLang();
  const [index, setIndex] = useState(start);
  const closeRef = useRef(null);
  const item = items[index];
  const step = (d) => setIndex((i) => (i + d + items.length) % items.length);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  return (
    <div className="gp-lightbox" role="dialog" aria-modal="true" aria-label={t(item.name)} onClick={onClose}>
      <img src={item.src} alt={t(item.name)} onClick={(e) => e.stopPropagation()} />
      <div className="gp-lightbox-bar" onClick={(e) => e.stopPropagation()}>
        {items.length > 1 && (
          <button type="button" className="gp-btn alt" aria-label="Previous" onClick={() => step(-1)}>◄</button>
        )}
        <span className="gp-lightbox-name">{t(item.name)}</span>
        {items.length > 1 && (
          <button type="button" className="gp-btn alt" aria-label="Next" onClick={() => step(1)}>►</button>
        )}
        <button ref={closeRef} type="button" className="gp-btn" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
}

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const [lightbox, setLightbox] = useState(null);
  const game = GAMES.find((g) => g.id === gameId);
  const media = GAME_MEDIA[gameId];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (lightbox) setLightbox(null);
      else navigate("/roblox");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, navigate]);

  if (!game || !media) return <Navigate to="/roblox" replace />;

  const openLightbox = (items, start) => setLightbox({ items, start });

  return (
    <div className="gp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .gp-root {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          background: linear-gradient(180deg, #0f1c69 0%, #070e3d 100%);
          color: #edfaff;
        }
        .gp-top {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 4vw;
          background: rgba(7, 14, 61, 0.92);
          box-shadow: 0 1px 0 rgba(133, 244, 255, 0.18);
        }
        .gp-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 24px;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #08153f;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          border: none;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .gp-btn:hover { opacity: 0.85; }
        .gp-btn.alt { background: rgba(133, 244, 255, 0.14); color: #9ffbff; }
        .gp-btn.play { background: #d63232; color: #fff; font-size: 26px; min-height: 56px; padding: 0 34px; }

        .gp-hero {
          position: relative;
          min-height: min(62vh, 620px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px 4vw 28px;
          background-size: cover;
          background-position: center;
        }
        .gp-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 14, 61, 0.05) 30%, rgba(10, 18, 80, 0.97) 100%);
        }
        .gp-hero > * { position: relative; }
        .gp-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: #9ffbff;
        }
        .gp-title {
          margin: 4px 0;
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          font-size: clamp(44px, 8vw, 104px);
          line-height: 0.95;
          letter-spacing: 1px;
          overflow-wrap: anywhere;
        }
        .gp-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 2.6vw, 32px);
          letter-spacing: 2px;
          color: #8ef5ff;
          margin-bottom: 18px;
        }
        .gp-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
        .gp-wip {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          padding: 10px 16px;
          color: #06133b;
          background: #ffd166;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }

        .gp-body { padding: 8px 4vw 64px; max-width: 1280px; margin: 0 auto; }
        .gp-section { margin-top: 44px; }
        .gp-heading {
          display: inline-block;
          margin: 0 0 16px;
          padding: 6px 28px 6px 14px;
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          font-size: 28px;
          letter-spacing: 2px;
          color: #000;
          background: #fff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 8px 6px 0 #d63232;
        }
        .gp-text {
          margin: 0;
          max-width: 860px;
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.35;
          font-weight: 400;
        }
        .gp-steps { list-style: none; counter-reset: step; margin: 0; padding: 0; display: grid; gap: 10px; }
        .gp-steps li {
          counter-increment: step;
          display: flex;
          gap: 14px;
          align-items: baseline;
          padding: 12px 18px;
          background: rgba(8, 18, 72, 0.96);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.14);
          font-family: 'Anton', sans-serif;
          font-size: 19px;
          line-height: 1.3;
        }
        .gp-steps li::before {
          content: counter(step);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          color: #8ef5ff;
        }

        .gp-stage {
          position: relative;
          height: min(68vh, 620px);
          overflow: hidden;
          background: radial-gradient(circle at 50% 40%, #2f3f92 0%, #0a1248 75%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.16);
        }
        .sc-canvas, .sc-canvas canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; cursor: grab; }
        .gp-status, .gp-hint {
          position: absolute;
          left: 0;
          right: 0;
          padding: 0 12px;
          text-align: center;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          pointer-events: none;
        }
        .gp-status { top: 46%; font-size: 26px; }
        .gp-hint { bottom: 10px; font-size: 16px; color: rgba(237, 250, 255, 0.65); }
        .gp-caption {
          margin: 10px 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #91f5ff;
        }
        .gp-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
          scrollbar-color: #85f4ff transparent;
        }
        .gp-thumb {
          flex: 0 0 auto;
          width: 96px;
          height: 76px;
          padding: 0;
          overflow: hidden;
          background: #16206f;
          border: 2px solid transparent;
          cursor: pointer;
        }
        .gp-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gp-thumb.active, .gp-thumb:hover { border-color: #fff; }

        .gp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
        .gp-shot {
          padding: 0;
          overflow: hidden;
          text-align: left;
          color: inherit;
          background: rgba(8, 18, 72, 0.96);
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .gp-shot:hover { border-color: #fff; }
        .gp-shot img { width: 100%; aspect-ratio: 16 / 10; object-fit: contain; display: block; background: #0a1248; }
        .gp-shot span {
          display: block;
          padding: 8px 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: 1.5px;
          color: #91f5ff;
        }
        .gp-video { width: 100%; max-height: 70vh; display: block; background: #000; }

        .gp-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .gp-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: 1.5px;
          color: #06133b;
          background: #8df6ff;
          padding: 5px 14px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .gp-skill { font-family: 'Anton', sans-serif; font-size: 19px; line-height: 1.4; }

        .gp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 4vw calc(14px + env(safe-area-inset-bottom));
          background: rgba(4, 8, 40, 0.96);
        }
        .gp-lightbox img { flex: 1; min-height: 0; width: 100%; object-fit: contain; }
        .gp-lightbox-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px; }
        .gp-lightbox-name {
          flex: 1 1 200px;
          text-align: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          color: #91f5ff;
        }

        @media (max-width: 768px) {
          .gp-top { padding: 10px 16px; }
          .gp-hero { min-height: 52vh; padding: 28px 16px 20px; }
          .gp-body { padding: 4px 16px 48px; }
          .gp-section { margin-top: 32px; }
          .gp-heading { font-size: 24px; }
          .gp-text { font-size: 18px; }
          .gp-steps li { font-size: 17px; padding: 10px 14px; }
          .gp-stage { height: 56vh; }
          .gp-grid { grid-template-columns: 1fr; }
          .gp-btn.play { font-size: 22px; }
        }
      `}</style>

      <div className="gp-top">
        <button type="button" className="gp-btn alt" onClick={() => navigate("/roblox")}>◄ BACK</button>
        <div className="gp-top-title">{game.title}</div>
      </div>

      <header className="gp-hero" style={media.hero ? { backgroundImage: `url(${media.hero.src})` } : { minHeight: 0 }}>
        <div className="gp-badge">ROBLOX / {game.badge}</div>
        <h1 className="gp-title">{game.title}</h1>
        <div className="gp-subtitle">{t(game.subtitle)}</div>
        <div className="gp-actions">
          {game.demo ? (
            <a className="gp-btn play" href={game.demo} target="_blank" rel="noopener noreferrer">
              {t(TEST_LABEL)} →
            </a>
          ) : (
            <span className="gp-wip">{t({ fr: "EN DÉVELOPPEMENT", en: "IN DEVELOPMENT" })}</span>
          )}
        </div>
      </header>

      <div className="gp-body">
        <Section title={t({ fr: "LE JEU", en: "THE GAME" })}>
          <p className="gp-text">{t(game.description)}</p>
        </Section>

        <Section title="HOW IT PLAYS">
          <ol className="gp-steps">
            {media.howItPlays.map((step) => <li key={t(step)}>{t(step)}</li>)}
          </ol>
        </Section>

        {media.photos && <Gallery title="SCREENSHOTS" items={media.photos} onOpen={openLightbox} />}
        {media.models && <ModelSection models={media.models} />}
        {media.ui && <Gallery title="UI" items={media.ui} onOpen={openLightbox} />}
        {media.art && <Gallery title="ASSETS" items={media.art} onOpen={openLightbox} />}

        {media.videos && (
          <Section title="VIDEOS">
            {media.videos.map((video) => (
              <div key={video.src}>
                <video className="gp-video" src={video.src} poster={video.poster} controls playsInline preload="metadata" />
                <div className="gp-caption">{t(video.name)}</div>
              </div>
            ))}
          </Section>
        )}

        <Section title={t({ fr: "COMPÉTENCES", en: "SKILLS" })}>
          {game.skills.map((skill) => <div className="gp-skill" key={t(skill)}>— {t(skill)}</div>)}
        </Section>

        <Section title={t({ fr: "OUTILS", en: "TOOLS" })}>
          <div className="gp-tags">
            {game.tags.map((tag) => <span className="gp-tag" key={tag}>{tag}</span>)}
          </div>
        </Section>
      </div>

      {lightbox && <Lightbox items={lightbox.items} start={lightbox.start} onClose={() => setLightbox(null)} />}
    </div>
  );
}
