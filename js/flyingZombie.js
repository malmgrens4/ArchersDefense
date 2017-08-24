new p5();
function FlyingZombie (speed) {
    this.health = round * 3;
    this.size = 80;
    this.delayBetweenHits = 40;
    this.damage = round * .5;
    this.velocity = createVector(-speed, speed);
    this.position = createVector(windowWidth, windowHeight/2 - this.size * 2);
    this.healthBar = new StatusBar(createVector(this.position.x, this.position.y - (this.size + this.size/2)),  this.size, 5, this.health, this.health);
    this.bloodParticles = [];
    this.headImage = loadImage("/images/flying_zombie.png");
    this.pointValue = 100;
   
    
    this.update = function () {
        this.position.x = constrain(this.position.x, windowWidth/20, windowWidth);
        this.position.y = constrain(this.position.y, 0 + this.size, groundStart - this.size * 2);
        this.velocity.y = noise(this.position.y) * speed;
        if(Math.random() < .5){
            this.velocity.y *= -1;
        }
        this.position.add(this.velocity);
        this.healthBar.update(this.health);
        this.healthBar.updatePosition(createVector(this.position.x, this.position.y - (this.size + this.size/2)));
        if(this.position.x <= windowWidth/20 && (gameEngine.tickCount % this.delayBetweenHits == 0)){
            this.velocity.y = 0;
            gameEngine.damageWall(this.damage);
        }
        
        for(var i = 0; i <  this.bloodParticles.length; i++){
            this.bloodParticles[i].update();
            if(this.bloodParticles[i].lifespan<=0){
                this.bloodParticles.splice(i, 1);
            }
        }
    };
    
    this.show = function () {
        
        push();
        fill(65, 146, 75);
        image(this.headImage, this.position.x, this.position.y, this.size, this.size);
        pop();
        
        
        this.healthBar.show();
        
        for(var i = 0; i <  this.bloodParticles.length; i++){
            this.bloodParticles[i].show();
        }
    };
    
    this.hit = function (damage, angle, position, knockback) {
        this.health -= damage;
        this.displayBlood(damage, angle, position);
        this.position.x += knockback;
        this.velocity.x *= .99;
    };
    
    this.displayBlood = function (damage, angle, position) {
        for(var i = 0; i < 10; i++){
            this.bloodParticles.push(new bloodParticle(damage, (Math.random() * TWO_PI), position));
        }
    };
    
   
}
