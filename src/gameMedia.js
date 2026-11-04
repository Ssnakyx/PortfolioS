// Contenu de la page de chaque jeu. Les fichiers viennent de scripts/showcase/build.mjs.
// N'ajoute ici que du travail original, sans pseudo ni avatar visible (build public et build Discord).

const file = (game, id, ext) => `/showcase/${game}/${id}.${ext}`;

const model = (game) => (id, fr, en = fr) => ({
  id,
  src: file(game, id, "glb"),
  thumb: file(game, id, "thumb.webp"),
  name: { fr, en },
});

const image = (game) => (id, fr, en = fr) => ({
  src: file(game, id, "webp"),
  thumb: file(game, id, "thumb.webp"),
  name: { fr, en },
});

const pfMod = model("eggs-pet-fusion");
const pfImg = image("eggs-pet-fusion");
const ccMod = model("candy-cloud-tycoon");
const ccImg = image("candy-cloud-tycoon");
const doMod = model("dohi");
const doImg = image("dohi");
const shMod = model("shhh");
const shImg = image("shhh");
const ylMod = model("ylyndore");
const ylImg = image("ylyndore");
const aeImg = image("anime-egg-simulator");

export const GAME_MEDIA = {
  "eggs-pet-fusion": {
    hero: pfImg("ranch-day", "Le ranch de jour", "The ranch by day"),
    howItPlays: [
      { fr: "Pars sur les îles et capture des pets sauvages avec tes tubes.", en: "Travel the islands and catch wild pets with your capture tubes." },
      { fr: "Fusionne tes pets dans la Fusion Chamber pour obtenir des œufs et monter leur rang.", en: "Fuse your pets in the Fusion Chamber to get eggs and raise their rank." },
      { fr: "Fais éclore les œufs et collectionne les mutations rares dans l'Index.", en: "Hatch the eggs and collect rare mutations in the Index." },
      { fr: "Nourris ton équipe au ranch, puis affronte les boss et les donjons.", en: "Feed your team at the ranch, then take on bosses and dungeons." },
      { fr: "Échange tes pets avec les autres joueurs.", en: "Trade your pets with other players." },
    ],
    photos: [
      pfImg("ranch-day", "Le ranch de jour", "The ranch by day"),
      pfImg("ranch-night", "Le ranch de nuit", "The ranch by night"),
      pfImg("pets-day", "L'équipe de pets", "The pet team"),
      pfImg("lab", "Le laboratoire et ses machines", "The lab and its machines"),
    ],
    models: [
      pfMod("AbyssAngler", "Boss : Abyss Angler", "Boss: Abyss Angler"),
      pfMod("EmberPhoenix", "Boss : Ember Phoenix", "Boss: Ember Phoenix"),
      pfMod("FrostMammoth", "Boss : Frost Mammoth", "Boss: Frost Mammoth"),
      pfMod("MechaWolf", "Boss : Mecha Wolf", "Boss: Mecha Wolf"),
      pfMod("PrismOwl", "Boss : Prism Owl", "Boss: Prism Owl"),
      pfMod("GummyBearKing", "Boss : Gummy Bear King", "Boss: Gummy Bear King"),
      pfMod("CinderPhoenix", "Pet : Cinder Phoenix", "Pet: Cinder Phoenix"),
      pfMod("AuroraWolf", "Pet : Aurora Wolf", "Pet: Aurora Wolf"),
      pfMod("StarWhale", "Pet : Star Whale", "Pet: Star Whale"),
      pfMod("CornhuskScarecrow", "Pet : Cornhusk Scarecrow", "Pet: Cornhusk Scarecrow"),
      pfMod("SphinxCat", "Pet : Sphinx Cat", "Pet: Sphinx Cat"),
      pfMod("CaramelDragon", "Pet : Caramel Dragon", "Pet: Caramel Dragon"),
      pfMod("WorldKitA", "Kit de décor des îles", "Island decor kit"),
      pfMod("ItemModels", "Objets du jeu", "Game items"),
    ],
    ui: [
      pfImg("ui-shop", "Boutique", "Shop"),
      pfImg("ui-pets", "Inventaire des pets", "Pet inventory"),
      pfImg("ui-fusion", "Fusion Chamber"),
      pfImg("ui-wheel", "Roue de la chance", "Lucky wheel"),
      pfImg("ui-hatch", "Éclosion", "Hatching"),
    ],
    art: [
      pfImg("art-pets", "Planche de pets voxel", "Voxel pet sheet"),
      pfImg("art-team", "Visuel d'offre : Big Team", "Store art: Big Team"),
      pfImg("art-crate", "Visuel d'offre : caisse", "Store art: crate"),
      pfImg("art-chest", "Coffre voxel", "Voxel chest"),
    ],
  },

  "candy-cloud-tycoon": {
    hero: ccImg("machines", "La fabrique et ses machines", "The factory and its machines"),
    howItPlays: [
      { fr: "Prends une île libre et pose tes premières machines à bonbons.", en: "Claim a free island and place your first candy machines." },
      { fr: "Tes machines produisent, le tapis livre et tes clients paient.", en: "Your machines produce, the belt delivers and your customers pay." },
      { fr: "Réinvestis pour acheter des machines plus rapides et bâtir de nouveaux étages.", en: "Reinvest in faster machines and build new floors." },
      { fr: "Remplis le Candy Book avec les recettes et les mutations que tu découvres.", en: "Fill the Candy Book with the recipes and mutations you discover." },
    ],
    photos: [
      ccImg("machines", "La fabrique et ses machines", "The factory and its machines"),
      ccImg("tower", "La tour de bonbons", "The candy tower"),
      ccImg("island", "L'île complète", "The full island"),
    ],
    models: [
      ccMod("CandyCastle", "Château de bonbons", "Candy castle"),
      ccMod("GumballMachine", "Machine à gumballs", "Gumball machine"),
      ccMod("CupcakeCarousel", "Carrousel de cupcakes", "Cupcake carousel"),
      ccMod("ChocoFountain", "Fontaine de chocolat", "Chocolate fountain"),
      ccMod("CandyBot", "Candy Bot"),
      ccMod("CakeCrane", "Grue à gâteaux", "Cake crane"),
      ccMod("GrandCake", "Grand gâteau", "Grand cake"),
      ccMod("FlavorStation", "Station de saveurs", "Flavor station"),
      ccMod("CandyPress", "Presse à bonbons", "Candy press"),
      ccMod("CloudVacuum_Lv5", "Aspirateur à nuages, niveau 5", "Cloud vacuum, level 5"),
      ccMod("StarGate", "Portail étoile", "Star gate"),
      ccMod("LollipopLamp", "Lampadaire sucette", "Lollipop lamp"),
    ],
    ui: [
      ccImg("ui-book", "Candy Book"),
      ccImg("ui-hud", "Interface en jeu", "In-game HUD"),
    ],
    art: [
      ccImg("art-candies", "Les bonbons", "The candies"),
      ccImg("art-boost", "Icône : potion de boost", "Icon: boost potion"),
      ccImg("art-cash", "Icône : argent x2", "Icon: cash x2"),
      ccImg("art-chest", "Icône : coffre d'argent", "Icon: cash chest"),
    ],
  },

  dohi: {
    hero: doImg("scene", "La table sous la lampe", "The table under the lamp"),
    howItPlays: [
      { fr: "De 2 à 8 joueurs s'assoient autour de la table, chacun avec deux cartes cachées.", en: "2 to 8 players sit around the table, each with two hidden cards." },
      { fr: "À ton tour, annonce une action : tu peux dire la vérité ou bluffer sur ta carte.", en: "On your turn, declare an action: you can tell the truth or bluff about your card." },
      { fr: "Les autres laissent passer, ou t'accusent de mentir. Celui qui a tort perd une carte.", en: "The others let it pass or call your bluff. Whoever is wrong loses a card." },
      { fr: "Le dernier joueur à garder une carte gagne la partie.", en: "The last player still holding a card wins." },
    ],
    photos: [
      doImg("scene", "La table sous la lampe", "The table under the lamp"),
      doImg("bar", "Le bar clandestin", "The underground bar"),
      doImg("seated", "Vue du joueur assis", "Seated player view"),
      doImg("cards", "Les cartes", "The cards"),
      doImg("shop", "Objets de la boutique", "Shop items"),
      doImg("coins", "Pièces et billets", "Coins and notes"),
    ],
    models: [
      doMod("Revolver", "Revolver"),
      doMod("Gramophone", "Gramophone"),
      doMod("Trophy", "Trophée", "Trophy"),
      doMod("Dagger", "Dague", "Dagger"),
      doMod("Lamp", "Lampe de table", "Table lamp"),
      doMod("SealStamp", "Cachet de cire", "Seal stamp"),
      doMod("BarStool", "Tabouret de bar", "Bar stool"),
      doMod("Table", "Table de jeu", "Game table"),
      doMod("CeilingFan", "Ventilateur de plafond", "Ceiling fan"),
      doMod("Medallions", "Médaillons", "Medallions"),
      doMod("Bank", "Banque de jetons", "Coin bank"),
      doMod("BackBar", "Arrière-bar", "Back bar"),
    ],
  },

  shhh: {
    hero: shImg("sleeper-face", "Le visage du Sleeper", "The Sleeper's face"),
    howItPlays: [
      { fr: "Entre dans la maison la nuit, trouve les objets maudits et rapporte-les au camion avant l'aube.", en: "Sneak into the house at night, find the cursed items and bring them back to the truck before dawn." },
      { fr: "Chaque pas, porte ou objet lâché fait du bruit. Marche ou accroupis-toi pour rester discret.", en: "Every step, door and dropped item makes noise. Walk or crouch to stay quiet." },
      { fr: "Le Sleeper est aveugle et n'entend que le bruit. S'il te chasse, cache-toi et retiens ton souffle.", en: "The Sleeper is blind and only hears sound. If he hunts you, hide and hold your breath." },
      { fr: "Tu as deux vies. Après la seconde, tu deviens un fantôme qui peut encore aider ton équipe.", en: "You have two lives. After the second, you become a ghost who can still help your crew." },
    ],
    models: [
      shMod("Sleeper", "Le Sleeper, le monstre aveugle", "The Sleeper, the blind monster"),
      shMod("GrandfatherClock", "Horloge comtoise", "Grandfather clock"),
      shMod("Piano", "Piano"),
      shMod("RockingHorse", "Cheval à bascule", "Rocking horse"),
      shMod("CryingDoll", "Poupée qui pleure", "Crying doll"),
      shMod("Gramophone", "Gramophone"),
      shMod("Typewriter", "Machine à écrire", "Typewriter"),
      shMod("Lawnmower", "Tondeuse", "Lawnmower"),
      shMod("Truck", "Camion de déménagement", "Moving truck"),
      shMod("Fireplace", "Cheminée", "Fireplace"),
      shMod("Pram", "Landau", "Pram"),
      shMod("Globe", "Globe terrestre", "Globe"),
      shMod("MusicBox", "Boîte à musique", "Music box"),
    ],
    ui: [
      shImg("ui-howtoplay", "Comment jouer", "How to play"),
      shImg("ui-jobsheet", "Fiche de mission", "Job sheet"),
      shImg("ui-report", "Rapport de fin de nuit", "Shift report"),
      shImg("ui-workorder", "Création de partie", "Work order"),
      shImg("ui-ready", "Barre de départ", "Ready bar"),
    ],
    art: [shImg("sleeper-lineup", "Poses et visage du Sleeper", "Sleeper poses and face")],
    videos: [
      {
        src: file("shhh", "sleeper-animations", "mp4"),
        poster: file("shhh", "Sleeper", "thumb.webp"),
        name: { fr: "Animations du Sleeper", en: "Sleeper animations" },
      },
    ],
  },

  ylyndore: {
    hero: ylImg("hamlet-wide", "Le hameau de départ", "The starting hamlet"),
    howItPlays: [
      { fr: "Choisis l'une des six vocations, chacune avec ses armes et son style de combat.", en: "Pick one of six vocations, each with its own weapons and fighting style." },
      { fr: "Explore les régions depuis le hameau, en suivant les lanternes et les quêtes.", en: "Explore the regions from the hamlet, following the lanterns and quests." },
      { fr: "Combats les créatures, descends dans les donjons et affronte leurs boss.", en: "Fight creatures, delve into dungeons and face their bosses." },
      { fr: "Gagne en puissance avec de meilleures armes à mesure que tu avances.", en: "Grow stronger with better weapons as you progress." },
    ],
    photos: [
      ylImg("hamlet-wide", "Le hameau de départ", "The starting hamlet"),
      ylImg("hamlet", "Les maisons du hameau", "The hamlet's houses"),
      ylImg("inn", "Intérieur de l'auberge", "Inside the inn"),
      ylImg("snow-village", "Le village de neige", "The snow village"),
    ],
    models: [
      ylMod("Inn_SpilledInkpot", "Auberge", "Inn"),
      ylMod("Smithy_A", "Forge", "Smithy"),
      ylMod("Watchtower_A", "Tour de guet", "Watchtower"),
      ylMod("LogCabin_A", "Chalet sous la neige", "Snowy log cabin"),
      ylMod("PortalFrame_A", "Portail", "Portal"),
      ylMod("ChestOfThirteen_A", "Coffre des Treize", "Chest of Thirteen"),
      ylMod("LanternPost_A", "Lanterne", "Lantern post"),
      ylMod("GiantTrunk_A", "Tronc géant", "Giant trunk"),
      ylMod("Weapon_Broadsword", "Épée large", "Broadsword"),
      ylMod("Weapon_BrushStaff", "Bâton-pinceau", "Brush staff"),
      ylMod("Weapon_GildedHammer", "Marteau doré", "Gilded hammer"),
      ylMod("Weapon_BrambleCrook", "Crosse de ronces", "Bramble crook"),
    ],
    art: [
      ylImg("art-snow", "Kit de la région enneigée", "Snow region kit"),
      ylImg("art-landmarks", "Lieux marquants", "Landmarks"),
      ylImg("art-weapons", "Lames et arcs", "Blades and bows"),
      ylImg("art-vfx", "Textures d'effets visuels", "VFX textures"),
    ],
  },

  "anime-egg-simulator": {
    howItPlays: [
      { fr: "Achète un œuf et pose-le sur le tapis pour le faire éclore.", en: "Buy an egg and place it on the conveyor to hatch it." },
      { fr: "Chaque rareté a ses effets d'éclosion, du commun au secret.", en: "Each rarity has its own hatching effects, from common to secret." },
      { fr: "Tes meilleures trouvailles rapportent de l'argent à chaque seconde sur ton podium.", en: "Your best finds earn money every second on your podium." },
      { fr: "Fusionne tes doubles, échange avec les autres joueurs et complète ta collection.", en: "Fuse your duplicates, trade with other players and complete your collection." },
    ],
    ui: [
      aeImg("ui-achievements", "Succès", "Achievements"),
      aeImg("ui-quests", "Quêtes", "Quests"),
      aeImg("ui-gift", "Offrir à un ami", "Gift to a friend"),
      aeImg("ui-settings", "Réglages", "Settings"),
      aeImg("ui-codes", "Codes"),
    ],
    art: [aeImg("art-icons", "Icônes du jeu", "Game icons")],
  },
};
