// Version "Discord" : build avec VITE_DISCORD=true pour masquer nom, email et LinkedIn.
// La valeur est remplacée à la compilation, donc les vraies infos ne sont pas
// incluses dans le bundle de la version Discord.
export const IS_DISCORD = import.meta.env.VITE_DISCORD === "true";
