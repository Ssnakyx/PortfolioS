import { useLocation } from "react-router-dom";
import { useLang, LANGS } from "./i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  // Sur mobile, le bouton ne s'affiche que sur le menu pour ne rien recouvrir.
  const onHome = useLocation().pathname === "/";
  return (
    <>
      <style>{`
        .lang-toggle {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 9600;
          display: flex;
          gap: 2px;
          padding: 3px;
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.16);
          clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          pointer-events: all;
        }
        .lang-toggle button {
          font-family: 'Anton', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          border: none;
          padding: 5px 12px;
          cursor: pointer;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .lang-toggle button:hover { color: #fff; }
        .lang-toggle button.on {
          color: #fff;
          background: rgba(196, 0, 26, 0.75);
        }
        @media (max-width: 768px) {
          .lang-toggle { top: 10px; right: 10px; }
          .lang-toggle button { font-size: 13px; padding: 6px 11px; }
          .lang-toggle.off-home { display: none; }
        }
      `}</style>
      <div className={`lang-toggle${onHome ? "" : " off-home"}`} role="group" aria-label="Language / Langue">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            className={lang === l ? "on" : ""}
            aria-pressed={lang === l}
            onClick={(e) => { e.stopPropagation(); setLang(l); }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
