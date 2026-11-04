import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function disposeModel(root) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.geometry.dispose();
    for (const m of [o.material].flat()) {
      for (const value of Object.values(m)) if (value?.isTexture) value.dispose();
      m.dispose();
    }
  });
}

// Chargé à la demande depuis Showcase : three.js reste hors du bundle principal.
export default function ModelViewer({ url, onStatus }) {
  const hostRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      onStatus("error");
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 0.55;
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(3, 5, 4);
    scene.add(sun);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    // Dans une page qui défile : pas de zoom à la molette, et le doigt vertical fait défiler la page.
    controls.enableZoom = false;
    renderer.domElement.style.touchAction = "pan-y";
    controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotateSpeed = 1.6;

    const draco = new DRACOLoader().setDecoderPath("/showcase/draco/");
    stageRef.current = { scene, camera, controls, loader: new GLTFLoader().setDRACOLoader(draco), model: null };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      controls.dispose();
      if (stageRef.current.model) disposeModel(stageRef.current.model);
      stageRef.current = null;
      draco.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onStatus]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    let cancelled = false;
    onStatus("loading");
    stage.loader.load(
      url,
      (gltf) => {
        if (cancelled) {
          disposeModel(gltf.scene);
          return;
        }
        if (stage.model) {
          stage.scene.remove(stage.model);
          disposeModel(stage.model);
        }
        stage.model = gltf.scene;
        stage.scene.add(gltf.scene);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const radius = box.getSize(new THREE.Vector3()).length() / 2 || 1;
        const fit = radius / Math.sin(THREE.MathUtils.degToRad(stage.camera.fov / 2)) / Math.min(1, stage.camera.aspect);
        stage.camera.near = radius / 100;
        stage.camera.far = radius * 100;
        stage.camera.position.copy(center).add(new THREE.Vector3(0.75, 0.42, 1).normalize().multiplyScalar(fit * 1.05));
        stage.camera.updateProjectionMatrix();
        stage.controls.target.copy(center);
        onStatus("ready");
      },
      undefined,
      () => {
        if (!cancelled) onStatus("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [url, onStatus]);

  return <div className="sc-canvas" ref={hostRef} />;
}
