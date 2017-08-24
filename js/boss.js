new p5();
function Boss (speed) {
    this.health = round * 100;
    this.size = 300;
    this.delayBetweenHits = 100;
    this.damage = round;
    this.velocity = createVector(-speed, 0);
    this.position = createVector(windowWidth, groundStart - this.size);
    this.healthBar = new StatusBar(createVector(this.position.x + this.size/3, this.position.y - 50), this.size/2, 10, this.health, this.health, true);
    this.bloodParticles = [];
    this.headImage = loadImage("/images/head.png");
    this.pointValue = 10000 * (round/5);   
    
    
    this.update = function () {
        this.position.x = constrain(this.position.x, windowWidth/20, windowWidth);
        this.position.add(this.velocity);
        this.healthBar.update(this.health);
        this.healthBar.updatePosition(createVector(this.position.x + this.size/3, this.position.y - 50));
        if(this.position.x <= windowWidth/20 && (gameEngine.tickCount % this.delayBetweenHits == 0)){
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
    };
    
    this.displayBlood = function (damage, angle, position) {
        for(var i = 0; i < 10; i++){
            this.bloodParticles.push(new bloodParticle(damage, (Math.random() * TWO_PI), position));
        }
    };
    
   
}



       
    
    