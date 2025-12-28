import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "./scene.js";

export const zones = [];

export function createCity() {

  function building(w, h, d, x, z, color) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({
        color,
        emissive: 0x111122
      })
    );
    mesh.position.set(x, h / 2, z);
    scene.add(mesh);
    return mesh;
  }

  // 🏠 STUDIO
  building(6, 4, 6, -12, 0, 0x1a1a1a);
  zones.push({
    name: "STUDIO",
    position: new THREE.Vector3(-12, 0, 0),
    radius: 4
  });

  // 🖼️ GALLERY
  building(10, 5, 8, 0, -14, 0x151515);
  zones.push({
    name: "GALLERY",
    position: new THREE.Vector3(0, 0, -14),
    radius: 5
  });

  // 🌴 LOUNGE
  building(6, 3, 6, 14, 0, 0x202020);
  zones.push({
    name: "LOUNGE",
    position: new THREE.Vector3(14, 0, 0),
    radius: 4
  });

  // 📡 CONTACT — OPTIMIZED RADIO TOWER (NO LAG)
  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 14, 1.5),
    new THREE.MeshStandardMaterial({
      color: 0x1eff00,
      emissive: 0x1eff00,
      emissiveIntensity: 0.6
    })
  );
  tower.position.set(0, 7, 18);
  scene.add(tower);

  zones.push({
    name: "CONTACT",
    position: new THREE.Vector3(0, 0, 18),
    radius: 4
  });
}