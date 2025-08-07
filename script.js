const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const gameOverScreen = document.getElementById("gameOverScreen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");

let bird, pipes, score, gameStarted, gameOver;

function resetGame() {
  bird = {
    x: 80,
    y: 150,
    width: 30,
    height: 30,
    gravity: 0.6,
    velocity: 0,
    jump: -10,
    color: "yellow",
  };
  pipes = [];
  pipes.push({ x: canvas.width, height: randomPipeHeight(), passed: false });
  score = 0;
  gameOver = false;
  gameStarted = true;
  scoreDisplay.innerText = `Điểm: 0`;
  gameOverScreen.style.display = "none";
  document.getElementById("progressBar").style.width = "0%";
}

function randomPipeHeight() {
  return Math.floor(Math.random() * (canvas.height - 200)) + 50;
}

function drawBird() {
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, 60, pipe.height);
  ctx.fillRect(pipe.x, pipe.height + 150, 60, canvas.height);
}

function flap() {
  if (!gameStarted || gameOver) return;
  bird.velocity = bird.jump;
}

function update() {
  if (!gameStarted || gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
    gameOver = true;
    gameOverScreen.style.display = "block";
  }

  for (let pipe of pipes) {
    pipe.x -= 2;
    drawPipe(pipe);

    // Va chạm
    if (
      bird.x < pipe.x + 60 &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.height || bird.y + bird.height > pipe.height + 150)
    ) {
      gameOver = true;
      gameOverScreen.style.display = "block";
    }

    // Tính điểm khi chim vượt qua ống
    if (!pipe.passed && pipe.x + 60 < bird.x) {
      score++;
      pipe.passed = true;
      scoreDisplay.innerText = `Điểm: ${score}`;
      const progress = Math.min(score * 5, 100);
      document.getElementById("progressBar").style.width = progress + "%";
    }
  }

  if (pipes[pipes.length - 1].x < 200) {
    pipes.push({ x: canvas.width, height: randomPipeHeight(), passed: false });
  }

  drawBird();
  requestAnimationFrame(update);
}

function openGameMenu() {
  document.getElementById("telegramJoin").style.display = "none";
  menu.style.display = "block";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") flap();
});
document.addEventListener("mousedown", flap);

startBtn.addEventListener("click", () => {
  menu.style.display = "none";
  resetGame();
  update();
});

restartBtn.addEventListener("click", () => {
  resetGame();
  update();
});
