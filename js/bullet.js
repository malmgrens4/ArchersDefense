function Bullet(position, power, angle, width, height, durability, bulletImage, tier){
    this.acceleration = createVector(0, gravity);
    this.angle = angle;
    this.durabilility = durability;
    this.width = width + tier/2;
    this.height = height + tier/2;
    this.position = position.copy();
    this.power = power;
    this.lifespan = 2; //after it stops moving
    this.stopped = false;
    this.velocity = createVector(this.power * cos(this.angle), this.power * sin(this.angle));
    this.bulletImage = bulletImage;
    this.trailLength = 5;
    this.trailPoints = [];
    
    this.update = function () {
        this.angle = atan2(this.velocity.y, this.velocity.x);
        this.checkCollision();

        if (this.stopped) {
            this.lifespan--;
        } else {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }
        
        if(this.trailPoints.length >= this.trailLength){
            this.trailPoints.splice(0, 1);
        }
        this.trailPoints.push(createVector(this.position.x - this.width/2, this.position.y));
    };

    this.show = function () {
        push();
        stroke(1);
        translate(this.position.x - this.width/2, this.position.y - this.height/2);
    
        rotate(this.angle);
        fill(244);
        image(this.bulletImage, 0, 0, this.width, this.height);  
        pop();
        push();
        for(var i = 0; i < this.trailPoints.length - 1; i++){
            var color1 = 200;
            var color2 = 200;
            var color3 = 200;
            if(tier > 3){
                color1 = 255;
                color2 = 127;
                color3 = 80; 
            }
            strokeWeight(tier/2);
            stroke(color1, color2, color3, parseFloat((i/this.trailPoints.length)).toFixed(2));
            line(this.trailPoints[i].x, this.trailPoints[i].y, this.trailPoints[i+1].x, this.trailPoints[i+1].y);
        }
        pop();
        
    };
    
    this.checkCollision = function () {
        //check against all zombies
        if(this.position.y >= groundStart - this.width + (this.width) && this.angle < HALF_PI){
            this.velocity.y *= -1;
        }
        if(this.position.x >= windowWidth || this.position.x <= 0){
            this.stopped = true;
        }
        //wall detection
        
    };
    
    this.destroy = function () {
        this.lifespan = 0;
    }
    
    this.damage = function () {
        this.durabilility-=1;
    }
}