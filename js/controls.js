import { car } from "./scene.js";
import { zones } from "./city.js";
import { playRadioSound, stopRadioSound } from "./sound.js";

let activeZone = null;
let wasInContact = false;

// Mobile state
let forward = 0;
let turn = 0;

export function initControls() {
  const keys = {};

  window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
  window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

  // Mobile joystick
  const joystick = document.getElementById("joystick");
  const stick = document.getElementById("stick");

  if (joystick) {
    let dragging = false;

    joystick.addEventListener("touchstart", () => dragging = true);
    joystick.addEventListener("touchend", () => {
      dragging = false;
      forward = 0;
      stick.style.transform = "translate(0,0)";
    });

    joystick.addEventListener("touchmove", e => {
      if (!dragging) return;
      const rect = joystick.getBoundingClientRect();
      const t = e.touches[0];
      const x = t.clientX - rect.left - 60;
      const y = t.clientY - rect.top - 60;
      forward = -y / 50;
      stick.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  document.getElementById("turn-left").ontouchstart = () => turn = 1;
  document.getElementById("turn-left").ontouchend = () => turn = 0;
  document.getElementById("turn-right").ontouchstart = () => turn = -1;
  document.getElementById("turn-right").ontouchend = () => turn = 0;

  function loop() {
    if (keys["w"]) car.translateZ(0.08);
    if (keys["s"]) car.translateZ(-0.05);
    if (keys["a"]) car.rotation.y += 0.04;
    if (keys["d"]) car.rotation.y -= 0.04;

    if (forward !== 0) car.translateZ(forward * 0.06);
    if (turn !== 0) car.rotation.y += turn * 0.04;

    detectZones();
    requestAnimationFrame(loop);
  }

  loop();
}

function detectZones() {
  activeZone = null;
  let inContact = false;

  zones.forEach(z => {
    if (car.position.distanceTo(z.position) < z.radius) {
      activeZone = z.name;
      if (z.name === "CONTACT") inContact = true;
    }
  });

  if (inContact && !wasInContact) playRadioSound();
  if (!inContact && wasInContact) stopRadioSound();

  wasInContact = inContact;
}