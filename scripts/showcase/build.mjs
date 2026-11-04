// Génère public/showcase/ depuis les dossiers des jeux (machine de Snaky uniquement).
// Usage : RBLOX_ROOT="<dossier Rblox Game>" BLENDER="<blender.exe>" node scripts/showcase/build.mjs [jeu ...]
// Sharp réencode chaque image : les métadonnées disparaissent.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { SOURCES } from "./sources.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, "..", "..", "public", "showcase");
const ROOT = process.env.RBLOX_ROOT;
const BLENDER = process.env.BLENDER;
const MAX_MODEL_KB = 300;
const MAX_IMAGE_KB = 150;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "showcase-"));

async function webp(src, dest, { width, crop }) {
  let img = sharp(src);
  if (crop) img = img.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] });
  await img.resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
}

function checkSize(file, maxKb) {
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`${path.relative(OUT, file)} ${kb} Ko${kb > maxKb ? " TROP LOURD" : ""}`);
}

function blender(args, env = {}) {
  execFileSync(BLENDER, ["-b", ...args], { env: { ...process.env, ...env }, stdio: "ignore" });
}

// Couleurs appliquées par le code des jeux : absentes des FBX.
function elyndorColors() {
  const text = fs.readFileSync(path.join(ROOT, "Elyndor/src/shared/Data/Art/Materials.luau"), "utf8");
  const materials = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*\{\s*color\s*=\s*\{\s*(\d+),\s*(\d+),\s*(\d+)\s*\}([^\n]*)/g)) {
    materials[m[1]] = { color: [+m[2], +m[3], +m[4]], neon: m[5].includes("Neon") };
  }
  return { materials };
}

function cctColors(id) {
  const dir = path.join(ROOT, "CloudCandyTycoon/src/shared/Config");
  // ModelData porte les teintes des FBX ; les autres fichiers décrivent parfois une version en atlas.
  const files = ["ModelData.luau", ...fs.readdirSync(dir).filter((f) => f !== "ModelData.luau")];
  for (const file of files) {
    const text = fs.readFileSync(path.join(dir, file), "utf8");
    const at = text.indexOf(`\t${id} = {\n\t\tfile =`);
    if (at < 0) continue;
    const block = text.slice(at, text.indexOf("\n\t},", at));
    return {
      tints: Object.fromEntries([...block.matchAll(/name = "(\w+)".*?tint = "(#\w+)"/g)].map((m) => [m[1], m[2]])),
      baseTexture: path.join(ROOT, "CloudCandyTycoon/art/CandyTrim/CandyTrim_Color.png"),
    };
  }
  throw new Error(`Teintes introuvables : ${id}`);
}

const colorsOf = (m) => (m.colors === "elyndor" ? elyndorColors() : m.colors === "cct" ? cctColors(m.id) : {});

for (const game of process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SOURCES)) {
  const src = SOURCES[game];
  const dir = path.join(OUT, game);
  fs.mkdirSync(dir, { recursive: true });

  for (const m of src.models ?? []) {
    const glb = path.join(dir, `${m.id}.glb`);
    if (m.voxel) {
      blender(["--python", path.join(here, "voxel_to_glb.py"), "--", path.join(ROOT, m.voxel), glb]);
    } else {
      let from = m.from && path.join(ROOT, m.from);
      if (m.gen) {
        blender(["--python", path.join(ROOT, m.gen), "--", TMP, m.id, ...m.genArgs]);
        from = path.join(TMP, `${m.id}.fbx`);
      }
      blender(["--python", path.join(here, "convert_model.py"), "--", from, glb, String(m.tex ?? 512)], {
        COLORS: JSON.stringify(colorsOf(m)),
        TEXDIRS: (m.texdirs ?? src.texdirs ?? []).map((d) => path.join(ROOT, d.replace("{id}", m.id))).join(";"),
      });
    }
    checkSize(glb, MAX_MODEL_KB);
    if (m.thumb) await webp(path.join(ROOT, m.thumb), path.join(dir, `${m.id}.thumb.webp`), { width: 240, crop: m.thumbCrop });
  }

  for (const i of src.images ?? []) {
    const full = path.join(dir, `${i.id}.webp`);
    await webp(path.join(ROOT, i.from), full, { width: 1600, crop: i.crop });
    await webp(path.join(ROOT, i.from), path.join(dir, `${i.id}.thumb.webp`), { width: 400, crop: i.crop });
    checkSize(full, MAX_IMAGE_KB);
  }

  for (const v of src.videos ?? []) {
    fs.copyFileSync(path.join(ROOT, v.from), path.join(dir, `${v.id}.mp4`));
    checkSize(path.join(dir, `${v.id}.mp4`), 2048);
  }
}

fs.rmSync(TMP, { recursive: true, force: true });

// Décodeur Draco servi avec le site, pour ne dépendre d'aucun CDN.
const draco = path.join(here, "..", "..", "node_modules", "three", "examples", "jsm", "libs", "draco", "gltf");
fs.mkdirSync(path.join(OUT, "draco"), { recursive: true });
for (const f of ["draco_decoder.js", "draco_decoder.wasm", "draco_wasm_wrapper.js"]) {
  fs.copyFileSync(path.join(draco, f), path.join(OUT, "draco", f));
}
