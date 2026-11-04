// D'où vient chaque fichier de public/showcase/ (chemins relatifs à RBLOX_ROOT).
// Les crops [x, y, largeur, hauteur] retirent le pseudo, l'avatar et la fenêtre de Studio.
// Jamais ici : packs externes, personnages parodiques d'Anime Egg, références d'autres jeux.

const PFL = "PetFusionLab";
const CCT = "CloudCandyTycoon";
const ELY = "Elyndor";
const AES = "AnimeEggSimulator/docs/previews";
const SUIVI = `${ELY}/docs/Production/Suivi`;
const SLEEPER = "SHHH/vault/40 - Assets/Models/Sleeper";
const SHHH_UI = "SHHH/docs/captures/ui-v2";

const PFL_SHOT = [0, 95, 1350, 530];
const PFL_MENU = [250, 30, 860, 640];

const generated = (script, id, extra = []) => ({ id, gen: `${ELY}/tools/art/${script}`, genArgs: extra, colors: "elyndor" });

export const SOURCES = {
  "eggs-pet-fusion": {
    models: [
      ...["AbyssAngler", "EmberPhoenix", "FrostMammoth", "MechaWolf", "PrismOwl", "GummyBearKing"].map((id) => ({
        id,
        voxel: `${PFL}/src/shared/BossModels/${id}.luau`,
      })),
      ...["CinderPhoenix", "AuroraWolf", "StarWhale", "CornhuskScarecrow", "SphinxCat", "CaramelDragon"].map((id) => ({
        id,
        voxel: `${PFL}/src/shared/PetModels/${id}.luau`,
      })),
      { id: "WorldKitA", from: `${PFL}/models/blender/WorldKitA.fbx` },
      { id: "ItemModels", from: `${PFL}/models/blender/ItemModels.fbx` },
    ],
    images: [
      { id: "ranch-day", from: `${PFL}/docs/screenshots/v3/30-enclos-jour.jpg`, crop: PFL_SHOT },
      { id: "ranch-night", from: `${PFL}/docs/screenshots/v3/31-enclos-nuit.jpg`, crop: PFL_SHOT },
      { id: "pets-day", from: `${PFL}/docs/screenshots/v3/34-pets-de-jour.jpg`, crop: PFL_SHOT },
      { id: "lab", from: `${PFL}/docs/screenshots/v3/05_labo_arche_donjons.jpg`, crop: [0, 46, 675, 295] },
      { id: "ui-shop", from: `${PFL}/docs/screenshots/ui-sim99/03-shop-pc.jpg`, crop: PFL_MENU },
      { id: "ui-pets", from: `${PFL}/docs/screenshots/ui-sim99/04-pets-pc.jpg`, crop: PFL_MENU },
      { id: "ui-fusion", from: `${PFL}/docs/screenshots/ui-sim99/05-fusion-pc.jpg`, crop: PFL_MENU },
      { id: "ui-wheel", from: `${PFL}/docs/screenshots/ui-sim99/07-wheel-pc.jpg`, crop: PFL_MENU },
      { id: "ui-hatch", from: `${PFL}/docs/screenshots/ui-sim99/08-hatch-pc.jpg`, crop: PFL_MENU },
      { id: "art-pets", from: `${PFL}/models/pets/previews/sheet_Prairie.png` },
      { id: "art-team", from: `${PFL}/models/store/out/BigTeam.png` },
      { id: "art-crate", from: `${PFL}/models/store/out/CatalystCrate.png` },
      { id: "art-chest", from: `${PFL}/models/chests/previews/ChestDiamond.png` },
    ],
  },

  "candy-cloud-tycoon": {
    models: [
      ["CandyCastle", "Deco"],
      ["GumballMachine", "Floors"],
      ["CupcakeCarousel", "Floors"],
      ["ChocoFountain", "Floors"],
      ["CandyBot", "Floors"],
      ["CakeCrane", "Floors"],
      ["GrandCake", "Floors"],
      ["FlavorStation", "FlavorStation"],
      ["CandyPress", "Press"],
      ["CloudVacuum_Lv5", "Vacuum"],
      ["StarGate", "Map"],
      ["LollipopLamp", "Map"],
    ].map(([id, dir]) => ({ id, from: `${CCT}/art/models/${dir}/${id}.fbx`, colors: "cct", texdirs: [`${CCT}/art/CandyTrim`, `${CCT}/art/Atlas`] })),
    images: [
      { id: "machines", from: `${CCT}/docs/voxel/jeu_4_machines.jpg` },
      { id: "tower", from: `${CCT}/docs/voxel/planche.jpg` },
      { id: "island", from: `${CCT}/docs/art/art5_ile_complete.jpg` },
      { id: "ui-book", from: `${CCT}/ui/shots/ui2_book_pc_mid.png`, crop: [320, 128, 1280, 862] },
      { id: "ui-hud", from: `${CCT}/ui/shots/hud_pc_mid.png` },
      { id: "art-boost", from: `${CCT}/ui/shop5/out/art_boost.png` },
      { id: "art-cash", from: `${CCT}/ui/shop5/out/art_cash2x.png` },
      { id: "art-chest", from: `${CCT}/ui/shop5/out/art_cash_chest.png` },
      { id: "art-candies", from: `${CCT}/docs/art/art4_bonbons_5x5.jpg` },
    ],
  },

  dohi: {
    texdirs: ["Dohi/assets/textures"],
    models: ["Revolver", "Gramophone", "Trophy", "Dagger", "Lamp", "SealStamp", "BarStool", "Table", "CeilingFan", "Medallions", "Bank", "BackBar"].map((id) => ({
      id,
      from: `Dohi/assets/models/${id}.fbx`,
      thumb: `Dohi/assets/previews/${id}.jpg`,
    })),
    images: [
      ["scene", "Scene_overview"],
      ["bar", "Bar_overview"],
      ["seated", "Bar_seated"],
      ["cards", "Cards_en"],
      ["shop", "Shop_overview"],
      ["coins", "Coins"],
    ].map(([id, f]) => ({ id, from: `Dohi/assets/previews/${f}.jpg` })),
  },

  shhh: {
    texdirs: ["SHHH-models/{id}.fbm"],
    models: [
      { id: "Sleeper", from: `${SLEEPER}/Sleeper.glb`, thumb: `${SLEEPER}/Sleeper_v3_lineup.png`, thumbCrop: [3880, 120, 440, 420] },
      ...["GrandfatherClock", "Piano", "RockingHorse", "CryingDoll", "Gramophone", "Typewriter", "Lawnmower", "Truck", "Fireplace", "Pram", "Globe", "MusicBox"].map((id) => ({
        id,
        from: `SHHH-models/${id}.fbx`,
        thumb: `SHHH/assets/models/previews/${id}.jpg`,
      })),
    ],
    images: [
      { id: "sleeper-lineup", from: `${SLEEPER}/Sleeper_v3_lineup.png` },
      { id: "sleeper-face", from: `${SLEEPER}/Sleeper_v3_lineup.png`, crop: [2880, 100, 1440, 540] },
      { id: "ui-howtoplay", from: `${SHHH_UI}/after-howtoplay.jpg`, crop: [636, 208, 648, 588] },
      { id: "ui-jobsheet", from: `${SHHH_UI}/after-sheet.jpg`, crop: [1082, 136, 532, 560] },
      { id: "ui-report", from: `${SHHH_UI}/after-end.jpg`, crop: [420, 176, 730, 570] },
      { id: "ui-workorder", from: `${SHHH_UI}/after-lobby.jpg`, crop: [1496, 296, 382, 410] },
      { id: "ui-ready", from: `${SHHH_UI}/after-ready.jpg`, crop: [626, 832, 668, 84] },
    ],
    videos: [{ id: "sleeper-animations", from: "SHHH/vault/40 - Assets/Animations/Videos/Sleeper_animations.mp4" }],
  },

  ylyndore: {
    models: [
      generated("margins/buildings.py", "Inn_SpilledInkpot"),
      generated("margins/buildings.py", "Smithy_A"),
      generated("margins/buildings.py", "Watchtower_A"),
      generated("margins/landmarks.py", "PortalFrame_A"),
      generated("margins/landmarks.py", "ChestOfThirteen_A"),
      generated("margins/lights.py", "LanternPost_A"),
      generated("margins/trees.py", "GiantTrunk_A"),
      generated("frontier/snow.py", "LogCabin_A", ["--no-render"]),
      generated("weapons/weapons.py", "Weapon_Broadsword"),
      generated("weapons/weapons.py", "Weapon_BrushStaff"),
      generated("weapons/weapons.py", "Weapon_GildedHammer"),
      generated("weapons/weapons.py", "Weapon_BrambleCrook"),
    ],
    images: [
      { id: "hamlet-wide", from: `${SUIVI}/V1 jouable/finition-vue-hameau.jpg` },
      { id: "hamlet", from: `${SUIVI}/V1 jouable/hameau.jpg` },
      { id: "inn", from: `${SUIVI}/V1 jouable/finition-auberge.jpg` },
      { id: "snow-village", from: `${SUIVI}/Grande carte/Modèles/studio-village-neige.jpg` },
      { id: "art-snow", from: `${SUIVI}/Grande carte/Modèles/planche-snow.jpg` },
      { id: "art-landmarks", from: `${SUIVI}/Grande carte/Modèles/planche-landmarks.jpg` },
      { id: "art-weapons", from: `${SUIVI}/Premier royaume/Armes/planche-lames-et-arcs.jpg` },
      { id: "art-vfx", from: `${ELY}/docs/Art/Effets - planche des textures.png` },
    ],
  },

  "anime-egg-simulator": {
    images: [
      { id: "ui-achievements", from: `${AES}/depth/achievements-pc.jpg`, crop: [370, 180, 540, 370] },
      { id: "ui-quests", from: `${AES}/depth/quests-weekly-pc.jpg`, crop: [370, 180, 540, 370] },
      { id: "ui-settings", from: `${AES}/bilan/settings-pc.jpg`, crop: [450, 195, 380, 340] },
      { id: "ui-gift", from: `${AES}/boutique/gift-pc.jpg`, crop: [310, 125, 810, 470] },
      { id: "ui-codes", from: `${AES}/quetes/codes-pc.jpg`, crop: [440, 230, 400, 270] },
      { id: "art-icons", from: "AnimeEggSimulator/tools/icons/sheet.png" },
    ],
  },
};
