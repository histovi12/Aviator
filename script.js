
let balance = 10000;
let multiplier = 1.00;
let crashPoint = 0;
let gameInterval;
let isGameRunning = false;

const multiplierEl = document.getElementById('multiplier');
const balanceEl = document.getElementById('balance');
const startBtn = document.getElementById('startBtn');
const cashOutBtn = document.getElementById('cashOutBtn');
const resultEl = document.getElementById('result');
const plane = document.getElementById('plane');
const playersList = document.getElementById('players');

const startSound = document.getElementById('startSound');
const crashSound = document.getElementById('crashSound');
const cashoutSound = document.getElementById('cashoutSound');

function getCrashPoint() {
  return parseFloat((Math.random() * 5 + 1).toFixed(2));
}

function fakePlayers() {
  const names = ["Aryan", "Mahi", "Raj", "Neha", "Kunal", "Zoya", "Arjun", "Tina"];
  playersList.innerHTML = "";
  names.forEach(name => {
    const li = document.createElement("li");
    const cashout = (Math.random() * 4 + 1).toFixed(2);
    li.textContent = `${name} cashed out at ${cashout}x`;
    playersList.appendChild(li);
  });
}

function startGame() {
  startSound.play();
  multiplier = 1.00;
  crashPoint = getCrashPoint();
  isGameRunning = true;
  cashOutBtn.disabled = false;
  resultEl.textContent = '';
  multiplierEl.textContent = multiplier.toFixed(2) + "x";
  plane.style.left = "10px";
  fakePlayers();

  let planePosition = 10;
  let speed = 1;

  gameInterval = setInterval(() => {
    multiplier += 0.01;
    multiplierEl.textContent = multiplier.toFixed(2) + "x";
    speed = Math.min(speed + 0.1, 10); // gradual speed increase
    planePosition += speed;
    plane.style.left = planePosition + "px";

    if (multiplier >= crashPoint) {
      endGame(false);
    }
  }, 60);
}

function cashOut() {
  if (!isGameRunning) return;
  cashoutSound.play();
  let cash = multiplier * 100;
  balance += Math.floor(cash);
  endGame(true);
}

function endGame(cashedOut) {
  clearInterval(gameInterval);
  isGameRunning = false;
  cashOutBtn.disabled = true;

  if (cashedOut) {
    resultEl.textContent = `Cashed out at ${multiplier.toFixed(2)}x`;
  } else {
    resultEl.textContent = `Crashed at ${multiplier.toFixed(2)}x - Lost`;
    crashSound.play();
  }
  balanceEl.textContent = "Balance: ₹" + balance.toLocaleString();
}

startBtn.addEventListener('click', startGame);
cashOutBtn.addEventListener('click', cashOut);
