let c = document.getElementById("canvas");

c.height = 320;
c.width = 480;

// c.height = window.innerHeight;
// c.width = window.innerWidth;

// function handleWindowResize() {
//   c.height = window.innerHeight;
//   c.width = window.innerWidth;
// }

// window.onresize = handleWindowResize;

let ctx = c.getContext("2d");

let ballRadius = 10;
let x = c.width/2;
let y = c.height - 30;
let dx = 2;
let dy = 3;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (c.width - paddleWidth) / 2;

let leftPressed = false;
let rightPressed = false;

let color = "#96ccad";

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;
let lives = 3;

let bricks = [];
for(let col = 0; col < brickColumnCount; col++) {
  bricks[col] = [];
  for(let row = 0; row < brickRowCount; row++) {
    bricks[col][row] = { x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
  else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
  else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

function collisionDetection() {
  for(let col = 0; col < brickColumnCount; col++) {
    for(let row = 0; row < brickRowCount; row++) {
      let b = bricks[col][row];
      if(b.status == 1) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;

          if(score == brickColumnCount * brickRowCount) {
            alert("You win!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+ lives, canvas.width-65, 20);
}

function drawBricks() {
  for(let col = 0; col < brickColumnCount; col++) {
    for(let row = 0; row < brickRowCount; row++) {
      if(bricks[col][row].status == 1) {
        let brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#20647b";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, c.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#d1eab6";
  ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();

  collisionDetection();

  if(x + dx < ballRadius || x + dx > c.width - ballRadius) dx = -dx;
  if(y + dy < ballRadius) {
    dy = -dy;
  } else
  if (y + dy >= c.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if(!lives) {
        alert("Game Over");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth) / 2;
      }
    }
  }

  if(rightPressed) {
    paddleX += 7;
    if(paddleX + paddleWidth > c.width) paddleX = c.width - paddleWidth;
  } else 
  if(leftPressed) {
    paddleX -= 7;
    if(paddleX < 0) paddleX = 0;
  }

  x += dx;
  y += dy;
}

draw();