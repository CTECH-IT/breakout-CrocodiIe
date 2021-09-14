let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

let ballRadius = 15;

let paddleHeight = 10;
let paddleWidth= 75;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#9775DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //drawing the ball
    drawBall();

    //change the x and y os for the ball
    x += dx;
    y += dy;

    //check to see if we've gone off the edge
    if (x > canvas.width - ballRadius || x + dx <ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) { //ceiling chec
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {//floor chec
        if(x > paddleX && x < paddleX + paddleWidth) { //paddlehit
            dy = -dy;
        } else { // it hits the floor!!1!
            alert("GAME OVER LMAO LOSER");
            document.location.reload();
            clearInterval(interval); //needed 4 browser to end game
        }    
    }

    //paddle controls
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    drawPaddle();

}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);