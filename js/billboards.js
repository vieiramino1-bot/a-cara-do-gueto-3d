import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "./scene.js";
import { zones } from "./city.js";

const loader = new THREE.TextureLoader();

export function createBillboards() {

    const billboardTexture = loader.load("assets/textures/billboard-partners.jpg");
    billboardTexture.colorSpace = THREE.SRGBColorSpace;
    
    const billboardMat = new THREE.MeshStandardMaterial({
      map: billboardTexture,
      emissive: new THREE.Color(0x1eff00),
      emissiveIntensity: 0.15
    });

    const muralTexture = loader.load("assets/textures/mural-culture.jpg");
    muralTexture.colorSpace = THREE.SRGBColorSpace;
    
    const muralMat = new THREE.MeshStandardMaterial({
      map: muralTexture,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.05
    });

  // 📢 BILLBOARD 1 — PARTNERS
  const billboard1 = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 4),
    billboardMat
  );
  billboard1.position.set(-20, 3, -20);
  billboard1.rotation.y = Math.PI / 4;
  scene.add(billboard1);

  zones.push({
    name: "BILLBOARD_PARTNERS",
    position: new THREE.Vector3(-20, 0, -20),
    radius: 5
  });

  // 🎨 MURAL 1 — CULTURE QUOTE
  const mural1 = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    muralMat
  );
  mural1.position.set(-25, 3, -10);
  mural1.rotation.y = Math.PI / 2;
  scene.add(mural1);

  zones.push({
    name: "MURAL_CULTURE",
    position: new THREE.Vector3(-25, 0, -10),
    radius: 4
  });
}