import SideProjPage from "./SideProjPage";

// Ajouter le lien roblox.com/games/... dans `demo` dès qu'un jeu est publié.
const GAMES = [
  {
    id: "steal-a-fossil",
    badge: "01",
    title: "STEAL A FOSSIL",
    subtitle: "Roblox / Simulateur PvP",
    lang: "LUAU",
    description: "Cours sur la route préhistorique, arrache des blocs fossiles gardés par des dinos vivants, ramène-les dans ton parc, réanime-les et fusionne-les en hybrides. Code en Luau strict avec Rojo, tests hors Studio et CI sur chaque PR.",
    tags: ["Luau", "Rojo", "Selene", "CI", "DataStores"],
    url: "https://github.com/Ssnakyx/Steal-a-Fossile",
    demoLabel: "JOUER SUR ROBLOX",
  },
  {
    id: "launch-to-space",
    badge: "02",
    title: "LAUNCH TO SPACE",
    subtitle: "Roblox / Simulateur",
    lang: "LUAU",
    description: "Jeu de conquête spatiale : décolle de la Terre et pousse jusqu'à la Lune puis Mars. Systèmes en autorité serveur, interface et effets visuels faits sur mesure, outillage Rojo, Wally, Selene et StyLua.",
    tags: ["Luau", "Rojo", "Wally", "UI", "VFX"],
    demoLabel: "JOUER SUR ROBLOX",
  },
  {
    id: "dohi",
    badge: "03",
    title: "DOHI",
    subtitle: "Roblox / Jeu de bluff",
    lang: "LUAU",
    description: "Jeu de bluff de 2 à 8 joueurs en vue à la première personne, assis autour d'une table dans un bar clandestin sombre. Ambiance, caméra et animations travaillées, modèles faits dans Blender.",
    tags: ["Luau", "Rojo", "Blender", "Multijoueur"],
    demoLabel: "JOUER SUR ROBLOX",
  },
];

export default function RobloxPage() {
  return <SideProjPage projects={GAMES} heading="ROBLOX" />;
}
