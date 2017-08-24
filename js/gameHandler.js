var round = 1;
var windowWidth = 1920;
var windowHeight = 700;
var gravity = .098;
var gamePaused = false;
var gameEngine = new GameEngine();
var groundStart = 600;
var wallWidth = (windowWidth/20);
var groundImage= loadImage("/images/ground.png");
var backgroundImage = loadImage("/images/background.png");
var scoreFont = loadFont('/font/ZillaSlabHighlight-Bold.ttf');
var weaponFont = loadFont('/font/SourceCodePro-Regular.ttf');



function preLoad() {
    
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    gameEngine.rain();
    console.log(wallWidth);
    textStyle(weaponFont, 12);
}

function draw() {
    ellipse(20, 20, 20, 20);
    if (!gamePaused) {
        background(119,136,153);
        drawGround();
        gameEngine.update();
        gameEngine.show();
        if(mouseIsPressed) {
            gameEngine.onMouseHold();
        }
    }
}

function drawGround(){
        push();
        image(backgroundImage, 0, 0, windowWidth, windowHeight);
        image(groundImage, 0, groundStart, windowWidth, windowHeight);
        pop();
}

function mousePressed(){
    
}

function mouseReleased(){
    gameEngine.onMouseRelease();
    return false;
}

function keyPressed(){
    gameEngine.onKeyPress(keyCode);
    if(keyCode === 80){
        gamePause=!gamePaused;
    }
    
}



