const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const telegramJoin = document.getElementById("telegramJoin");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const reloadBtn = document.getElementById("reloadBtn");

let bird, pipes, score, gameOver, gameStarted;
let pipeWidth = 80; // to hơn
let pipeGap = 200;  // khoảng trống lớn hơn

// Khi load trang, kiểm tra nếu đã tham gia Telegram thì bỏ qua
if (localStorage.getItem("joinedTelegram") === "true") {
  telegramJoin.style.display = "none";
  menu.style.display = "block";
}

// Khi nhấn nút Tham gia Telegram
document.querySelector("#telegramJoin a").addEventListener("click", () => {
  localStorage.setItem("joinedTelegram", "true"); // lưu trạng thái
  telegramJoin.style.display = "none";
  menu.style.display = "block";
});

startBtn.addEventListener("click", startGame);
reloadBtn.addEventListener("click", startGame);

function startGame() {
  menu.style.display = "none";
  canvas.style.display = "block";
  resetGame();
  document.addEventListener("keydown", flap);
  document.addEventListener("touchstart", flap);
  loop();
}

function resetGame() {
  bird = {
    x: 80,
    y: 150,
    width: 30,
    height: 30,
    gravity: 0.35, // rơi chậm hơn
    velocity: 0,
    jump: -6.5, // nhảy ít hơn để dễ điều khiển
    color: "yellow"
  };
  pipes = [];
  pipes.push({ x: canvas.width, height: randomPipeHeight(), passed: false });
  score = 0;
  gameOver = false;
  gameStarted = true;
  scoreDisplay.innerText = `Điểm: 0`;
  gameOverScreen.style.display = "none";
}

function randomPipeHeight() {
  return Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 50;
}

function flap() {
  if (!gameOver) {
    bird.velocity = bird.jump;
  }
}

function update() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= 2; // tốc độ chậm hơn để dễ chơi

    if (pipe.x === 200) {
      pipes.push({ x: canvas.width, height: randomPipeHeight(), passed: false });
    }

    if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
      score++;
      scoreDisplay.innerText = `Điểm: ${score}`;
      pipe.passed = true;
    }

    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeGap)
    ) {
      gameOver = true;
    }
  }

  if (bird.y + bird.height >= canvas.height || bird.y <= 0) {const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const telegramJoin = document.getElementById("telegramJoin");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const reloadBtn = document.getElementById("reloadBtn");

let bird, pipes, score, gameOver, gameStarted;
let pipeWidth = 100; // Ống to hơn
let pipeGap = 200;   // Khoảng trống lớn hơn

// Load ảnh nền
const backgroundImg = new Image();
backgroundImg.src = "background.png"; // thay đường dẫn ảnh ở đây

// Kiểm tra Telegram
if (localStorage.getItem("joinedTelegram") === "true") {
  telegramJoin.style.display = "none";
  menu.style.display = "block";
}

document.querySelector("#telegramJoin a").addEventListener("click", () => {
  localStorage.setItem("joinedTelegram", "true");
  telegramJoin.style.display = "none";
  menu.style.display = "block";
});

startBtn.addEventListener("click", startGame);
reloadBtn.addEventListener("click", startGame);

function startGame() {
  menu.style.display = "none";
  canvas.style.display = "block";
  resetGame();
  document.addEventListener("keydown", flap);
  document.addEventListener("touchstart", flap);
  document.addEventListener("click", flap); // click chuột cũng bay
  loop();
}

function resetGame() {
  bird = {
    x: 80,
    y: 150,
    width: 30,
    height: 30,
    gravity: 0.35,
    velocity: 0,
    jump: -6.5,
    color: "yellow"
  };
  pipes = [];
  pipes.push({ x: canvas.width, height: randomPipeHeight(), passed: false });
  score = 0;
  gameOver = false;
  gameStarted = true;
  scoreDisplay.innerText = `Điểm: 0`;
  gameOverScreen.style.display = "none";
}

function randomPipeHeight() {
  return Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 50;
}

function flap() {
  if (!gameOver) {
    bird.velocity = bird.jump;
  }
}

function update() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= 2;

    if (pipe.x === 200) {
      pipes.push({ x: canvas.width, height: randomPipeHeight(), passed: false });
    }

    if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
      score++;
      scoreDisplay.innerText = `Điểm: ${score}`;
      pipe.passed = true;
    }

    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeGap)
    ) {
      gameOver = true;
    }
  }

  if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
    gameOver = true;
  }
}

function draw() {
  // Vẽ nền
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // Vẽ ống
  ctx.fillStyle = "green";
  for (let pipe of pipes) {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);
    ctx.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, canvas.height);
  }

  // Vẽ chim
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function loop() {
  if (!gameOver) {
    update();
    draw();
    requestAnimationFrame(loop);
  } else {
    gameOverScreen.style.display = "block";
    canvas.style.display = "none";
  }
}
