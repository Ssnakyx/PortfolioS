import SideProjPage from "./SideProjPage";

const GAMES = [
  {
    id: "steal-a-fossil",
    badge: "01",
    title: "STEAL A FOSSIL",
    subtitle: "Simulateur PvP / Collection",
    lang: "LUAU",
    description: "Cours sur la route préhistorique, vole des fossiles gardés par des dinos, ramène-les dans ton parc, réanime-les et fusionne-les en hybrides.",
    tags: ["Roblox Studio", "Luau strict", "Rojo", "Selene", "StyLua", "GitHub Actions"],
    skills: [
      "Architecture client / serveur en services et controllers",
      "Sécurité des RemoteEvents (le serveur valide tout)",
      "Sauvegardes DataStore fiables",
      "Tests automatisés hors Studio et CI sur chaque PR",
    ],
    url: "https://github.com/Ssnakyx/Steal-a-Fossile",
  },
  {
    id: "launch-to-space",
    badge: "02",
    title: "LAUNCH TO SPACE",
    subtitle: "Simulateur spatial",
    lang: "LUAU",
    description: "Décolle de la Terre et vise toujours plus loin : la Lune, puis Mars.",
    tags: ["Roblox Studio", "Luau", "Rojo", "Wally", "Blender"],
    skills: [
      "Systèmes de jeu en autorité serveur",
      "Interface (UI) faite sur mesure",
      "Effets visuels (VFX) et particules",
      "Modélisation 3D dans Blender",
    ],
  },
  {
    id: "dohi",
    badge: "03",
    title: "DOHI",
    subtitle: "Jeu de bluff multijoueur",
    lang: "LUAU",
    description: "Jeu de bluff de 2 à 8 joueurs, en vue à la première personne, assis autour d'une table dans un bar clandestin sombre.",
    tags: ["Roblox Studio", "Luau", "Rojo", "Lune", "Blender"],
    skills: [
      "Logique de jeu au tour par tour en multijoueur",
      "Caméra et animations à la première personne",
      "Direction artistique et ambiance (lumière, décor)",
      "Modèles 3D faits main dans Blender",
    ],
  },
];

export default function RobloxPage() {
  return <SideProjPage projects={GAMES} heading="ROBLOX" />;
}
