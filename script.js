const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const h2 = document.getElementById("score");
const blockSize = 25;
const rows = 20;
const cols = 20;

// Snake
let snake = {x: blockSize * 9, y: blockSize * 9};
let velocityX = 0;
let velocityY = 0;

// Snake tail
let snakeTail = [];

// Food
let foodX;
let foodY;

// Score
let points = 0;

// Game Over
let gameEnd = false;

window.onload = () => {
    canvas.width = rows * blockSize;
    canvas.height = cols * blockSize;
    h2.innerText = `points: ${points}`;
    
    randomLocation();
    setInterval(gameLoop,1000 /5);
};

function gameLoop() {

    if(snake.x < 0 || snake.x > canvas.width || snake.y < 0 || snake.y > canvas.height) {
        gameEnd = true;
    };

    for(let i = 0; i < snakeTail.length-1; i++ ) {
        if(snakeTail[i][0] == snake.x && snakeTail[i][1] == snake.y) {
            gameOver();
            console.log("snakeTail!!!!!")
        }
    }

    if(gameEnd == true){
        gameOver();
        gameEnd = false;
    };

    if(snake.x == foodX && snake.y == foodY) {
        points++
        grow();
        score();
        randomLocation();
    };

    //clear screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // food
    ctx.fillStyle = "green";
    ctx.fillRect(foodX,foodY,blockSize,blockSize);
    for(let i = 0; i < snakeTail.length; i++) {
        ctx.fillRect(snakeTail[i][0], snakeTail[i][1], blockSize,blockSize);
    };
    for(let i = snakeTail.length-1; i > 0; i--) {
        //  i = end of the length of tail, if tail is greter than 0;
        snakeTail[i] = snakeTail[i-1];
        // replace index of each with previous index of each while advancing
    };
    if(snakeTail.length) {
        // replace the first index of tail with head of snake
        snakeTail[0] = [snake.x,snake.y]
    };

    //snake head
    ctx.fillStyle = "red";
    ctx.fillRect(snake.x, snake.y,blockSize,blockSize);
    snake.x += velocityX * blockSize;
    snake.y += velocityY * blockSize;

    addEventListener("keyup",movement);
};

function randomLocation() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
};
function grow() {
    snakeTail.push([foodX,foodY]);
    console.log(snakeTail)
};

function score() {
    h2.innerText = `points: ${points}`;
};

function gameOver() {
    points = 0;
    score();
    snakeTail = []
    snake.x = blockSize * 9;
    snake.y = blockSize * 9;
};

function movement(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1
    } else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.code == "ArrowRight"&& velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    };
};



