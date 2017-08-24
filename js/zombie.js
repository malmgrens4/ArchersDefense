new p5();
function Zombie (initialVelocity = createVector(-1, 0), 
                  health = round * 5, 
                  zombieImage = loadImage("/images/head.png"), 
                  position = createVector(windowWidth, groundStart - 80), 
                  damage = round * .6, 
                  size = 80, pointValue = 100) {
    this.health = health;
    this.size = size;
    this.delayBetweenHits = 40;
    this.damage = damage;
    this.velocity = initialVelocity.copy();
    this.position = position.copy();
    this.healthBar = new StatusBar(createVector(this.position.x, this.position.y - (this.size + this.size/2)),  this.size, 5, this.health, this.health);
    this.bloodParticles = [];
    this.headImage = zombieImage;
    this.pointValue = 100;   
    
    this.update = function () {
        this.position.x = constrain(this.position.x, windowWidth/20, windowWidth * 1000);
        this.position.add(this.velocity);
        this.healthBar.update(this.health);
        this.healthBar.updatePosition(createVector(this.position.x, this.position.y - (this.size + this.size/2)));
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
        this.position.x += knockback;
    };
    
    this.displayBlood = function (damage, angle, position) {
        for(var i = 0; i < 10; i++){
            this.bloodParticles.push(new bloodParticle(damage, (Math.random() * TWO_PI), position));
        }
    };
    
   
}

function bloodParticle (speed, angle, position) {
    this.position = position.copy();
    this.acceleration = createVector(0, gravity);
    this.velocity = createVector(cos(angle) * speed * (Math.random() * 3) , sin(angle) * speed * (Math.random() * 3));
    this.lifespan = 10;
    this.update = function () {
        this.lifespan--;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
    this.show = function () {
        push();
        noStroke();
        fill(138,7,7);
        ellipse(this.position.x, this.position.y, 4, 4);
        pop();
    }
}


       
    
    