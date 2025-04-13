let multiplier = 1.00;
let crashPoint = 0;
let gameInterval;
let isGameRunning = false;

const multiplierEl = document.getElementById('multiplier');
const startBtn = document.getElementById('startBtn');
const cashOutBtn = document.getElementById('cashOutBtn');
const resultEl = document.getElementById('result');
const plane = document.getElementById('plane');

function getCrashPoint() {
  return parseFloat((Math.random() * 10 + 1).toFixed(2)); // 1.00x to 11.00x
}

function startGame() {
  multiplier = 1.00;
  crashPoint = getCrashPoint();
  isGameRunning = true;
  cashOutBtn.disabled = false;
  resultEl.textContent = '';
  multiplierEl.textContent = multiplier.toFixed(2) + "x";
  plane.style.left = "0px";

  let planePosition = 0;

  gameInterval = setInterval(() => {
    multiplier += 0.01;
    multiplierEl.textContent = multiplier.toFixed(2) + "x";
    planePosition += 2;
    plane.style.left = planePosition + "px";

    if (multiplier >= crashPoint) {
      endGame(false);
    }
  }, 50);
}

function cashOut() {
  if (!isGameRunning) return;
  endGame(true);
}

function endGame(cashedOut) {
  clearInterval(gameInterval);
  isGameRunning = false;
  cashOutBtn.disabled = true;

  if (cashedOut) {
    resultEl.textContent = `You cashed out at ${multiplier.toFixed(2)}x`;
  } else {
    resultEl.textContent = `Crashed at ${multiplier.toFixed(2)}x - You lost!`;
  }
}

startBtn.addEventListener('click', startGame);
cashOutBtn.addEventListener('click', cashOut);
