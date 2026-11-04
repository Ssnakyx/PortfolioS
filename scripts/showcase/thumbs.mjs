// Crée la vignette des GLB qui n'en ont pas, en les rendant avec three.js dans Chrome.
// Usage : node scripts/showcase/thumbs.mjs   (CHROME = chemin de Chrome si différent)
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..", "..");
const showcase = path.join(root, "public", "showcase");
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const TYPES = { ".js": "text/javascript", ".wasm": "application/wasm", ".glb": "model/gltf-binary" };

const PAGE = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#16206f}</style>
<script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js","three/addons/":"/node_modules/three/examples/jsm/"}}</script>
<script type="module">
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(480, 380);
renderer.toneMapping = THREE.NeutralToneMapping;
document.body.append(renderer.domElement);
const env = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath("/public/showcase/draco/"));
window.draw = async (url) => {
  const gltf = await loader.loadAsync(url);
  const scene = new THREE.Scene();
  scene.environment = env;
  scene.environmentIntensity = 0.55;
  const sun = new THREE.DirectionalLight(0xffffff, 1.4);
  sun.position.set(3, 5, 4);
  scene.add(sun);
  scene.add(gltf.scene);
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());
  const radius = box.getSize(new THREE.Vector3()).length() / 2 || 1;
  const camera = new THREE.PerspectiveCamera(35, 480 / 380, radius / 100, radius * 100);
  camera.position.copy(center).add(new THREE.Vector3(0.75, 0.42, 1).normalize().multiplyScalar(radius / Math.sin(THREE.MathUtils.degToRad(17.5))));
  camera.lookAt(center);
  renderer.render(scene, camera);
  await new Promise((r) => requestAnimationFrame(r));
  renderer.render(scene, camera);
};
window.READY = true;
</script>`;

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    return res.end(PAGE);
  }
  const file = path.join(root, url);
  if (!fs.existsSync(file)) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(5199);

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox", "--disable-gpu-sandbox", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 480, height: 380 } });
page.on("pageerror", (e) => console.log("[erreur]", e.message));
await page.goto("http://localhost:5199/");
await page.waitForFunction("window.READY === true");

for (const game of fs.readdirSync(showcase)) {
  const dir = path.join(showcase, game);
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".glb"))) {
    const thumb = path.join(dir, f.replace(".glb", ".thumb.webp"));
    if (fs.existsSync(thumb)) continue;
    await page.evaluate((url) => window.draw(url), `/public/showcase/${game}/${f}`);
    await sharp(await page.screenshot()).resize({ width: 240 }).webp({ quality: 78 }).toFile(thumb);
    console.log(`${game}/${path.basename(thumb)}`);
  }
}

await browser.close();
server.close();
