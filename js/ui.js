import { pauseScene, resumeScene } from "./scene.js";
import { playCitySound } from "./sound.js";

export function initUI() {

  const intro = document.getElementById("intro");
  const enterBtn = document.getElementById("enter");
  const skipBtn = document.getElementById("skip-3d");
  const classicView = document.getElementById("classic-view");
  const backBtn = document.getElementById("back-to-3d");
  const closeBtn = document.getElementById("close");

  // ENTER CITY
  if (enterBtn && intro) {
    enterBtn.addEventListener("click", () => {
      intro.style.display = "none";
      resumeScene();
      playCitySound();
      document.body.focus();
    });
  }

  // CLASSIC VIEW
  if (skipBtn && intro && classicView) {
    skipBtn.addEventListener("click", () => {
      intro.style.display = "none";
      classicView.classList.remove("hidden");
      pauseScene();
    });
  }

  // BACK TO 3D
  if (backBtn && classicView) {
    backBtn.addEventListener("click", () => {
      classicView.classList.add("hidden");
      resumeScene();
      document.body.focus();
    });
  }

  // CLOSE SECTION
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("section").classList.add("hidden");
      resumeScene();
    });
  }
}