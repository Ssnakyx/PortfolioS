import { createContext, useContext } from "react";

// Langues du site : français et anglais.
// Par défaut on suit la langue du navigateur (fr* → français, sinon anglais).
// Si le visiteur clique sur le bouton FR / EN, son choix est mémorisé.
export const LANGS = ["fr", "en"];
export const STORAGE_KEY = "lang";

export function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* stockage indisponible */ }
  if (typeof navigator === "undefined") return "en";
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return (prefs[0] || "").toLowerCase().startsWith("fr") ? "fr" : "en";
}

export const LangContext = createContext({ lang: "fr", setLang: () => {} });

// Renvoie { lang, setLang, t } ; t({ fr, en }) choisit le texte de la langue active.
// Une simple chaîne est renvoyée telle quelle (texte identique dans les deux langues).
export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (value) => (value && typeof value === "object" && !Array.isArray(value) ? value[lang] ?? value.fr : value);
  return { lang, setLang, t };
}
