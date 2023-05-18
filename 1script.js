// 게임 초기화
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
document.title = "간단한 게임";

// 색깔 정의
var white = "#ffffff";
var black = "#000000";
var red = "#ff0000";

// 블록 클래스 정의
class Block {
    constructor(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }

    update() {
        var pos = getMousePos(canvas, event);
        this.x = pos.x;
        this.y = pos.y;
    }
}

// 장애물 클래스 정의
class Obstacle {
    constructor(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.x = Math.random() * (width - this.width);
        this.y = Math.random() * -height;
    }

    update() {
        this.y += 5;
        if (this.y > height) {
            this.x = Math.random() * (width - this.width);
            this.y = Math.random() * -height;
        }
    }
}

// 스프라이트 그룹 생성
var allSprites = [];
var obstacles = [];

// 블록 생성
var block = new Block(red, 50, 50);
allSprites.push(block);

// 장애물 생성
for (var i = 0; i < 10; i++) {
    var obstacle = new Obstacle(black, 50, 50);
    allSprites.push(obstacle);
    obstacles.push(obstacle);
}

// 이벤트 처리
function handleMouseMove(event) {
    block.update();
}

function handleMouseClick(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    if (mouseX >= block.x && mouseX <= block.x + block.width &&
        mouseY >= block.y && mouseY <= block.y + block.height) {
        alert("충돌!");
    }
}

// 마우스 위치 반환
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// 게임 루프
function gameLoop() {
    // 그리기
    context.fillStyle = white;
    context.fillRect(0, 0, width, height);

    // 스프라이트 그리기
    allSprites.forEach(function(sprite) {
        context.fillStyle = sprite.color;
        context.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
    });

    // 충돌 검사
    var collision = obstacles.some(function(obstacle) {
        return (
            block.x < obstacle.x + obstacle.width &&
            block.x + block.width > obstacle.x &&
            block.y < obstacle.y + obstacle.height &&
            block.y + block.height > obstacle.y
        );
    });
    if (collision) {
        alert("충돌!");
    }

// 게임 루프 재귀 호출
requestAnimationFrame(gameLoop);
}

// 이벤트 리스너 등록
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("click", handleMouseClick);

// 게임 루프 시작
gameLoop();