import SideProjPage from "./SideProjPage";

const GAMES = [
  {
    id: "eggs-pet-fusion",
    badge: "01",
    title: "EGGS & PET FUSION",
    subtitle: "Simulateur de pets / Collection",
    lang: "LUAU",
    description: "Capture des pets sauvages sur 15 îles, fusionne-les pour obtenir des œufs, fais-les éclore et collectionne des mutations rares. Boss, donjons, quêtes et échanges entre joueurs.",
    tags: ["Roblox Studio", "Luau", "Rojo", "luau-lsp", "Selene"],
    skills: [
      "Gros projet multi-systèmes : 250+ pets, boss, donjons, échanges",
      "Économie de jeu équilibrée et offres Robux",
      "Tutoriel guidé, guide intégré et analytics joueurs",
      "Sauvegardes DataStore et tests automatisés en jeu",
    ],
  },
  {
    id: "candy-cloud-tycoon",
    badge: "02",
    title: "CANDY CLOUD TYCOON",
    subtitle: "Tycoon / Gestion",
    lang: "LUAU",
    description: "Construis ta fabrique de bonbons dans les nuages, achète des améliorations et fais grandir ton empire sucré.",
    tags: ["Roblox Studio", "Luau", "Rojo"],
    skills: [
      "Boucle de progression tycoon (achats, revenus, améliorations)",
      "Économie et équilibrage des prix",
      "Interface et retours visuels pour le joueur",
      "Sauvegarde de la progression",
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
