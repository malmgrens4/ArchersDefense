new p5();
function Wall(width, height) {
    this.health = getWallHealthByRound();
    this.x = width;
    this.y = height;
    this.image = loadImage("/images/wall.png");
    this.statusBar = new StatusBar(createVector(0, 0), windowWidth, 10, this.health, getWallHealthByRound(), true);
    this.update = function () {
        if(this.health <= 0){
            gameEngine.reset();
        }
        this.statusBar.update(this.health);
    };
    this.show = function () {
        this.statusBar.show();
        image(this.image, 0, this.y, this.x, groundStart - this.y);
        //rect(0, this.y, this.x, groundStart - this.y);
        pop();
    };
    this.hit = function (damage) {
        this.health -= damage;
    };
    
}
    
function getWallHealthByRound() {
    return round * 100;
}