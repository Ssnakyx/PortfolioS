import { useEffect, useState } from "react";
import { LangContext, STORAGE_KEY, detectLang } from "./i18n";

export default function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* stockage indisponible */ }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
