let ambience;
let radio;

export function initSound() {
  ambience = new Audio("./sounds/city-ambience.mp3");
  ambience.loop = true;
  ambience.volume = 0.3;

  radio = new Audio("./sounds/radio-hum.mp3");
  radio.loop = true;
  radio.volume = 0.4;
}

export function playCitySound() {
  if (!ambience) return;
  ambience.play().catch(() => {});
}

export function playRadioSound() {
  if (!radio) return;
  radio.play().catch(() => {});
}

export function stopRadioSound() {
  if (!radio) return;
  radio.pause();
  radio.currentTime = 0;
}