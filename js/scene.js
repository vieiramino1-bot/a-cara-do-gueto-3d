import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export let scene, camera, renderer, car;

let paused = false;

export function pauseScene() {
  paused = true;
}

export function resumeScene() {
  paused = false;
}

export function initScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05050a, 12, 80);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("webgl"),
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 🌙 Night ambient
  scene.add(new THREE.AmbientLight(0x222244, 0.4));

  // ☀️ Soft moon light
  const moon = new THREE.DirectionalLight(0xffffff, 0.4);
  moon.position.set(10, 20, 10);
  scene.add(moon);

  // 🛣️ Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      roughness: 0.4,
      metalness: 0.2
    })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // 🚗 Car
  car = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.5, 2),
    new THREE.MeshStandardMaterial({
      color: 0x1eff00,
      emissive: 0x003300
    })
  );
  car.position.y = 0.25;
  scene.add(car);

  camera.position.set(0, 3, -6);
}

export function animate() {
  requestAnimationFrame(animate);

  if (!paused) {
    const offset = new THREE.Vector3(0, 3, -6).applyMatrix4(car.matrixWorld);

    // 🔧 CAMERA OPTIMIZATION NEAR CONTACT
    const distToContact = car.position.distanceTo(
      new THREE.Vector3(0, 0, 18)
    );

    if (distToContact < 6) {
      camera.position.copy(offset); // snap (fast)
    } else {
      camera.position.lerp(offset, 0.08);
    }

    camera.lookAt(car.position);
  }

  renderer.render(scene, camera);
}