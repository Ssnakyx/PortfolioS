import SideProjPage from "./SideProjPage";

const GAMES = [
  {
    id: "eggs-pet-fusion",
    badge: "01",
    title: "EGGS & PET FUSION",
    subtitle: { fr: "Simulateur de pets / Collection", en: "Pet simulator / Collection" },
    lang: "LUAU",
    description: {
      fr: "Capture des pets sauvages sur 15 îles, fusionne-les pour obtenir des œufs, fais-les éclore et collectionne des mutations rares. Boss, donjons, quêtes et échanges entre joueurs.",
      en: "Catch wild pets across 15 islands, fuse them into eggs, hatch them and collect rare mutations. Bosses, dungeons, quests and player-to-player trading.",
    },
    tags: ["Roblox Studio", "Luau", "Rojo", "luau-lsp", "Selene"],
    skills: [
      { fr: "Gros projet multi-systèmes : 250+ pets, boss, donjons, échanges", en: "Large multi-system project: 250+ pets, bosses, dungeons, trading" },
      { fr: "Économie de jeu équilibrée et offres Robux", en: "Balanced in-game economy and Robux offers" },
      { fr: "Tutoriel guidé, guide intégré et analytics joueurs", en: "Guided tutorial, in-game guide and player analytics" },
      { fr: "Sauvegardes DataStore et tests automatisés en jeu", en: "DataStore saves and automated in-game tests" },
    ],
  },
  {
    id: "candy-cloud-tycoon",
    badge: "02",
    title: "CANDY CLOUD TYCOON",
    subtitle: { fr: "Tycoon / Gestion", en: "Tycoon / Management" },
    lang: "LUAU",
    description: {
      fr: "Construis ta fabrique de bonbons dans les nuages, achète des améliorations et fais grandir ton empire sucré.",
      en: "Build your candy factory in the clouds, buy upgrades and grow your sweet empire.",
    },
    tags: ["Roblox Studio", "Luau", "Rojo"],
    skills: [
      { fr: "Boucle de progression tycoon (achats, revenus, améliorations)", en: "Tycoon progression loop (purchases, income, upgrades)" },
      { fr: "Économie et équilibrage des prix", en: "Economy and price balancing" },
      { fr: "Interface et retours visuels pour le joueur", en: "UI and visual feedback for the player" },
      { fr: "Sauvegarde de la progression", en: "Progress saving" },
    ],
  },
  {
    id: "dohi",
    badge: "03",
    title: "DOHI",
    subtitle: { fr: "Jeu de bluff multijoueur", en: "Multiplayer bluffing game" },
    lang: "LUAU",
    description: {
      fr: "Jeu de bluff de 2 à 8 joueurs, en vue à la première personne, assis autour d'une table dans un bar clandestin sombre.",
      en: "First-person bluffing game for 2 to 8 players, seated around a table in a dark underground bar.",
    },
    tags: ["Roblox Studio", "Luau", "Rojo", "Lune", "Blender"],
    skills: [
      { fr: "Logique de jeu au tour par tour en multijoueur", en: "Multiplayer turn-based game logic" },
      { fr: "Caméra et animations à la première personne", en: "First-person camera and animations" },
      { fr: "Direction artistique et ambiance (lumière, décor)", en: "Art direction and atmosphere (lighting, set)" },
      { fr: "Modèles 3D faits main dans Blender", en: "Hand-made 3D models in Blender" },
    ],
  },
];

export default function RobloxPage() {
  return <SideProjPage projects={GAMES} heading="ROBLOX" />;
}
