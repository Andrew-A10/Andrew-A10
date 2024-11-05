var Score = 0;
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake
var snakeX;
var snakeY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
//food
var foodX;
var foodY;

var gameOver = false;
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on board
    spawnPlayer();
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); //100 ms
}
function Restart() {
    window.location.reload(true);
}
function update() {
    if (gameOver) {
        return;
    }
    
    //board
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    //food
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    //snake
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        Score = Score + 1;
        placeFood();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }



    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        gameOver = true;
        alert("Game Over");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
    document.getElementById("ScoreTextBox").innerHTML = "Score: " + Score;
}

//randomizing food and player spawns
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}
function spawnPlayer() {
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * cols) * blockSize;
}

//movement
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.key == "w" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key == "s" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key == "a" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key == "d" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
