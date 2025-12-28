import { initScene, animate } from "./scene.js";
import { initControls } from "./controls.js";
import { initUI } from "./ui.js";
import { createCity } from "./city.js";
import { createBillboards } from "./billboards.js";
import { initSound } from "./sound.js";

initScene();
createCity();
createBillboards();
initSound();
initControls();
initUI();   // 👈 THIS MUST EXIST
animate();